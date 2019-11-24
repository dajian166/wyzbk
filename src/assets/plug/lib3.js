(function (global) {
    function Library(selector) {
        return new Fn(selector);
    }

    // 自定义构造函数首字母大写
    function Fn(selector) {
        // jquery通过Sizzle.js实现css选择器
        var elements = document.querySelectorAll(selector); // document.getElementsByTagName(selector);
        // 给Fn对象添加一个elements属性并赋值。
        this.elements = elements;
    }

    Fn.prototype.css = function (name, value) {
        for (var el of this.elements) {
            el.style[name] = value;
        }
    }

    global._$ = global.Library = Library;
})(window);

/** 
 * 思考：Fn.prototype.css = function (name, value)可以使用箭头函数吗？
 * 答:不能。箭头函数没有自己的this，是继承来的，默认指向在定义时所处的一个对象(宿主对象)，而不是执行时的对象。
 * 普通函数的this是谁调用，则指向谁。
 */

/** 
 * 存在的问题：
 * 只能够通过_$('div').elements[0]获取元素，不支持_$('div')[0]
 */