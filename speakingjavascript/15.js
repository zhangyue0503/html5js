/**
 * Created by zhangyue on 2016/12/27.
 */
//bind
function add(x,y){
    return x+y;
}
var plus1 = add.bind(null,1);
console.log(plus1(5));

//实际等于
function plus2(y){
    return add(1,y);
}
console.log(plus2(5));

