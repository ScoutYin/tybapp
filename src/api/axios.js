import config from '../config'
import axios from 'axios'
import Vue from 'vue'
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// const env = process.env.NODE_ENV
// const port = process.env.PORT || config.dev.port

const baseUrl = config.dev.baseUrl

var instance = axios.create({
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: false
})

instance.interceptors.request.use((conf) => {
  return conf
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  console.log('response: ', response)
  if (response.status === 200) {
    let data = response.data
    // 对errcode进行处理，非0的errcode均为错误的errcode，给予不同的提示操作
    switch (data.errcode) {
      case 0: {
        return response.data
      }
      default: {
        Vue.$vux.alert.show({
          title: '错误',
          content: data.errmsg,
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      }
    }
  }
}, (error) => {
  console.log(error)
  Vue.$vux.alert.show({
    title: '网络错误',
    content: new Error(error),
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

export default async (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    return instance.get(url, { params: data })
  }

  if (type === 'POST') {
    return instance.post(url, data)
  }
}
