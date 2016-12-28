/**
 * Created by zhangyue on 2016/12/27.
 */
//栈跟踪
function catchit(){
    try{
        throwit();
    }catch(e){
        console.log(e.stack);
    }
}
function throwit(){
    throw new Error('');
}
catchit();
