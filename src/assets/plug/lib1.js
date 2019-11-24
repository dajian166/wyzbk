(function (global) {
    function Library(selector) {
        var elements = document.getElementsByTagName(selector);
        elements.css = function () {
            console.log('elements.css');
        }

        return elements;
    }
    // 用_$跟jquery区分开
    global._$ = global.Library = Library;
})(window);

/** 
 * 存在的问题：
 * 每个elements(HTMLCollection)上都有一个css方法，浪费资源，所以需要改进。
 * 1.考虑到在原型链上添加方法
 */