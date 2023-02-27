const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports ={
    output:{
        // filename:"bundle.js",
        filename:'scripts/[name].js',
        path: path.resolve(__dirname, "../dist"),
        
    },
    mode :"development",
    // mode:"production",
    devtool:'inline-source-map',
    
    devServer:{
        static:'./dist'
    }
}