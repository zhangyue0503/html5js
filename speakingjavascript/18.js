/**
 * Created by zhangyue on 2017/1/2.
 */

function countElements(arr){
    var elemCount = 0;
    arr.forEach(function(){
        elemCount++;
    });
    return elemCount;
}

console.log(countElements(['a','b']));
console.log(countElements(['a',,'b']));

//使用apply()创建包含undefined元素的数组
console.log(Array.apply(null,Array(3)));

