module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'Kolumn | A Knowledge Column'

        return args
      })
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
