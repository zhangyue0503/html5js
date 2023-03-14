const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/zy': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '/zy': ''
        }
      }
    }
  }
})


