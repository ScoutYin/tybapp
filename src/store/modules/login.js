import { userLogin, getUserIndex } from 'api'
import Vue from 'vue'
import { ToastPlugin } from 'vux'
import { USER_TOKEN, storage } from '../../utils/storage'
Vue.use(ToastPlugin)

let getToken = storage.get(USER_TOKEN) || ''

const state = {
  loginVisible: false,
  isLogin: getToken,
  loginNextCb: () => {},
  userToken: getToken,
  userinfo: {},
  registerEndTime: null
}

const getters = {
  loginVisible: (state) => { return state.loginVisible },
  isLogin: (state) => { return state.isLogin },
  userToken: (state) => { return state.userToken },
  userinfo: (state) => { return state.userinfo },
  registerEndTime: (state) => { return state.registerEndTime }
}

const actions = {
  loginSuccess: ({ commit }) => {
    commit('LOGIN_SUCCESS')
  },
  showLogin: ({ commit }, cb) => {
    commit('SHOW_LOGIN', cb)
  },
  hideLogin: ({ commit }) => {
    commit('HIDE_LOGIN')
  },
  userLogin: async ({ commit }, params) => {
    try {
      let res = await userLogin(params)
      if (res) {
        console.log('登录成功！', res)
        Vue.$vux.toast.text('登陆成功', 'middle')
        commit('USER_LOGIN', res.data)
      }
      res = await getUserIndex(params)
      commit('USER_INFO', res.data)
    } catch (err) {
      console.log(err, err.message)
      throw err
    }
  },
  userLogout: async ({ commit }, params) => {
    Vue.$vux.toast.text('用户登出', 'middle')
    commit('USER_LOGOUT')
    // await logout().then((res) => {
    //   if (res) {
    //   }
    // })
  },
  getUserInfo: async ({commit}, params) => {
    try {
      let res = await getUserIndex(params)
      commit('USER_INFO', res.data)
    } catch (err) {
      throw err
    }
  }
}

const mutations = {
  LOGIN_SUCCESS: (state) => {
    // 登陆成功则执行之前的回调函数
    state.loginNextCb()
  },
  SHOW_LOGIN: (state, cb) => {
    state.loginVisible = true
    if (cb && typeof cb === 'function') {
      state.loginNextCb = cb
    }
  },
  HIDE_LOGIN: (state) => {
    state.loginVisible = false
  },
  CONTROL_LOGIN: (state, visible) => {
    state.loginVisible = visible
  },
  USER_LOGIN: (state, data) => {
    state.isLogin = true
    state.loginVisible = false
    state.userToken = data.user_token
    storage.set(USER_TOKEN, data.user_token)
  },
  USER_LOGOUT: (state) => {
    // 用户登出，清空用户信息
    state.isLogin = false
    state.userToken = ''
    state.userinfo = {}
    storage.remove(USER_TOKEN)
  },
  USER_INFO: (state, data) => {
    state.userinfo = data
  },
  SET_REGISTER_END_TIME: (state, time) => {
    console.log('SET_REGISTER_END_TIME', time)
    state.registerEndTime = time
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
