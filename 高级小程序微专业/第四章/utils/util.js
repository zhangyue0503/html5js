const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


/**
 * 对比两个版本号
 * @v1 系统版本库版本 
 * @v2 比较版本
 * return 1 当前版本高于比较版本，-1 当前版本低于比较版本，0正好
 */
module.exports.compareVersion = function(v1, v2){
  // 符合semer规范的版本，如1.9.10
  // 逐位比较，所以要切割成数组
  v1 = v1.split('.')
  v2 = v2.split('.')
  // 补全位数，让他们位数统一
  // 获取最大长度
  var len = Math.max(v1.length, v2.length)
  // 没有传递的位数，默认为0
  while (v1.length < len) { v1.push('0') }
  while (v2.length < len) { v2.push('0') }

  // 开始比较
  for (var i = 0; i < len; i++) {
    // 将每个成员转换成数字
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])
    
    // 如果当前版本大于比较版本
    if (num1 > num2) {
      return 1
    } else if(num1 < num2) {
      // 如果当前版本小于比较版本
      return -1
    }
  }
  // 循环结束，没有结果，说明两个版本相同
  return 0
}