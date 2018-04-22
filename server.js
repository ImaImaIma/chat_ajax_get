'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');

var arr = [];

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    if(q.pathname == '/index'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }else if(q.pathname == '/array') {
        if(arr.length > 15){
            arr.shift();
        };
        // console.log(arr)        
        arr.push(q.query.message);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end();
    }else if(q.pathname == '/array/api') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(arr[arr.length - 1]);
    }else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
    };
}).listen(8888);

console.log('Server started...')