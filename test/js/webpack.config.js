//获得发布命令的配置
var currentTarget = process.env.npm_lifecycle_event;
var debug,          // 是否是调试
    devServer,      // 是否是热更新模式
    serverEnv,      // 服务器环境，可选（dev，test，product）
    minimize;       // 是否需要压缩


if (currentTarget == "build") { // 发布模式
    debug = false, devServer = false, minimize = true, serverEnv = 'production'; 
} else if (currentTarget == "dev-watch") { // 热更新模式
    debug = true, devServer = true, minimize = false, serverEnv  = 'develop'; 
}
//准备开始配置CONFIG
var webpack = require("webpack");
var path = require('path')

var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var CleanPlugin = require('clean-webpack-plugin')


var ROOT_PATH   = path.resolve(__dirname);
var DEV_PATH    = path.resolve(ROOT_PATH, 'src');
var MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');

console.log('当前的状态',currentTarget)

var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var plugins = []


var clientConfig = {
    entry : {
        'index'     :  './index.js',
    },
    output: {
        path:  BUILD_PATH,
        filename: (debug) ? '[name].js' : '[name].min.js',
        libraryTarget: 'umd',
        library: "coinchat",
        libraryExport: "default"
    },
    devtool: 'source-map',
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

module.exports = [ clientConfig ];
