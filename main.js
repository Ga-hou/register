const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const mysql = require('mysql');
const ip = [];
let ranNum = 1111;

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'register',
    port: '3306'
});



setInterval(() => {
    ranNum = Math.floor(Math.random() * 9000 + 1000);
    console.log(`当前密码:${ranNum}`);
}, 300000);

http.createServer((req,res)=>{
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    console.log(`用户访问的:${url.parse(req.url).pathname}`);

    if(url.parse(req.url).pathname === `/${ranNum}`){
        fs.readFile('./www/index.html',(err,data)=>{
            if(err){
                return console.log(err);
            }
            else{
                res.write(data);
            }
            res.end();
        });
    }
    else if (url.parse(req.url).pathname === '/qrcode'){
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(fn + '(' + JSON.stringify({ params, ranNum}) +')');
        res.end();
    }
    else if (url.parse(req.url).pathname === '/login'){
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        conn.query(`select * from stu_info where ip='${getIP(req)}'`,(err,result)=>{
            console.log(`1result:${result}`);
            console.log(`2ip:${getIP(req)}`);
            console.log(`3err:${err}`);
            if(!(result == '')){
                res.write('只能签到一次');
                res.end();
            }
            else {
                var arg = url.parse(req.url).query;
                var num = qs.parse(arg).num;
                var name = qs.parse(arg).name;
                conn.query(`insert into stu_info(number,name,ip) value('${num}','${name}','${getIP(req)}')`, (err, result) => {
                    if (err) {
                        res.write('签到失败');
                    }
                    else {
                        res.write('签到成功');
                    }
                    res.end();
                });
            }            
        });
    }
    else{
        res.write('404');
        res.end();
    }

}).listen(3000);


function getIP(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip;
}

function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}