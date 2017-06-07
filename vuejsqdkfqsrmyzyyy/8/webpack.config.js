var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports        = {
	entry  : {
		index : './src/app.js'
	},
	output : {
		loaders : [
			{
				test    : /\.js$/,
				loader  : 'babel',
				exclude : /node_modules/
			},
			{
				test   : /\.vue$/,
				loader : 'vue'
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:true
		})
	]
};
