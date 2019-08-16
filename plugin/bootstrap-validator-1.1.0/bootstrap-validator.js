// (function (global, factory) {
//     "use strict";

//     // Pass this if window is not defined yet
// })(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
//     return jQuery;
// });

(function (global, factory, plug) {
    //调用工厂创建闭包
    return factory.call(global, global.jQuery, plug);
})(this, function ($, plug) {
    //闭包空间
    console.log($, plug);

    //默认配置
    var __DEFS__ = {
        raise: "change"
    };

    //规则引擎
    var __RULES__ = {
        "require": function () {
            return !!this.val();
        },
        "regex": function () {
            return true;
        },
        "email": function () {
            var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
            return reg.test(this.val());
        },
        "mobile": function () {
            return true;
        }
        // ...将来可以追加规则
    };
    //在jquery中增加了一个名为plug的插件，即创建jquery插件
    $.fn[plug] = function (ops) {
        //这里的this表示选中的表单元素列表
        console.log(this);
        this.each(function () {
            console.log(this);

            var $this = $(this);
            console.log($this);
            //把ops里面的属性全部继承到$this里面
            $.extend($this, ops);
            // 用户配置、统一配置、默认配置
            $this.raise = $this.data("bv-raise") || $this.raise || __DEFS__.raise;
            console.log('$this.raise', $this.raise);
            var $fields = $this.find("[data-bv=true]");
            console.log('[data-bv=true]目标元素列表', $fields);

            // $fields.on('change', function () {
            //     console.log(this.value);
            // });
            // $fields.on(ops.raise, function () {
            //     console.log(this.value);
            // });
            $fields.on($this.raise, function () {
                var $field = $(this);
                console.log('目标元素', $field, this.value);
                var $group = $field.parents(".form-group").removeClass("has-success has-error");
                $group.find(".help-block").remove();
                var result = true,
                    error = null; //检验结果
                $.each(__RULES__, function (rule, validFn) {
                    if ($field.data("bv-" + rule)) {
                        console.log("配置了:" + rule);
                        result = validFn.call($field);
                        // if (!result) {
                        //     error = $field.data("bv-" + rule + "-error");
                        //     $field.after('<span class="help-block">' + error + '</span>');
                        // }
                        !result && $field.after('<span class="help-block">' + $field.data("bv-" + rule + "-error") + '</span>');
                        return result; // 如果是false就不循环了
                    }
                });
                console.log('result', result);
                $group.addClass(result ? "has-success" : "has-error");
            });
        });
    };
}, "bootstrapValidator");