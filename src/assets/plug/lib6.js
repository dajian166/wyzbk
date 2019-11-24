(function (global) {
    function Library(selector) {
        return new Library.Fn.init(selector);
    }

    Library.Fn = Library.prototype = {
        construct: Library,
        init: function (selector) {
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                this[i] = elements[i];
            }
            this.length = elements.length;
        },
        css(name, value) {
            for (var i = 0; i < this.length; i++) {
                this[i].style[name] = value;
            }
        },
        height() {
            console.log('我是新增的一个方法');
        }
    }

    Library.Fn.init.prototype = Library.prototype;
    global._$ = global.Library = Library;
})(window);