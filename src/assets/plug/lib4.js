(function (global) {
    function Library(selector) {
        return new Fn(selector);
    }

    function Fn(selector) {
        // console.log('Fn1', this);
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            this[i] = elements[i];
        }
        // 注意必须添加一个length属性
        this.length = elements.length;
        // console.log('Fn2', this);
    }

    Fn.prototype.css = function (name, value) {
        for (var i = 0; i < this.length; i++) {
            this[i].style[name] = value;
        }
    }

    Fn.prototype.height = function() {
        console.log('我是新增的一个方法');
    }

    global._$ = global.Library = Library;
})(window);

/** 
 * 优化点：
 * 作为一个库，不可能只有一个方法。每新增一个方法，都必须操作Fn.prototype，非常不方便。
 * 解决方案：
 * prototype本身也是一个对象，可以重写这个对象
 */