import axios from 'axios';
export default function (arr) {
    function _myaxios() {
        this.vueob = null;
    }

    _myaxios.prototype.v = function (ob) {
        this.vueob = ob;
    }

    //生成请求
    _myaxios.prototype.getAxios = function (config) {
        const _url = config.url;
        const _type = config.type;
        const _data = config.data;
        const fatory = {
            get: function () {
                return axios.get(_url);
            },
            post: function () {
                return axios.get(_url, _data);
            }
        }

        return fatory[_type];
    }
    //发生请求
    _myaxios.prototype.sendAxios = function (config) {
        let _axios = this.getAxios(config);
        let self = this;
        _axios().then(function () {
            config.success === 'default' ? self.handleAxios(config.dataname, res.data) :
                config.success.call(self.vueob, res); //指向组件的实例
        })
    }
    //处理请求
    _myaxios.prototype.handleAxios = function (dataname, data) {
        this.vueob[dataname] = data;
    }
    //初始化部分
    let _a = new _myaxios();
    arr.forEach((item, index) => {
        _a[item.name] = function (config) {
            _a.sendAxios({
                url: item.url,
                type: config && config.type || 'get',
                success: config && config.success || 'default',
                data: config && config.data || {},
                dataname: config && config.dataname || item.name
            });
        }
    });

    return _a;
}