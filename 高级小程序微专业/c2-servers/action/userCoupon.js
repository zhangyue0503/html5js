var { coupons } = require('../data')

module.exports = (req, res) => {
	let index = Math.floor(Math.random() * coupons.length);
	res.json(coupons[index])
}