var { coupons } = require('../data')

module.exports = (req, res) => {
	let { id } = req.query;
	let coupon = coupons.find((item) => item.id == id)
	if ( coupon ) {
		res.json({ 'errno': 'ok' })
	} else {
		res.json({ 'errno': 'err', 'msg': '优惠券id错误' })
	}
}