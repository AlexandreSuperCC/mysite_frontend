module.exports={
    outputDir: 'ROOT',
    publicPath: '/',
    //网站图标设置
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    configureWebpack:{
        devtool: process.env.NODE_ENV === 'production'
                    ? ''
                    : 'source-map',
        resolve:{
            alias:{
                'assets':'@/assets',
                'views':'@/views',
            }
        },
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                },
            ]
        }
    },
    chainWebpack:config => {
        config.devServer
            .port(8084)
            .disableHostCheck(true)
    }
}