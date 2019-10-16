import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({},commonParams,{
        platform: 'h5',
        uin: 0 ,
        needNewCode: 1
    })

    return jsonp(url,data,options)
}

export function getDiscList () {
    const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const data = Object.assign({}, commonParams, {
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      categoryId: 10000000,
      needNewCode: 0,
      sortId: 5,
      sin: 0,
      ein: 19
    })
    return axios({
      method: 'get',
      url: url,
      params: data
    })
  }