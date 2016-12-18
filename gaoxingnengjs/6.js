/**
 * Created by zhangyue on 2016/12/18.
 */
//定时器处理数组
function processArray(items,process,callback){
    var todo = items.concat();
    setTimeout(function(){
        process(todo.shift());
        if(todo.length>0){
            setTimeout(arguments.callee,25);
        }else{
            callback(items);
        }
    },25);
}
var items = [123,789,323,778,232,654,219,543,321,160];

function outputValue(value){
    console.log(value);
}

processArray(items,outputValue,function(){
    console.log("Done!");
});

