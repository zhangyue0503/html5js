/**
 * Created by zhangyue on 2017/2/6.
 */

//生成器
var x = 1;
function *foo(){
    x++;
    yield;//暂停
    console.log("x:",x);
}
function bar(){
    x++;
}


var it = foo();

it.next();
console.log(x);
bar();
console.log(x);
it.next();


//迭代消息传递
function *foo1(x1){
    var y = x1*(yield);
    return y;
}
var it1 = foo1(6);
it1.next();

var res = it1.next(7);
console.log(res.value);

//多个迭代器
function *foo2(){
    var x = yield 2;
    z++;
    var y = yield(x*z);
    console.log(x,y,z);
}
var z = 1;
var it11 = foo2();
var it22 = foo2();

var val1 = it11.next().value;
var val2 = it22.next().value;

val1 = it11.next(val2*10).value;
val2 = it22.next(val1*5).value;

it11.next(val2/2);
it22.next(val1/4);