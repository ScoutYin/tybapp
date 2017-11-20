import { userLogin, logout } from 'api'
import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

const state = {
  loginVisible: false,
  isLogin: false,
  loginNextCb: () => {}
}

const getters = {
  loginVisible: (state) => { return state.loginVisible },
  isLogin: (state) => { return state.isLogin }
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
    await userLogin(params).then((res) => {
      console.log('userLogin:', res)
      if (res) {
        Vue.$vux.toast.text('登陆成功', 'middle')
        commit('USER_LOGIN')
      }
    })
  },
  userLogout: async ({ commit }, params) => {
    await logout().then((res) => {
      if (res) {
        Vue.$vux.toast.text('用户登出', 'middle')
        commit('USER_LOGOUT')
      }
    })
  }
}

const mutations = {
  LOGIN_SUCCESS: (state) => {
    // 登陆成功则执行之前的回调函数
    state.loginNextCb()
  },
  SHOW_LOGIN: (state, cb) => {
    state.loginVisible = true
    state.loginNextCb = cb
  },
  HIDE_LOGIN: (state) => {
    state.loginVisible = false
  },
  USER_LOGIN: (state) => {
    state.isLogin = true
    state.loginVisible = false
  },
  USER_LOGOUT: (state) => {
    // 用户登出，清空用户信息
    state.isLogin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
