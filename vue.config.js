module.exports = {
    devServer: {
        proxy: {
            // 代理跨域
            "/api/getDiscList": {
                // 代理url关键字
                target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg", // 需要代理的地址
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/api/getDiscList": ""
                },
                headers: {
                    referer: "https://c.y.qq.com/",
                    host: "c.y.qq.com"
                }
            },
            "/api/getPurlUrl": {
                //target代表源地址
                target: "https://u.y.qq.com/cgi-bin/musicu.fcg",
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/api/getPurlUrl": ""
                },
                headers: {
                    referer: "https://y.qq.com/",
                    origin: "https://y.qq.com",
                    "Content-type": "application/x-www-form-urlencoded"
                }
            },
            "/api/lyric": {
                //target代表源地址
                target: "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //允许跨域
                pathRewrite: {
                    "^/api/lyric": ""
                },
                headers: {
                    referer: 'https://c.y.qq.com/',
                    host: 'c.y.qq.com'
                }
            },
        }
    }
};
