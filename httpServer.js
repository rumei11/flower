let { createServer } = require('http');
let { readFile } = require('fs');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
let path = require('path');
let MINI_TYPES = {
    'html': 'text/html',
    'xml': 'text/xml',
    'txt': 'text/plain',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'swf': 'application/x-shockwave-flash',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'png': 'image/png',
    'gif': 'image/gif',
    'ico': 'image/ico',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'vedio/x-ms-wmv',
    'woff2': 'application/font-woff2',
}
let users = [{
    usersname: 'ickt', userspassword: 'a123',
},
{
    usersname: 'wangliang', userspassword: '1204972123q',
}
]

let root = process.cwd();
let app = createServer(async (req, res) => {
    let urlObj = url.parse(req.url, true);
    let filePath = path.join(root, decodeURIComponent(req.url)); //解码

    if (path.extname(urlObj.pathname) === '.jpg') {

        filePath = path.join(root, urlObj.pathname);

        let data = await new Promise((resolve) => {
            readFile(filePath, (err, data) => {
                resolve(data);
            })
        })
        res.setHeader('content-Type', MINI_TYPES['jpg'] + ';charset=utf-8')
        res.end(data)
        return;
    }

    if (urlObj.pathname === '/regist') {
        console.log(req.method);
        if (req.method === 'GET') {
            let item = users.findIndex((item) => item.usersname === urlObj.query.usersname)
            res.setHeader('content-Type', MINI_TYPES['html'] + ';charset=utf-8')
            if (item != -1) {
                if (users[item].userspassword !== urlObj.query.userspassword) {
                    return res.end('your hahah  is incorrect')
                }
            }
            else {
                users.push({
                    usersname: urlObj.query.usersname,
                    userspassword: urlObj.query.userspassword
                })
                return res.end('恭喜你成功注册')
            }
            return res.end('success to login')
        }
        else if (req.method === 'POST') {
            let result = '';
            req.on('data', data => {
                result += data;

            });
            //异步要先等on执行完 可以改为异步写法 promise 里面只有为空的reslove就行 如何将函数体放到外面
            req.on('end', () => {

                let data = qs.parse(result);
                let item = users.findIndex((item) => item.usersname === data.usersname);
                res.setHeader('content-Type', MINI_TYPES['html'] + ';charset=utf-8')
                if (item != -1) {
                    if (users[item].userspassword !== data.userspassword) {
                        return res.end(JSON.stringify({ Error: 1, usersname: '密码错误' }))
                    }
                }
                else {
                    users.push({
                        usersname: data.usersname,
                        userspassword: data.userspassword
                    })
                    return res.end(JSON.stringify({ success: 1, usersname: '已注册' }))
                }
                return res.end(JSON.stringify({ success: 1, usersname: '成功登陆' }))
            });
            return;
        }
    }
    if (!path.extname(filePath)) {
        filePath = filePath + '//index.html';
    }
    let fileObj = path.parse(filePath);
    let isExists = await new Promise((resolve, rejects) => {
        fs.exists(filePath, data => resolve(data))
    })
    if (isExists) {
        let data = await new Promise((resolve) => readFile(filePath, 'utf-8', (err, data) => resolve(data)));
        data && res.writeHead(200, {
            'Content-Type': MINI_TYPES[fileObj.ext.slice(1) || 'txt'] + ';cahrset=utf-8',
        })
        return res.end(data);
    }
    res.writeHead(404, {
        'Content-Type': MINI_TYPES['txt'] + ';cahrset=utf-8',
    })
    return res.end(req.url + 'not find')
})
app.listen(3001, () => console.log('start 3001'))

