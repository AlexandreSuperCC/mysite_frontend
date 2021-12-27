module.exports={
    configureWebpack:{
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

}