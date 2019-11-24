(function (global) {
    function Library(selector) {
        return new Fn(selector);
    }

    function Fn(selector) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            this[i] = elements[i];
        }
        this.length = elements.length;
    }

    Fn.prototype = {
        constructor: Fn, // 构造函数必须指向本身，否则指向Object
        css(name, value) {
            for (var i = 0; i < this.length; i++) {
                this[i].style[name] = value;
            }
        },
        height() {
            console.log('我是新增的一个方法');
        }
    }
    global._$ = global.Library = Library;
})(window);

/** 
 * 总结：
 * 1.自定义一个_$作为入口函数，传入一个selector作为参数
 * 2.selector传入到我们的Library里面，返回一个Fn的实例
 * 3.根据selector获取页面中所有的元素
 * 4.把选中的元素放入Fn实例里，不放到Fn的elements属性上面
 * 5.重写对象原型，把一些DOM操作方法放到原型中去
 */

/** 
 * 参照jquery的init方法去优化
 */