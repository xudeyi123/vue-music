import jsonp from "../common/js/jsonp";
import { commonParams, options } from "./config";
import axios from "axios";

const debug = process.env.NODE_ENV !== "production";

export function getRecommend() {
    const url =
        "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";

    const data = Object.assign({}, commonParams, {
        platform: "h5",
        uin: 0,
        needNewCode: 1
    });

    return jsonp(url, data, options);
}

export function getDiscList() {
    // const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const url = "/api/getDiscList";
    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        categoryId: 10000000,
        needNewCode: 0,
        sortId: 5,
        sin: 0,
        ein: 19
    });
    return axios({
        method: "get",
        url: url,
        params: data
    });
}

export function getSongList (disstid) {
  const url = debug ? '/api/getCdInfo' : 'http://ustbhuangyi.com/music/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    let ret = res.data
          if (typeof ret === 'string') {
            const reg = /^\w+\(({.+})\)$/
            const matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }
    return Promise.resolve(ret)
  })
}