var path = require('path'),
	webpack = require('webpack'),
	HtmlwebpackPlugin = require('html-webpack-plugin'),
	ROOT_PATH = path.resolve(__dirname),
	APP_PATH = path.resolve(ROOT_PATH, 'app'),
	BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry      : {
		app : path.resolve(APP_PATH, 'app.jsx')
	},
	output     : {
		path     : BUILD_PATH,
		filename : 'bundle.js'
	},
	devtool    : 'eval-source-map',
	devServer  : {
		historyApiFallback : true,
		hot                : true,
		inline             : true
		// progress           : true
	},
	module    : {
		// rules : [
		// 	{
		// 		test    : /\.jsx?$/,
		// 		enforce: "pre",
		// 		loaders : ['eslint-loader'],
		// 		include : APP_PATH
		// 	}
		// ],
		loaders    : [
			{
				test    : /\.jsx?$/,
				loaders : ['babel-loader'],
				include : APP_PATH
			}
		]

	}, plugins    : [
		new HtmlwebpackPlugin({
			title : 'My first react app'
		})
	],resolve : {
		extensions : [ '.js', '.jsx']
	}
};