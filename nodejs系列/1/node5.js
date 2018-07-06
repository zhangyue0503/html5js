var http = require('http');
http.createServer(function(request,response){
// console.log(request.url);


response.setHeader('Access-Control-Allow-Origin','*');
var url = request.url.substring(2);

console.log(url);

var arr = url.split('&');
var json = {};
for(var i =0;i<arr.length;i++){
    json[arr[i].split('=')[0]] = arr[i].split('=')[1];
}
console.log(json);

if(json['user']=='leo' && json['ppt'] == 'ssd'){
    response.write('登陆成功');
}else{
    response.write('登陆失败');
}




response.end();
}).listen(9217);

