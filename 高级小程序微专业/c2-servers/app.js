var express		= require('express')
var http 		= require('http')
var https 		= require('https')
var fs 			= require('fs')
var app 		= express()
var privateKey 	= fs.readFileSync('./ssl/server.key', 'utf8')
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8')
var credentials = {
    key: privateKey,
    cert: certificate
}

// 引入action中的所有接口
var action = require('./action/index.js')

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

var PORT = 3000
var SSLPORT = 3001

httpServer.listen(PORT, function () {
    console.log('HTTP SERVER is running on: http://localhost:%s', PORT)
})
httpsServer.listen(SSLPORT, function () {
    console.log('HTTPS SERVER is running on: http://localhost:%s', SSLPORT)
})

app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/static'))






app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/intro', function (req, res) {
    res.render('intro.ejs');
});

// 支付接口
app.get('/action/pay', action.pay)

// 二维码路由
app.get('/acode', (req, res) => {
	// 渲染模板
	res.render('acode.ejs')
})

// 获取二维码接口
app.get('/action/acode', action.acode)

// 测试数据
app.get('/action/demo', action.demo)

// 首页接口
app.get('/action/home', action.home)

// 搜索课程接口
app.get('/action/searchlesson', action.searchLesson)

// 课程详情
app.get('/action/detail', action.detail)

// 分享接口
app.get('/action/share', action.share)

// 已购课程
app.get('/action/buyLesson', action.buyLesson)

// 分享有奖
app.get('/action/sharePrize', action.sharePrize)

// 所有优惠券接口
app.get('/action/showcoupons', action.showCoupons)

// 存储优惠券接口
app.get('/action/savecoupon', action.saveCoupon)

// 本周可获得的优惠券接口
app.get('/action/usercoupon', action.userCoupon)

