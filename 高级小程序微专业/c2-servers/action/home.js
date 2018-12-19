var { banner, ads, lesson } = require('../data')

module.exports = (req, res) => {
	res.json({ banner, ads, lesson })
}