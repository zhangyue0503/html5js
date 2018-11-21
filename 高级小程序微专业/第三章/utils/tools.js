// 定义一个工具库
// function tools(){
//   // 此处省略10000行
//   console.log('tools fn');
//   return {
//     //属性
//     version:'1.0',
//     //方法
//     methdos(){

//     }
//   }
// }

// 惰性单例：页面加载的时候不执行，等到使用的时候再执行，并且执行一次
module.exports = (function(){
  // 引用函数的变量
  let _tools = null;
  // 惰性函数
  function tools() {
  // 此处省略10000行
  console.log('tools fn');
  return {
    //属性
    version:'1.0',
    //方法
    methdos(){

    }
  }
}
//暴露获取函数执行结果的接口
return function(){
  // 如果tools没有执行，我们要执行并返回
  if(!_tools){
    // 只执行了一次
    _tools = tools();
  }
  // 返回_tools
  return _tools;
}
})();

/** 
 * 定义节流器
 * @fn 执行函数
 * @time 节流时间
 * 如果第一个参数是函数，就是启动节流器
 * 如果第一个参数是布尔值，就取消节流函数的执行（重载），此时第二个参数（time）就是函数了
 */
module.exports.throttle = function(fn, time){
  // 如果是布尔值
  if(typeof fn === 'boolean'){
    // 阻止运行
    clearTimeout(time.__timebar)
  }else{
    // 删除节流器
    clearTimeout(fn.__timebar);
    // 启动节流器
    fn.__timebar = setTimeout(fn, time);
  }
}