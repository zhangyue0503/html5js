/**
 * Created by zhangyue on 2017/5/7.
 */

var photos = [];
photos.push({
	name:'Node.js Logo',
	path:'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
	name:'Ryan Speaking',
	path:'http://nodejs.org/images/ryan-speaker.jpg'
});

// exports.list = function(req,res,next){
// 	Photo.find({},function(err,photos){
// 		if(err) return next(err);
// 		res.render('photos',{
// 			title:'Photos',
// 			photos:photos
// 		});
// 	});
// 	// res.render('photos',{
// 	// 	// title:'Photos',
// 	// 	photos:photos
// 	// });
// };
//
// exports.form = function(req,res){
// 	res.render('photos/upload',{
// 		title:'Photo upload'
// 	})
// };

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.submit = function(dir){
	return function(req,res,next){
		var img = req.files.photo.image;
		var name = req.body.photo.name || img.name;
		var path = join(dir,img.name);

		fs.rename(img.path,path,function(err){
			if(err) return next(err);

			Photo.create({
				name:name,
				path:img.name
			},function(err){
				if(err) return next(err);
				res.redirect('/');
			});
		});

	};
};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	// res.render('index', { title: 'Express' });
	//使用mongodb保存的数据
	Photo.find({},function(err,photos){
		if(err) return next(err);
		res.render('photos',{
			title:'Photos',
			photos:photos
		});
	});
});

router.get('/upload', function(req, res, next) {
	res.render('photos/upload',{
		title:'Photo upload'
	})
});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/upload', multipartMiddleware, function(req,res,next){

	//express4+直接获取不到，使用connect-multiparty，官方建议不要使用这个中间件
	console.log(req.files);
	console.log(req.body);
	var img = req.files.photo.image;
	var name = req.body.photo.name || img.name;
	var path = join('../public/photos',img.name);


	//移动保存文件
	fs.rename(img.path,path,function(err){
		if(err) return next(err);
		//使用mongodb保存
		Photo.create({
			name:name,
			path:img.name
		},function(err){
			if(err) return next(err);
			res.redirect('/');
		});
	});

});

//下载文件
var download = function(dir){
	return function(req,res,next){
		var id = req.params.id;
		Photo.findById(id,function(err,photo){
			if(err) return next(err);
			var path = join(dir,photo.path);
			res.download(path);
		});
	};
};

router.get('/photo/:id/download',download('../public/photos'));

module.exports = router;