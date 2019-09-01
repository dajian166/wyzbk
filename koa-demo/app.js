const Koa = require('koa');
const Body = require('koa-better-body');
const Convert = require('koa-convert');
const Router = require('koa-router');

let app = new Koa();
const router = new Router();
//处理跨域问题
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});
app.listen(2018);

//处理文件上传
app.use(Convert(Body({
    uploadDir: './upload', //指定上传文件的路径，最好使用相对路径.path.resolve(__dirname)
    keepExtensions: 'true' //文件是否需要扩展名
})));

//处理路由
router.post('/upload', async ctx => {
    console.log('fields', ctx.request.fields);
    let {
        username,
        password,
        file
    } = ctx.request.fields;

    ctx.body = 'success';
});

//使用路由
app.use(router.routes());