/*!
 * Module Driver Library v2.0
 * Date: 2019-05-01T21:04Z
 */
// (function (global, factory) {
//     "use strict";
//     factory(global);
// })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
//     if (!noGlobal) {
//         window.jQuery = window.$ = jQuery;
//     }
//     return jQuery;
// });

// var ModuleDriver = (function (global, factory) {
//     "use strict";
//     return factory(global);
// })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
//     var __D__ = {
//         init: function (meta) {
//             console.log('init', meta);
//         },
//         load: function () {}
//     }
//     return __D__;
// });

(function (global, factory) {
    "use strict";
    // 闭包1 做平台判断或其他工作
    return factory(global);
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    // 闭包2 专门只做关键的活 创建并返回ModuleDriver
    var __M__ = {}; // 模块对象
    var __D__ = {
        // 初始化工作（只做一次）
        init: function (data, modules) {

            __M__ = modules || __M__;
            this.load(data);
        },
        // 加载数据
        load: function (data) {
            console.log('load', data);
            this.fetch(data); // 拆解数据（把数据拆解后填充到对应的模块对象中）
            this.refresh(); // 刷新视图
        },
        fetch: function (data) {
            //注意：要基于用户配置的模块来拆，而不是接口返回的数据，这样达到解耦的目的。
            console.log('fetch', data, __M__);
            for (var __m__ in __M__) {
                if (data[__m__]) {
                    // 填充数据
                    __M__[__m__].module = data[__m__];
                }
            }
        },
        refresh: function () {
            console.log('refresh', __M__);
            for (var __m__ in __M__) {
                if (__M__[__m__].render) {
                    __M__[__m__].render();
                }
            }
        }
    }
    if (!noGlobal) {
        window.ModuleDriver = window.$md = __D__;
    }
    return __D__;
});