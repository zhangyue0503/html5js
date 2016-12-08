/**
 * Created by zhangyue on 2016/12/7.
 */
var message = "Hello world!";
console.log(message);

// var garble = require("./garble");
//
// var argument = process.argv[2];
// console.log(garble(argument));

//文件操作fs
var fs = require("fs");
fs.readFile("package.json","utf-8",function(error,text){
    if(error)
        throw error;
    console.log("The file contained",text);
});
fs.writeFile("graffiti.txt","Node was here",function(err){
    if(err)
        console.log("Failed to write file:",err);
    else
        console.log("FIle written.")
});

//http模块
var http = require("http");
var server = http.createServer(function(request,response){
    response.writeHead(200,{"Content-Type":"text/html"});
    // response.write("<h1>Hello!</h1><p>You asked for <code>"+request.url+"</code></p>");
    //流
    request.on("data",function(chunk){
        response.write(chunk.toString().toUpperCase());
    });
    request.on("end",function(){
        response.end();
    });

    // response.end();
}).listen(8000);
// server.listen(8000);

