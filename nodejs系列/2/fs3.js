var http = require('http'),
    fs = require('fs'),
    urlLib = require('url'),
    querystring = require('querystring');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(req.url);

    var urlName = req.url;
    fs.readFile('.' + urlName, function (err, data) {
        if (err) {
            fs.readFile('./404.html', function (err, data) {
                if (err) console.log(err);
                res.write(data);
                res.end();
            });
        } else {
            res.write(data);
            res.end();
        }
    });

    // if (req.url == '/index.html') {
    //     fs.readFile('.' + req.url,function(err,data){
    //         if(err)console.log(err);
    //         res.write(data);
    //         res.end();
    //     });
    // }else{
    //     fs.readFile('./404.html' ,function(err,data){
    //         if(err)console.log(err);
    //         res.write(data);
    //         res.end();
    //     });
    // }


}).listen(2182);