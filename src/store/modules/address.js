const state = {
  address: {}
}

const getters = {
  address: (state) => state.address
}

const mutations = {
  SET_ADDRESS: (state, data) => {
    state.address = data
    console.log(state.address)
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
