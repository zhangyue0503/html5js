/**
 * Created by zhangyue on 2016/12/17.
 */
//回溯与分支
console.log(/h(ello|appy) hippo/.test("hello there,happy hippo"));
//去除字符串空白
if(!String.prototype.trim){
    String.prototype.trim = function(){
        return this.replace(/^\s+/,"").replace(/\s+$/,"");
    }

}

var str = " \t\n test string ".trim();
console.log(str);

