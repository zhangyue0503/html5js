const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    output:{
        // filename:"bundle.js",
        filename:'scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, "../dist"),
    },
    mode:"production" ,
    // mode:"production",
    // devtool:'inline-source-map',
   
    optimization:{
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    
},
performance:{
    hints:false
}
}