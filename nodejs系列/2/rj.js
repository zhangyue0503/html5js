var fs = require('fs');

fs.readFile('./save.txt', 'utf8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        // console.log(typeof data);
        var json = eval('(' + data + ')');
        console.log(typeof json);

        json.a = 30;
        fs.writeFile('save.txt', JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('保存完成');
            }
        });


    }
});