// 将所有请求处理函数，集中在一个对象中，并暴露出来
var pay = require('./pay')
var acode = require('./acode')
var demo = require('./demo')
var home = require('./home')
var searchLesson = require('./searchLesson')
var detail = require('./detail')
var share = require('./share')
var buyLesson = require('./buyLesson')
var sharePrize = require('./sharePrize')
var showCoupons = require('./showCoupons')
var saveCoupon = require('./saveCoupon')
var userCoupon = require('./userCoupon')

// 统一暴露接口
module.exports = {
	pay: pay,
	acode: acode,
	demo: demo,
	home: home,
	searchLesson,
	detail,
	share,
	buyLesson,
	sharePrize,
	showCoupons,
	saveCoupon,
	userCoupon
}