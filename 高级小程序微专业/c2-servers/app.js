var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');
var app = express();
var privateKey = fs.readFileSync('./ssl/server.key', 'utf8');
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
};

var axios = require('axios')
// 引入相关配置
var conf = require('./consts.js')
var util = require('./util.js')
var xml2js = require('xml2js')


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 3000;
var SSLPORT = 3001;

httpServer.listen(PORT, function () {
    console.log('HTTP SERVER is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS SERVER is running on: http://localhost:%s', SSLPORT);
});

app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'))



// 第六章
app.get('/action/pay', (req, res) => {
	// 获取query中的code数据
	let { code, fee, title } = req.query;

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

	res.json('success')
})


app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/intro', function (req, res) {
    res.render('intro.ejs');
});

// 二维码路由
app.get('/acode', (req, res) => {
	// 渲染模板
	res.render('acode.ejs')
})

// 三类码的地址
let urls = {
	A: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=',
	B: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=',
	C: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='
};

// 获取二维码接口
app.get('/action/acode', (req, res) => {
	
	// 解构参数数据
	let {appid, secret, path, scene, width, type} = req.query;
	// 小程序码地址
	let url = urls[type];
	// 创建请求对象
	let post_data = {path, width};
	// 如果是B类型的
	if(type === 'B'){
		post_data.scene = scene;
	}
	// 图片存储路径
	let filePath = `/static/upload/${appid}_${width}_${type}.png`;
	// 获取token
	axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
		.then(({data})=>{
			// 继续获取小程序码
			axios.post(url+data.access_token, post_data, {
				// 响应类型
				responseType: 'stream',
				// 头部
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(({data}) => {
				// 存储图片
				data.pipe(fs.createWriteStream(process.cwd() + filePath));
				// 图片存储成功
				data.on('end', () => {
					// 返回图片存储地址
					res.json({
						data: filePath,
						error: 0
					})
				})
			})
		})
})

