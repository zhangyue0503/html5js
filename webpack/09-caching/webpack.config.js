const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    entry:{
        
        index:'./src/index.js',
        // another:'./src/another-module.js'
    },
    output:{
        // filename:"bundle.js",
        filename:'scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, "./dist"),
        clean:true,
        assetModuleFilename:'images/[contenthash][ext]'
    },
    mode: "development",
    // mode:"production",
    devtool:'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'app.html',
            inject:'body'
        }),
        new MiniCssExtractPlugin({
            filename:'styles/[contenthash].css'
        })
    ],
    devServer:{
        static:'./dist'
    },
    module:{
        rules:[
            // {
            //     test:/\.png$/,
            //     type:'asset/inline',
            //     generator:{
            //         filename:'images/[contenthash][ext]'
            //     }
            // }
            // {
            //     test:/\.png$/,
            //     type:'asset/inline'
            // },
            {
                test:/\.png$/,
                type:'asset'
            },
            {
                test:/\.txt$/,
                type:'asset/source'
            },
            {
                test:/\.(css|less)$/,
                // use:['style-loader','css-loader', 'less-loader']
                use:[MiniCssExtractPlugin.loader,'css-loader', 'less-loader']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            }
        ]
    },
    optimization:{
        minimizer:[
            new CssMinimizerPlugin()
        ],
        splitChunks:{
            // chunks:'all'
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendors',
                    chunks:'all'
                }
            }
        }
    }
}