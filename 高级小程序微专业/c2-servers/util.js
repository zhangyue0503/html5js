// 引入os模块
var os = require('os')

var conf = require('./consts.js')
var crypto = require('crypto')


// 创建一个随机数字符串
function createRandomString(len){
	// 每10位一组，剩下的追加
	// 获取组数
	var group = Math.floor(len / 10);
	// 余数
	var remainder = len % 10;
	// 定义结果
	var result = '';
	// 遍历组
	for (var i = 0; i < group; i++) {
		// 添加随机数字符串
		result += String(Math.random()).slice(2, 12);
	}
	return result + String(Math.random()).slice(2, remainder + 2);
}

function createTradeNumber(){
	// 创建日期
	var date = new Date();
	return String(date.getFullYear()) + 
		(date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + 
		(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
		createRandomString(6);
}

function getIp(){
	var interfaces = os.networkInterfaces();
	// console.log(interfaces)
	var ip;
	// 解析该对象，寻找每个成员数组，成员属性中，family值为IPv4的以及internal是false
	for(let key in interfaces){
		// 断言方法来判断
		if(interfaces[key].some(item => {
			if(item.family === 'IPv4' && item.internal === false){
				return ip = item.address;
			}
		})){
			return ip ;
		}
	}

}

function createSignData(obj = {}, signName = 'sign'){
	// 获取所有key
	var keys = Object.keys(obj).sort();
	// 拼接字符串
	var str = keys.map(item => `${item}=${obj[item]}`).join('&') + '&key='+conf.MCHKEY;
	// 创建加密
	var md5 = crypto.createHash('md5');
	// 开始加密
	md5.update(str);
	// 设置key属性
	obj[signName] = md5.digest('hex').toUpperCase();

	return obj;
}

function createXmlData(obj){
	// 添加sign属性
	createSignData(obj)
	// 转化成xml形式
	var xml = '<xml>';
	// 遍历属性，添加标签：<xml><appid></appid></xml>
	for(let key in obj){
		xml += `<${key}>${obj[key]}</${key}>`
	}
	// 添加闭合标签
	return xml += '</xml>'
}

module.exports = {
	getIp,
	createRandomString,
	createTradeNumber,
	createXmlData,
	createSignData
}
