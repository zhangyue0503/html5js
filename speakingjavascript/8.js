/**
 * Created by zhangyue on 2016/12/24.
 */
var obj1 = {};
var obj2 = {};
console.log(obj1===obj2);
var obj3 = obj1;
console.log(obj1===obj3);

var prim1 = 123;
var prim2 = 123;
console.log(prim1===prim2);

console.log(typeof 'abc');
console.log(typeof new String('abc'));