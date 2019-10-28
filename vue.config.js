module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map',
        plugins: []
    },
    // configure webpack-dev-server behavior
    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                ws: true,
                changeOrigin: true,
            }
        },
    },
};
