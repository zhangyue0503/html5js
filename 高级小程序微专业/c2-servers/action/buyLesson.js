var { lessons } = require('../data')

module.exports = (req, res) => {
	res.json(lessons.slice(70, 75))
	// res.json(lessons)
}