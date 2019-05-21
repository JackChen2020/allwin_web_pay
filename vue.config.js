const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

//开发环境
// const ServerUrl = "http://localhost:8000"

// 测试环境
// const ServerUrl = "http://47.244.129.198"

// 生产环境
const ServerUrl = "http://allwin6666.com"

module.exports = {
  outputDir: 'dist',
  publicPath: '/pay',
  chainWebpack: (config)=>{
    //修改文件引入自定义路径
    config.resolve.alias
        .set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        // target: 'http://localhost:8000',
        target : ServerUrl,
        changeOrigin: true,
        ws: false,
      },
    }
  },
};
