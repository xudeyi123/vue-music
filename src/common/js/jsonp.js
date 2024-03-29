import originJsonp from 'jsonp'

export default function jsonp(url,data,option) {
    url += (url.indexOf('?') < 0 ? '?':'&') + param(data)
    return new Promise((resolve,reject)=> {
        originJsonp(url,option, (err,data) => {
            if(!err) {
                resolve(data)
            }else{
                reject(data)
            }
        })
    })
}


function param(data) {
    let url = ''
    for(let k in data) {
        let value = data[k] === 'undefined'? ' ' : data[k]
        url +=`&${k}=${decodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}