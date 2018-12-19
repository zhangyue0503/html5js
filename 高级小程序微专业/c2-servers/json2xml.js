const fs = require('fs');

const obj = {

       openid: '123456789',

       appid: '123456789',

       mch_id: 123456789,

       nonce_str: '123456789',

       body: '小程序',

       out_trade_no: '20181120261546',

       total_fee: '1',

       spbill_create_ip: '192.168.1.2',

       notify_url: 'http://www.weixin.qq.com/wxpay/pay.php',

       trade_type: 'JSAPI'

};

let xml = createXmlData(obj);
fs.writeFile('./json2xml.xml', xml, { 'flag': 'a' }, function(err) {
    if (err) {
        throw err;
    }
    console.log('成功');
});

function createXmlData(obj){
	// 转化成xml形式
	var xml = '<xml>';
	// 遍历属性，添加标签：<xml><appid></appid></xml>
	for(let key in obj){
		xml += `<${key}>${obj[key]}</${key}>`
	}
	// 添加闭合标签
	return xml += '</xml>'
}