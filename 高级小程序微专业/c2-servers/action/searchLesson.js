let { lessons } = require('../data')

module.exports = (req, res) => {
	let value = req.query.value
	let reg = new RegExp(value, 'gi')
	res.json(lessons.filter(item => reg.test(item[1]) || reg.test(item[4]) || reg.test(item[5])))
}