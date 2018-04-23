# html-for-gulp-sass
启动：
1. 进入./src/components目录，运行<br>
```bower install```<br>
注意：需要先安装bower ```npm i bower -g```
2. 在根目录，运行<br>
```npm i```<br>
3. 安转完毕后，运行<br>
```gulp```<br>
即可


目录说明：<br>
├── .gitignore                // git忽略文件<br>
├── gulpfile.js               // gulp配置文件<br>
├── src                       // 源码，html根目录<br>
│   ├── components            // bower插件存放处<br>
│   ├── css                   // 样式表存放处<br>
│   ├── images                // 图片存放处<br>
│   └── js                    // 脚本存放处<br>
└── dist                      // 编译后文件夹，html根目录<br>
    ├── css                   // 样式表存放处<br>
    ├── images                // 图片存放处<br>
    └── js                    // 脚本存放处<br>

注意事项：
1. ```npm: 5.6.0``` , ```node: v8.11.1```
2. gulpfile.js中，```debug = true```时为开发模式，打包时会生成css的sourcemap，方便调试。当发布产品时，删除原有dist文件夹，改debug值为```false```，重新运行gulp即可打包最小体积的代码。
