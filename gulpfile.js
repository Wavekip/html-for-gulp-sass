var gulp = require('gulp'),
    concat = require('gulp-concat'),//- 多个文件合并为一个；    
    ugLify = require('gulp-uglify'),//压缩js  
    imageMin = require('gulp-imagemin'),//压缩图片  
    pngquant = require('imagemin-pngquant'), // 深度压缩  
    htmlMin = require('gulp-htmlmin'),//压缩html  
    changed = require('gulp-changed'),//检查改变状态  
    sass = require('gulp-sass'),//压缩合并sass  
    sourcemaps = require('gulp-sourcemaps'), //sass sourcemaps, 发布产品时不引入这一板块
    browserSync = require("browser-sync").create();//浏览器实时刷新

var debug = true;

//压缩html  
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释  
        collapseWhitespace: true,//压缩HTML  
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"  
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"  
        minifyJS: true,//压缩页面JS  
        minifyCSS: true//压缩页面CSS  
    };
    gulp.src('./src/*.html')
        .pipe(changed('./dist', { hasChanged: changed.compareSha1Digest }))
        .pipe(htmlMin(options))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({ stream: true }));
});

// 编译scss
gulp.task('scss', function (cb) {
    if(debug) {
        gulp.src(['./src/css/*.scss', '!./src/css/**/_*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        // .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
    } else {
        gulp.src(['./src/css/*.scss', '!./src/css/**/_*.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
    }

});

//压缩js  
gulp.task('script', function () {
    gulp.src(['./src/js/*.js', '!./src/js/**/_*.js'])
        .pipe(changed('./dist/js', { hasChanged: changed.compareSha1Digest }))
        .pipe(concat('main.js'))
        .pipe(ugLify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

// 压缩图片  
gulp.task('images', function () {
    gulp.src('./src/images/*.*')
        .pipe(changed('./dist/images', { hasChanged: changed.compareSha1Digest }))
        .pipe(imageMin({
            progressive: true,// 无损压缩JPG图片  
            svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性  
            use: [pngquant()] // 使用pngquant插件进行深度压缩  
        }))
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({ stream: true }));
});

//启动热更新  
gulp.task('serve', [], function () {
    gulp.start('script', 'scss', 'images', 'html');
    browserSync.init({
        port: 3000,
        server: {
            baseDir: ['./dist']
        }
    });
    gulp.watch('./src/js/*.js', ['script']);         //监控文件变化，自动更新  
    gulp.watch('./src/css/*.scss', ['scss']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/images/*.*', ['images']);
});


gulp.task('default', ['serve']);  