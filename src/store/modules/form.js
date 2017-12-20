import Vue from 'vue'

const state = {
  formObj: {},
  selectObj: {}
}

const getters = {
  formObj: (state) => { return state.formObj },
  selectObj: (state) => { return state.selectObj }
}

const mutations = {
  SET_FORMOBJ_ITEM: (state, params) => {
    console.log('params: ', params)
    Vue.set(state.formObj, params.key, params.value)
  },
  SET_SELECTOBJ_ITEM: (state, params) => {
    Vue.set(state.selectObj, params.key, params.value)
  },
  CLEAR_FORMOBJ: (state) => {
    state.formObj = {}
    state.selectObj = {}
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
