/**
 * Created by litao on 2018/8/9.
 */
//引入工具类
const util = require('./util/index.js');
const config = require('./config/index.js');
//引入vueloader配置
const vueLoaderConfig = require('./config/vue-loader.conf.js');
const webpack = require('webpack');

const rootPath = util.path.resolve(__dirname, '..');

console.log(rootPath);

module.exports = {
    entry: {
        app: './src/main.js'
    },

    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'core': util.resolve('core'),
            '@': util.resolve('src'),
            'sourcePath': util.resolve('src')
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: [util.resolve('src'), util.resolve('node_modules/webpack-dev-server/client'), util.resolve('node_modules/_easyscroll@1.0.1@easyscroll'), util.resolve('node_modules/easyscroll'), util.resolve('node_modules/vue-baidu-map')]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [util.resolve('src/icons')],
                options: {
                    symbolId: 'icon-[name]',
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [util.resolve('src/icons')],
                options: {
                    limit: 10000,
                    name: util.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: util.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: util.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};
