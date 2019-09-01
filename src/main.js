import a from './assets/myaxios';

function Vue() {

}

Vue.prototype.a = a([{
        name: 'apione',
        url: './apione'
    },
    {
        name: 'apitwo',
        url: './apitwo'
    }
]);

//this是组件的实例
Vue.prototype.a.v(Vue.prototype.a);
Vue.prototype.a.apione();