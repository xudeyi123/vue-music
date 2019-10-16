module.exports = {
    devServer: {
        proxy: { // 代理跨域
            '/api': { // 代理url关键字
              target: 'https://c.y.qq.com', // 需要代理的地址
              secure: false, // 如果是https接口，需要配置这个参数
              changeOrigin: true, // 是否跨域
              pathRewrite: {
                '^/api': '/'
              },
              headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
              }
            },
    }
  }
}