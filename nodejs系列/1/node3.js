var http = require('http');
http.createServer(function(request,response){
console.log(request.url);
}).listen(9217);

