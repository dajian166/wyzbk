(function (global) {
    function Library(selector) {
        var elements = document.getElementsByTagName(selector);
        return elements;
    }

    // 给elements这个实例添加原型方法是不生效的，因为elements不存在prototype属性
    // elements.prototype.css = function () {
    //     console.log('elements.css');
    // }

    //所以要给elements的类型(HTMLCollection)添加原型方法,
    //prototype是HTMLCollection的constructor函数的属性，而constructor是HTMLCollection的__proto__原型对象的属性
    // 原生对象结构被破坏了，造成对象结构的污染。
    HTMLCollection.prototype.css = function () {
        console.log('elements.css');
    }
    // 用_$跟jquery区分开
    global._$ = global.Library = Library;
})(window);

/** 
 * 原型
 * constructor：是一种特殊的方法，主要用来在创建对象时，初始化对象的。
 * 1.所有的引用类型(数组、函数、对象)可以自由扩展属性。(Null除外)
 * 2.所有的引用类型都有一个__proto__属性(隐式原型，本身也是一个普通对象)
 * 3.所有的函数都有一个prototype属性(显示原型)，是函数独有的
 * 4.所有的引用类型的__proto__属性指向它的constructor的prototype属性
 * 5.当试图得到一个对象的属性时，如果该对象本身不存在这个属性，它会去__proto__属性里面找，一直找到Null为止。
 */

var num = new Number();
console.log('num', num);

function Fun() {

}
var f1 = new Fun();
console.log('fun', f1);

/** 
 * 存在的问题：
 * 在原型链上添加方法，破坏了原生对象的结构，不建议这么做。
 * 比如：Array.prototype.sum = function(){}
 * 会导致对象结构的污染，所以不建议修改原生对象结构。
 * 解决方案：
 * 不要返回原生对象，可以返回一个自定义对象。
 * 具体做法：
 * 自定义一个原型，在这个自定义原型上添加方法
 */