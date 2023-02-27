const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
    mode:'development',
    entry:'./app.js',

    devtool:'source-map',

    plugins:[
        new HtmlWebpackPlugin()
    ]
}