const Koa = require('koa');
const Route = require('koa-router');
const app = new Koa();
//监听端口
app.listen(2019);
//路由对象
let router = new Route();
//处理路由
router.get('/', async ctx => {
    ctx.body = '主页';
});
//使用路由
app.use(router.routes());