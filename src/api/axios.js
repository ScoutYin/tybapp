import config from '../config'
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { AlertPlugin, LoadingPlugin } from 'vux'
import store from '../store'
import router from '../router'
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

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

// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use((conf) => {
  return conf
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  console.log('response: ', response)
  Vue.$vux.loading.hide()
  if (response.status === 200 && response.data) {
    let data = response.data
    if (data && data.code === 1) {
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
          store.commit('CLEAR_HISTORY')
          store.commit('USER_LOGOUT')
          router.replace('/')
          break
        }
        default: {
          return Promise.reject(new Error(data.msg))
        }
      }
    }
  }
}, (error) => {
  console.error(error.msg)
  Vue.$vux.loading.hide()
  Vue.$vux.alert.show({
    title: '网络错误',
    content: error.message,
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

const setHeaderUserToken = () => {
  let userToken = store.getters.userToken
  if (userToken) {
    instance.defaults.headers['USER-TOKEN'] = userToken
  }
}

const loadingList = [
  '/59f175b082680', // ArticleList
  '/5a28fa9b24c3f', // ArticleDetail
  '/5a0e467b1df82', // ShipList
  '/5a0e737f0f3a1', // ShipDetail
  '/5a0e9b0c5b922', // FishList
  '/5a0e9e1478595', // ProductList
  '/5a0e9d2bda581', // ShopFishDetail
  '/5a0ea01aad1a0', // ShopProductDetail
  '/5a122fe1677cc', // GetUserOrderList
  '/5a45ac614a4c1' // GetShopOrderList
]

const checkLoadingList = (url) => {
  if (loadingList.indexOf(url) > -1) {
    Vue.$vux.loading.show({
      text: '加载中...'
    })
  }
}

export default {
  get: (url = '', data = {}) => {
    setHeaderUserToken()
    checkLoadingList(url)
    return instance.get(baseUrl + url, {params: data})
  },
  post: (url = '', data = {}) => {
    setHeaderUserToken()
    // return instance.post(baseUrl + url, qs.stringify(data, { indices: false }))
    return instance.post(baseUrl + url, qs.stringify(data))
  },
  upload: (url = '', data = {}) => {
    Vue.$vux.loading.show({
      text: '上传中...'
    })
    setHeaderUserToken()
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    let params = new FormData()
    params.append('file', data.file, data.file.name)
    return instance.post(
      baseUrl + url,
      params,
      config)
  }
}
