/**
 * Created by zhangyue on 2017/5/7.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
	name:String,
	path:String
});

module.exports = mongoose.model('Photo',schema);