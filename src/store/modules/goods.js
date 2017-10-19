import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

const state = {
  cartList: []
}

const getters = {
  cartList: (state) => {
    return state.cartList
  }
}

const mutations = {
  ADD_GOODS: (state, data) => {
    state.cartList.push(data)
  },
  DELETE_GOODS: (state, id) => {
    let arr = state.cartList
    for (let i = 0; i < arr.length; ++i) {
      if (id === arr[i].id) {
        arr.splice(i, 1)
        break
      }
    }
    state.cartList = arr
  },
  CLEAR_CART: (state) => {
    state.cartList = []
  }
}

const actions = {
  // 添加商品到购物车
  addGoods: async ({commit}, data) => {
    commit('ADD_GOODS', data)
    Vue.$vux.toast.text('已添入购物车', 'middle')
  },
  // 根据id删除购物车里的商品
  deleteGoods: async ({commit}, goodsId) => {
    commit('DELETE_GOODS', goodsId)
  },
  // 清空购物车
  clearCart: async ({commit}) => {
    commit('CLEAR_CART')
    Vue.$vux.toast.text('已清空购物车', 'middle')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
