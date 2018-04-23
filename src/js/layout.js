$(function() {
    resetRem();
    $(window).resize(function(){
        resetRem();
    })
})

/*
    resetRem Fn
    Accept Params: {
        defaultFontSize: <number> default = 20,
        designWidth: <number>default = 640
    }
*/
function resetRem(_params) {
    var params = _params ? _params : {};
    if(!params.defaultFontSize || typeof(params.defaultFontSize)!= 'number') params.defaultFontSize = 20;
    if(!params.designWidth || typeof(params.designWidth)!= 'number') params.designWidth = 640;
    var deviceWidth = $(window).width();
    var ratio = deviceWidth / params.designWidth;
    var realFontSize = ratio * params.defaultFontSize;
    $('html').css('font-size', realFontSize + 'px');
}

/*
    Is PhoneNum
*/
function isPhoneNum(phone) { 
    var pattern = /^1[345678]\d{9}$/; 
    return pattern.test(phone); 
}