const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const sql = require('mysql');
const randomstring = require('randomstring');
const express = require('express');
const app = new express();
let ranstr = 'ABCDEFG';
let n = 0;


const conn = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: '000000',
    database: 'register',
    port: '3306'
});


app.use(express.static('www'));
app.listen(3000,()=>{
    console.log('server listening in port 3000');
});

app.get('/',(req,res)=>{
    res.send('/////')
/*     fs.readFile('./www/notFound.html', (err, data) => {
        if (err) {
            res.send('404NOTFUND');
        }
        else{
            res.send(data);
        }
    }); */
});

setInterval(() => {
    ranstr = randomstring.generate(7);
    console.log(`更新: http://119.23.231.123:3000/${ranstr}`);
    app.get(`/${ranstr}`, (req, res) => {
        console.log(`req.url.substring(1,8): ${req.url.substring(1, 8)}`);
        console.log(`user ip: ${getIP(req)}`);
        
        if(ranstr!=req.url.substring(1,8)){
            res.send('二维码失效');
        }
        else {
            fs.readFile('./www/test.html', (err, data) => {
                if (err) {
                    res.send('404NOTFUND')
                }
                else {
                    res.write(data);
                    res.end();
                }
            }); 
        }
    });
}, 30000)

app.get('/qrcode', (req, res) => {
    console.log(`请求一次${n++}`);
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;
    res.jsonp({ params, ranstr });
});
app.get('/login',(req,res)=>{
    conn.query(`select * from stu_info where ip = '${getIP(req)}'`,(err,result)=>{
        if (result!='') {
            fs.readFile('./www/once.html',(err,data)=>{
                if(err){
                    console.log(err);
                    res.send('只能签到一次')
                }
                else{
                    res.write(data);
                    res.end();
                }
            })
        }
        else {
            var arg = url.parse(req.url).query;
            var num = qs.parse(arg).num;
            var name = qs.parse(arg).name;
            conn.query(`insert into stu_info(number,name,ip) value('${num}','${name}','${getIP(req)}')`, (err, result) => {
                if (err) {
                    fs.readFile('./www/err.html',(err,data)=>{
                        if(err){
                            console.log(err);
                            
                            res.send('签到失败');
                        }
                        else{
                            res.write(data);
                            res.end();
                        }
                    })
                }
                else {
                    fs.readFile('./www/success.html', (err, data) => {
                        if (err) {
                            console.log(err);
                            
                            res.send('签到成功');
                        }
                        else {
                            res.write(data);
                            res.end();
                        }
                    })
                }
            });
        }   
    })
})



function getIP(req) {
    var ip = req.headers['x-forwarded-for'][0];
/*          ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || ''; */
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip;
}