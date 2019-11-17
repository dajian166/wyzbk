/**
 * Author:dajian
 */

// 这种写法会有全局污染的问题 
// var ModuleDriver = {
//     init: function (meta) {
//         console.log('init', meta);
//     },
//     load: function () {

//     }
// }

//采用闭包的写法,模板如下：
/*
var ModuleDriver = (function (global, factory) {
    return factory.call(global);
})(this, function () {
    console.log('闭包中...');
});
*/

var ModuleDriver = (function (global, factory) {
    return factory.call(global);
})(this, function () {
    console.log('闭包中...');
    return {
        init: function (meta) {
            console.log('init', meta);
        },
        load: function () {

        }
    }
});