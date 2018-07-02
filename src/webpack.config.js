//获得发布命令的配置
var currentTarget = process.env.npm_lifecycle_event;
var debug,          // 是否是调试
    devServer,      // 是否是热更新模式
    serverEnv,      // 服务器环境，可选（dev，test，product）
    minimize;       // 是否需要压缩


if (currentTarget == "build") { // 发布模式
    debug = false, devServer = false, minimize = true, serverEnv = 'production'; 
} else if (currentTarget == "dev") { // 开发模式
    debug = true, devServer = false, minimize = false, serverEnv = 'develop'; 
} else if (currentTarget == "dev-watch") { // 热更新模式
    debug = true, devServer = true, minimize = false, serverEnv  = 'develop'; 
} else if (currentTarget == "test-build") { // 测试服务器模式
    debug = false, devServer = false, minimize = true, serverEnv  = 'test'; 
}


//准备开始配置CONFIG
var webpack = require("webpack");
var path = require('path')
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var CleanPlugin = require('clean-webpack-plugin')


var ROOT_PATH   = path.resolve(__dirname);

console.log('当前的状态',currentTarget)
if (currentTarget == "build") {
    var BUILD_PATH = path.resolve(ROOT_PATH, 'product');
    var plugins = [
        new CleanPlugin(['product/*.js', 'product/css/*.css','product/js/*.js']),
    ]
    // var publicPath = '//cdn.static.coinchat.im/web-static/js/react/product/'
    // var asset_json_name = 'assets_product.json';
}else if (currentTarget == 'test-build') {
    // var BUILD_PATH = path.resolve(ROOT_PATH, 'test');
    // var plugins = [
    //     new CleanPlugin(['test/*.js', 'test/css/*.css','test/js/*.js']),
    // ]
    // var publicPath = '//static.chat.jianda.com/web-static/js/react/test/'
    // var asset_json_name = 'assets_test.json';
}else {
    var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
    var plugins = []
    // var publicPath = 'http://static.coinchat.com/web-static/js/react/build/'
    // var asset_json_name = 'assets.json';
}


var DEV_PATH    = path.resolve(ROOT_PATH, 'src');
var MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');


var common_plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(serverEnv)
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),      //合并块
    new WebpackBuildNotifierPlugin({
        title: "coinchat_web 项目 webpack 打包编译完成",
        logo: path.resolve("~/../../..//favicon.png"),
        //suppressSuccess: true
    }),
];


//把plugin放入
common_plugins.map(one=>{
    plugins.push(one);
})


if (minimize) {
    plugins.push(
        /*
         * Uglify
         * （压缩）
         * */
        new webpack.optimize.UglifyJsPlugin({ 
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
    );
}


var clientConfig = {
    output: {
        path:  BUILD_PATH,
        filename: (debug) ? 'js/[name].js' : 'js/[name]-[chunkhash:8].js',
        // publicPath : publicPath
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: DEV_PATH
            },
        ]
    },
    resolve: {
        modules: ['node_modules',DEV_PATH],
        extensions: [".js"]
    },
    plugins: plugins,
};



clientConfig['target'] = 'web';
clientConfig['entry'] = {
    'index'     :  './index.js',
};


module.exports = [ clientConfig ];
