var { lessons } = require('../data')

module.exports = (req, res) => {
	res.json({
		price: '123.00',
		// lessons: lessons.splice(55, 60)
		lessons: lessons
	})
}