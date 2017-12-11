import { userLogin, getUserIndex } from 'api'
import Vue from 'vue'
import { ToastPlugin } from 'vux'
import { USER_TOKEN, storage } from '../../utils/storage'
Vue.use(ToastPlugin)

const state = {
  loginVisible: false,
  isLogin: false,
  loginNextCb: () => {},
  userToken: '',
  userinfo: {}
}

const getters = {
  loginVisible: (state) => { return state.loginVisible },
  isLogin: (state) => {
    if (state.userToken === '') {
      let token = storage.get(USER_TOKEN)
      if (token) {
        state.isLogin = true
        return true
      }
    } else {
      state.isLogin = true
    }
    return state.isLogin
  },
  userToken: (state) => {
    if (!state.userToken) {
      let token = storage.get(USER_TOKEN)
      state.userToken = token
    }
    return state.userToken
  },
  userinfo: (state) => {
    return state.userinfo
  }
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
      await userLogin(params).then((res) => {
        if (res) {
          Vue.$vux.toast.text('登陆成功', 'middle')
          commit('USER_LOGIN', res.data)
        }
      })
      await getUserIndex(params).then((res) => {
        console.log('userinfo: ', res.data)
        commit('USER_INFO', res.data)
      })
    } catch (err) {
      console.log(err, err.message)
    }
  },
  userLogout: async ({ commit }, params) => {
    Vue.$vux.toast.text('用户登出', 'middle')
    commit('USER_LOGOUT')
    // await logout().then((res) => {
    //   if (res) {
    //   }
    // })
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
    storage.remove(USER_TOKEN)
  },
  USER_INFO: (state, data) => {
    state.userinfo = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
