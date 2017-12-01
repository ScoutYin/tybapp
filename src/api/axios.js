import config from '../config'
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { AlertPlugin } from 'vux'
import store from '../store'
Vue.use(AlertPlugin)

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// const env = process.env.NODE_ENV
// const port = process.env.PORT || config.dev.port

const baseUrl = config.dev.baseUrl

var instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: false
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use((conf) => {
  return conf
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  console.log('response: ', response)
  if (response.status === 200) {
    let data = response.data
    if (data.code === 1) {
      return response.data
    } else {
      Vue.$vux.alert.show({
        title: '错误',
        content: data.msg,
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
      switch (data.code) {
        // USER-TOKEN 令牌错误需要退出登录
        case -9: {
          store.commit('USER_LOGOUT')
          break
        }
        default: {
          return Promise.reject(new Error(data.msg))
        }
      }
    }
  }
}, (error) => {
  console.log(new Error(error))
  Vue.$vux.alert.show({
    title: '网络错误',
    content: new Error(error.message),
    onShow () {
      console.log('Plugin: I\'m showing')
      return Promise.reject(error)
    },
    onHide () {
      console.log('Plugin: I\'m hiding')
      return Promise.reject(error)
    }
  })
})

// export default async (url = '', data = {}, type = 'GET') => {
//   let userToken = store.getters.userToken
//   if (userToken) {
//     instance.defaults.headers['USER-TOKEN'] = userToken
//   }
//   type = type.toUpperCase()
//   url = baseUrl + url

//   if (type === 'GET') {
//     return instance.get(url, { params: data })
//   }

//   if (type === 'POST') {
//     // instance.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//     return instance.post(url, qs.stringify(data))
//   }
// }

const setHeaderUserToken = () => {
  let userToken = store.getters.userToken
  if (userToken) {
    instance.defaults.headers['USER-TOKEN'] = userToken
  }
}

export default {
  get: (url = '', data = {}) => {
    setHeaderUserToken()
    return instance.get(baseUrl + url, {params: data})
  },
  post: (url = '', data = {}) => {
    setHeaderUserToken()
    return instance.post(baseUrl + url, qs.stringify(data))
  }
}
