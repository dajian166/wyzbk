const Http = require('http');
const Querystring = require('querystring');
const Url = require('url');

let app = Http.createServer((req, res) => {
    let {
        pathname,
        query
    } = Url.parse(req.url, true);

    let arr = []; //post是分段传送的二进制数据流，所以要压到一个数组里

    req.on('data', (data) => {
        arr.push(data);
        console.log(arr);
    });

    req.on('end', () => {
        //处理二进制数据流
        let buffer = Buffer.concat(arr);
        let post = Querystring.parse(buffer.toString());
        console.log(pathname, query, post);
    });
}).listen(2019);