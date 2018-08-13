var mysql = require('mysql');
var http = require('http');




// console.log(pool);

http.createServer(function(req,res){
    var pool = mysql.createPool({host:'localhost','user':'root','password':'','database':'nodejsxilie','port':3306});
    pool.getConnection(function(err,connection){
        if(err){
            console.log('链接失败');
        }else{
            connection.query('select * from `usertab`;',function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    
                    res.write(JSON.stringify(data));
                    res.end();
                    connection.release();
                }
            });
        }
    });
}).listen(2813);


