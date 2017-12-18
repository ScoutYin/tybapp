
const state = {
  selectVisible: false
}

const getters = {
  selectVisible: (state) => { return state.selectVisible }
}

const mutations = {
  CONTROL_SELECT_VIEW: (state, visible) => {
    state.selectVisible = visible
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
