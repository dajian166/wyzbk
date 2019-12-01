(function (global, factory, plug) {
    //判断平台的逻辑
    return factory.call(global, global.jQuery, plug);
})(typeof window !== "undefined" ? window : this, function ($, plug) {
    //封装插件的逻辑
    //console.log($, plug);
    //this===global===window
    console.log(this === window);
    console.log($.fn === $.prototype);

    //默认值
    var __DEFS__ = {
        raise: "change"
    };

    //规则引擎
    var __RULES__ = {
        "require": function () {
            return !!this.val();
        }, //必填项
        "regex": function () {
            return true;
        }, //正则表达式
        "email": function () {
            return /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.val());
        } //邮箱地址
    }

    //创建$插件
    $.fn[plug] = function (ops) {
        console.log(123);
        var $this = $(this);
        console.log($this);
        $.extend($this, ops);
    }
}, 'bootstrapValidator');