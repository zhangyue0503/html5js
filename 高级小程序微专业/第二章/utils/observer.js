// 定义消息池|消息管道，存储消息队列
let msg = {};
// 定义消息的方法
function on(type, fn) {
  // 如果消息队列存在
  if (msg[type]) {
    // 将新的消息推入队列中
    msg[type].push(fn);
  } else {
    // 没有该消息，新建一个消息队列
    msg[type] = [fn];
  }
}
//发布消息方法
function emit(type, ...arg) {
  // 如果该消息存在
  if (msg[type]) {
    // 遍历消息队列
    for (let i = 0; i < msg[type].length; i++) {
      // msg[type][i] 表示第i个消息函数
      // 传递自定义消息数据
      msg[type][i](type, ...arg);
    }
  }
}
// 移除消息方法
function off(type, fn) {
  // 如果没有消息类型，清空整个消息队列
  if (!type) {
    msg = {};
    // 没有传递回调函数，清空该消息队列中的所有回调函数
  } else if (!fn) {
    // msg[type] = []
    delete msg[type]
  } else {
    // 清空该消息类型下的，该消息回调函数，从后往前，避免索引变动
    for (let i = msg[type].legnth - 1; i >= 0; i--) {
      // 如果该函数与fn相同，就移除
      if (fn === msg[type]) {
        // 删除该成员
        msg[type].splice(i, 1);
      }
    }
  }

}
// 暴露接口
module.exports = {
  on,
  emit,
  off
};