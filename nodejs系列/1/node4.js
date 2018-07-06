var http = require('http');
http.createServer(function(request,response){
// console.log(request.url);

var url = request.url;
if(url.indexOf(html)!=-1){
    response.setHeader('Access-Control-Allow-Origin','*');
    if(url == '/index.html'){
        response.write('good this index.html');
    }else if(url == '/index2.html'){
        response.write('good this index2.html');
    }else{
        response.write('404');
    }
}

// 
// console.log('有人访问来了');
// response.write('今天天气不错~');
response.end();
}).listen(9217);

