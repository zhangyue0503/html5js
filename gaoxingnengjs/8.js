/**
 * Created by zhangyue on 2016/12/20.
 */
//位操作%2功能
var rows = [11,22,33,44,55,66,77];
for(var i = 0,len=rows.length;i<len;i++){
    if(i&1){
        console.log("odd"+rows[i]);
    }else{
        console.log("even"+rows[i]);
    }
}

