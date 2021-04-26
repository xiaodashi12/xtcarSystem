import axios from 'axios'
import {Message} from 'element-ui'
import {getToken, getLocalStorage, setLocalStorage} from '@/utils/auth'
import store from '@/store/store.js'
import * as dlgUtils from '../utils/dialogUtils'
import Vue from 'vue'
import ElementUI from 'element-ui'
const SUCCESS_CODE = 200;
import wsConsts from '@/utils/wsConsts'

// 创建axios实例
const service = axios.create({
    baseURL: "/", // api的base_url
    dataType:"json",
    headers:{
        'Content-Type':'application/json'
    },
    timeout: 5000 // 请求超时时间
})


// request拦截器
service.interceptors.request.use(config => {
    // console.log(store.getters)
    // if (store.getters.token) {
    //     config.headers.token = getToken();
    // }


    // if (config.method.toLowerCase() !== 'get' && Object.keys(config.data).length > 0) {
    //     let body = {};
    //     let data = {};

    //     for (let key in config.data) {
    //         if (key != 'method') {
    //             body[key] = config.data[key];
    //         }
    //     }
    //     data = body
    //     // if (getToken()) {
    //     //     data.ticket = getToken() || '';
    //     // }

    //     config.data = JSON.stringify(data)
    // }

    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})
Vue.prototype.$http = service

Vue.prototype.$post = function (url, data) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(res => {
      if (res.code == 200) {
        resolve(res)
      } else {
        ElementUI.Message.error(res.msg)
      }
    }).catch(err => {
      // ElementUI.Message.error('网络错误，请重试！')
      console.log(err)
      reject(err)
    })
  })
}

Vue.prototype.$get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params
    }).then(res => {
      if (res.code == 200) {
        resolve(res)
      } else {
        ElementUI.Message.error(res.msg)
      }
    }).catch(err => {
      // ElementUI.Message.error('网络错误，请重试！')
      console.log(err)
      reject(err)
    })
  })
}
// respone拦截器
service.interceptors.response.use(response => {
    if (!response.data) {
        return Promise.reject({code: "", message: '网络异常'});
    }
    const res = response.data;
    console.log(res)
    if (!res.hasOwnProperty('code')) {
        return res;
    }

    let expireTime = getLocalStorage('expireTime');
    if(res.code == 503){
        console.log(res)
        dlgUtils.loginTimeout()
        return Promise.reject({code: res.code, message: res.msg})
    }else{
        setLocalStorage('expireTime', new Date().getTime() + 1000*60*60*24*7)
        return res;
    }

    return Promise.reject({code: res.code, message: res.msg})

}, error => {
    return Promise.reject({code: error.code, message: error.msg})
})
export default service
