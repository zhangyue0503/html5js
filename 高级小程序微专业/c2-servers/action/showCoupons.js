var { coupons } = require('../data')

module.exports = (req, res) => {
	res.json(coupons.slice(0, 10))
}