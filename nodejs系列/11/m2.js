var mysql = require('mysql');



var pool = mysql.createPool({host:'localhost','user':'root','password':'','database':'nodejsxilie','port':3306});
pool.getConnection(function(err,connection){
    if(err){
        console.log('链接失败');
    }else{
        connection.query('insert into `usertab`(`id`,`user`,`pass`) values(null,"BLL","1212");',function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
                connection.release();
            }
        });
    }
});


