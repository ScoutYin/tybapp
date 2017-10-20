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
    // 获取type值和id来确定是否为同一件商品，由于鱼货和渔船的表是独立的
    // 不同商品的同一种商品的id也肯定是不同的
    let type = data.type
    let shop = data.shop
    let goods = data.goods
    let list = state.cartList
    let addFlag = false

    goods.type = type
    goods.cnt = goods.cnt | 1

    for (let i = 0; i < list.length; ++i) {
      let shopExist = false
      if (shop.shopid === list[i].shop.shopid) {
        shopExist = true
        for (let j = 0; j < list[i].goodsList.length; ++j) {
          if (type === list[i].goodsList[j].type &&
            goods.id === list[i].goodsList[j].id) {
            // 同种商品，增加数量
            list[i].goodsList[j].cnt += goods.cnt | 1
            addFlag = true
            break
          }
        }
      }

      // 商铺存在但是未成功添加商品
      if (shopExist && !addFlag) {
        list[i].goodsList.push(goods)
        break
      }
      // 增加成功则退出循环
      if (addFlag) {
        break
      }
    }

    if (!addFlag) {
      let listItem = {
        shop: shop,
        goodsList: []
      }

      listItem.goodsList.push(goods)
      list.push(listItem)
    }

    console.log('list: ', list)
    state.cartList = list
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
    if (!data || !data.shop || (!data.type && data.type !== 0) || !data.goods) {
      Vue.$vux.toast.text('添加商品失败', 'middle')
      return
    }
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
