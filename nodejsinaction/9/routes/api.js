var express = require('express');
var router = express.Router();

var User = require('../lib/user');


router.get('/user/:id', user);
router.get('/entries/:page?', entries);
router.post('/entry', add);

function user(req,res,next){
	User.get(req.params.id,function(err,user){
		if(err) return next(err);
		if(!user.id) return res.send(404);
		// res.json(user);
		res.format({
			'application/json':function(){
				res.send(user);
			},
			//curl http://localhost:3000/api/user/1 -v -H 'Accept: application/xml'
			'application/xml':function(){
				res.end('<user>'+user.name+'</user>');
			}
		});
	});
};

function entries(){};

function add(){};

module.exports = router;
