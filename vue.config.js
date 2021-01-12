const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    productionSourceMap: false,
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].is_production = isProduction;
                return args;
            })
    },
    configureWebpack: {
        devtool: 'source-map',
        // configure webpack-dev-server behavior
        devServer: {
            proxy: {
                "/api": {
                    target: "http://10.1.80.174:8000",
                    ws: true,
                    changeOrigin: true,
                }
            },
        }

    }
};
