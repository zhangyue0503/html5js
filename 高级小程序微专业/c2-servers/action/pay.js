var axios 	= require('axios')
// 引入相关配置
var conf 	= require('../consts.js')
var util 	= require('../util.js')
var xml2js 	= require('xml2js')

// 第六章
module.exports = (req, res) => {
	// 获取query中的code数据
	let { code, fee, title, coupon, discount } = req.query

	// 通过code获取openid
	axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${conf.APPID}&secret=${conf.SECRET}&js_code=${code}&grant_type=authorizaction_code`)
	// 监听数据返回
	.then(({data}) => {
		// console.log(data)
		// 统一下单
		axios.post(`https://api.mch.weixin.qq.com/pay/unifiedorder`, util.createXmlData({
			// openid，类型是JSAPI，此参数必传
			openid: data.openid,
			// 小程序id
			app_id: conf.APPID,
			// 商户号
			mch_id: conf.MCHID,
			// 随机数
			nonce_str: util.createRandomString(30),
			// 商品名称
			body: title,
			// 订单号
			out_trade_no: util.createTradeNumber(),
			// 总金额
			total_fee: fee,
			// ip地址
			spbill_create_ip: util.getIp(),
			// 支付成功，通知地址
			notify_url: 'http://www.weixin.qq.com/wxpay/pay.php',
			// 交易类型
			trade_type: 'JSAPI'
		}), {
			'Content-Type': 'text/xml'
		})
		// 监听返回
		.then(({data})=>{
			
			// 转换xml数据 
			xml2js.parseString(data, (err, {xml}) => {
				// 如果返回成功
				if(xml.return_code[0] === 'SUCCESS'){
					// 返回一个带有签名的数据
					res.json(util.createSignData({
						timeStamp: String(+new Date()),
						nonceStr: util.createRandomString(30),
						package: `prepay_id=${xml.prepay_id[0]}`,
						signType: 'MD5',
					}, 'paySign'));
				}
			});
		})
	});

	// res.json('success')
}