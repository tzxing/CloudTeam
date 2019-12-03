const WebpackCdnPlugin = require('webpack-cdn-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const express = require('express')
const path = require('path')

module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            new WebpackCdnPlugin({
                modules: [
                    {
                        name: 'vue',
                        var: 'Vue',
                        path: 'vue.runtime.min.js',
                        devUrl: ':name/dist/vue.runtime.js'
                    },
                    {
                        name: 'vue-router',
                        var: 'VueRouter',
                        path: 'vue-router.min.js',
                        devUrl: ':name/dist/vue-router.js'
                    },
                    {
                        name: 'vuex',
                        var: 'Vuex',
                        path: 'vuex.min.js',
                        devUrl: ':name/dist/vuex.js'
                    },
                    {
                        name: 'element-ui',
                        var: 'ELEMENT',
                        path: 'index.js',
                        style: 'theme-chalk/index.css',
                        devUrl:':name/lib/:path'
                    },
                    {
                        name: 'animate.css',
                        style: 'animate.min.css',
                        cssOnly: true,
                        devUrl:':name/:path'
                    }
                ],
                publicPath: '/node_modules',
                prodUrl: '//cdn.bootcss.com/:name/:version/:path',
                prod: isProduction
            })
        ],

        // configure webpack-dev-server behavior
        devServer: {
            // 为了使WebpackCdnPlugin插件能再调试模式下正常工作，必须编码实现读取node_modules
            setup: (app) => {
                console.log(__dirname)
                app.use('/node_modules/',
                    express.static(path.join(__dirname, 'node_modules')));
            },
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:8000",
                    ws: true,
                    changeOrigin: true,
                }
            },
        }

    }
};
