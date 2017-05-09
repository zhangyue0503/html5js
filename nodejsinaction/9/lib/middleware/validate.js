/**
 * Created by zhangyue on 2017/5/9.
 */

function parseField(field){
	return field.split(/\[|\]/).filter(function(s){return s;});
};

function getField(req,field){
	// var val = req.body;
	// console.log(val);
	// console.log(field);
	// field.forEach(function(prop){
	// 	val = val[prop];
	// });
	return req.body[field];
};

exports.required = function(field){
	// field = parseField(field);
	return function(req,res,next){
		if(getField(req,field)){
			next();
		}else{
			res.error(field+' is required');
			res.redirect('back');
		}
	};
};

exports.lengthAbove = function(field,len){
	// field = parseField(field);
	return function(req,res,next){
		if(getField(req,field).length > len){
			next();
		}else{
			res.error(field+' must have more than '+len+' characters');
			res.redirect('back');
		}
	};
};
