var webpack = require('webpack');
var htmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
    entry:'./a.js',
    output:{
        filename:'./b.js'
    },
    devtool:'source-map',
    devServer:{
        port:1377
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.(jpeg|jpg|gif|png)$/i,
                loader:'url-loader?limit=4096&name=image/[hash:10].[ext]'
            },
            {
                test:/\.html/,
                loader:'html-withimg-loader'
            },
            {
                test:/\.(svg|ttf|woff|woff2)$/i,
                loader:'url-loader?limit=4096&name=fonts/[hash:10].[ext]'
            },
            {
                test:/\.eot/,
                loader:'file-loader'
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('如果你想用的话'),
        new htmlWebpackPlugins({
            'template':'index.html',
            'filename':'./index.min.html'
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        })
    ]
};