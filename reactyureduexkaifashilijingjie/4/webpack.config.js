var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool:'cheap-module-eval-source-map',
	entry:'./src/client',
	output:{
		path:__dirname+'/static/dist',
		filename:'main.js'
	},
	plugins:[
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module:{
		loaders:[{test:/\.js$/,exclude:/node_modules/,loaders:['babel-loader'],include:__dirname}]
	}
};
