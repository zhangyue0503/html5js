var { lessons, menus, teacher } = require('../data')
module.exports = (req, res) => {
	let id = req.query.id
	let lesson = lessons.find(item => item[0] == id)
	if(lesson){
		res.json({ lesson, menus, teacher })
	}else{
		res.json({msg: "该课程不存在"})
	}
}