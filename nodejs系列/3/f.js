var http = require('http'),
    fs = require('fs'),
    urlLib = require('url');

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;
    // console.log(json.titName);

    fs.readFile('./所有文章.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // toString();
            function toString(data, need) {
                if (data.indexOf(need) != -1) {
                    data = data.replace(need, '"');
                    return toString(data, need);
                } else {
                    return data;
                    // console.log(data);
                }
            }
            var l = toString(data, '‘');
            var r = toString(l, '’');
            // console.log(r);

            // var lastArr = JSON.parse(r);
            res.write(r);
            res.end();

            // console.log(data);

        }
    });

    // res.end();
}).listen(2139);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    fs.writeFile('./所有的文章/' + json.titName + '.txt', json.inner, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.write('写入完成');
            res.end();
            fs.readFile('./所有文章.txt', 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    function toString(data, need) {
                        if (data.indexOf(need) != -1) {
                            data = data.replace(need, '"');
                            return toString(data, need);
                        } else {
                            return data;
                        }
                    }
                    var l = toString(data, '‘');
                    var r = toString(l, '’');

                    var allArr = JSON.parse(r);
                    allArr.push(json.titName);
                    fs.writeFile('./所有文章.txt',JSON.stringify(allArr),function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('写入成功');
                        }
                    });


                }
            });

        }
    });



}).listen(2138);

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var json = urlLib.parse(req.url, true).query;

    fs.readFile('./所有的文章/'+json.titName+'.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.end();
        }
    });
}).listen(2140);