const state = {
  cartList: []
}

const getters = {
  cartList: (state) => state.cartList
}

const mutations = {
  SET_CART_LIST: (state, data) => {
    state.cartList = data
    console.log(state.cartList)
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
