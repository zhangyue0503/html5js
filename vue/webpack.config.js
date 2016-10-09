var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('connon.js');
//独立打包css文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//html模板文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
    plugins:[commonsPlugin,
        new ExtractTextPlugin("styles.css"),
        new webpack.BannerPlugin("Copyright Flying Unicorns inc."),
        new HtmlWebpackPlugin({template: __dirname + "/index.tmpl.html"})],
    //页面入口文件配置
    entry:{
        index:'./src/js/page/index.js'
    },
    devtools:'eval-source-map',
    devServer:{
        inline:true,
        hot:true
    },
    //入口文件输出配置npm in
    output:{
        path:'dist/js/page',
        filename:'build.js'
    },
    //module.loaders，它告知 webpack 每一种文件都需要使用什么加载器来处理
    module:{
        //加载器配置，
        loaders:[
            //.css文件使用style-loader和css-loader来处理
            // {test:/\.css$/,loader:'style!css'},
            // 直接打包css
            { test: /\.css$/, loader: ExtractTextPlugin.extract(
                 "style-loader",
                 "css-loader"
            )},
            //less
            {test:/\.less$/,loader:'style!css!less'},
            //.js文件使用jsx-loader来处理
            {test:/\.js$/,loader:'jsx-loader?harmony'},
            //.scss文件使用style-loader、css-loader和sass-loader来编译处理
            {test:/\.scss$/,loader:'style!css!sass?sourceMap'},
            //图片文件使用url-loader来处理，参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式,超过8k的使用url-loader来映射
            {test:/\.{png|jpg}$/,loader:'url-loader?limit=8192'},
            //普通不符合AMD/CMD规范的js代码
            { test: require.resolve("./src/js/page/swipe.js"),  loader: "exports?swipe"}
        ]
    },
    //其他解决方案配置
    resolve:{
        //查找module的话从这里开始查找
        root:'G:/nodeproject/vue/src',
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions:['','.js','.json','.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias:{
            AppStore:'js/stores/AppStores.js',
            ActionType:'js/actions/ActionType.js',
            AppAction:'js/actions/AppAction.js'
        }
    }
}
// 运行webpack
// $ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
// $ webpack --watch   //监听变动并自动打包
// $ webpack -p    //压缩混淆脚本，这个非常非常重要！
// $ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了