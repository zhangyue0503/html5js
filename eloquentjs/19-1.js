/**
 * Created by zhangyue on 2016/12/7.
 */
//http request
var http = require("http");
var request = http.request({
    hostname:"localhost",
    port:"8000",
    path:'/',
    method:"POST",
    headers:{Accept:"text/html"}
},function(response){
    response.on("data",function(chunk){
        process.stdout.write(chunk.toString());
    });
    // console.log("Server responded with status code",response.statusCode);
});
request.end("Hello server");