/**
 * Created by zhangyue on 2016/12/15.
 */

var items = Array();
for(var i =1;i<10000;i++){
    items[i-1] = i;
    console.log(items[i-1]);
}
//减少迭代次数
//达夫设备
var i = items.length%8;
while(i){
    console.log(items[i--]);
}
//
i = Math.floor(items.length/8);

console.log(i);
while(i>0){
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
    console.log(items[i--]);
}

//Memoization递归，阶乘函数
function memfactorial(n){
    if(!memfactorial.cache){
        memfactorial.cache = {
            "0":1,
            "1":1
        };
    }
    if(!memfactorial.cache.hasOwnProperty(n)){
        memfactorial.cache[n] = n*memfactorial(n-1);
    }
    return memfactorial.cache[n];
}
var fact6  = memfactorial(6);
var fact5  = memfactorial(5);
var fact4  = memfactorial(4);
console.log(fact6);
console.log(fact5);
console.log(fact4);

