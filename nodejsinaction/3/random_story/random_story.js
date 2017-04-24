/**
 * Created by zhangyue on 2017/4/24.
 */

//实现串行化流程控制
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile(){ //任务1.确保包含rss预订源url列表文件存在
	fs.exists(configFilename,function(exists){
		if(!exists)
			return next(new Error('Missing RSS file: '+configFilename));
		next(null,configFilename);
	});
}

function readRSSFile(configFilename){//任务2，读取并解析预计源URL的文件
	fs.readFile(configFilename,function(err,feedList){
		if(err) return next(err);
		//将预计源URL列表转换成字符串，然后分隔成一个数组
		feedList = feedList
					.toString()
					.replace(/^\s+|\s+$/g,'')
					.split("\n");
		var random = Math.floor(Math.random()*feedList.length);
		next(null,feedList[random]);
	});
}

function downloadRSSFeed(feedUrl){//任务3，向先定的预订源发送HTTP请求以获取数据
	request({uri:feedUrl},function(err,res,body){
		if(err) return next(err);
		if(res.statusCode!=200)
			return next(new Error('Abnormal response status code'));
		next(null,body);
	});
}

function parseRSSFeed(rss){//任务4，将预订源数据解析到一个条目数组中
	var handler = new htmlparser.RssHandler(function(err,dom){

	});
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	if(!handler.dom.items.length)
		return next(new Error('No RSS items found'));
	var item = handler.dom.items.shift();
	console.log(item.title); //如果有数据显示第一个的标题和链接
	console.log(item.link);
}
//把所有要做的任务按顺序添加到一个数组中
var tasks = [
	checkForRSSFile,
	readRSSFile,
	downloadRSSFeed,
	parseRSSFeed
];
function next(err,result){
	if(err) throw err;
	var currentTask = tasks.shift(); //从任务数组中取出下个任务
	if(currentTask){
		currentTask(result);//执行当前任务
	}
}
next();//开始任务的串行化执行