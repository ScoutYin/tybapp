import Vue from 'vue'
import { FORM_FISH, FORM_SHIP, storage } from '@/utils/storage'

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
  },
  SAVE_FORM_FISH: (state) => {
    const obj = {
      formObj: state.formObj,
      selectObj: state.selectObj
    }
    console.log(obj)
    storage.setObj(FORM_FISH, obj)
  },
  SAVE_FORM_SHIP: (state) => {
    const obj = {
      formObj: state.formObj,
      selectObj: state.selectObj
    }
    console.log(obj)
    storage.setObj(FORM_SHIP, obj)
  },
  GET_FORM_FISH: (state) => {
    let data = storage.getObj(FORM_FISH)
    if (data) {
      state.formObj = data.formObj
      state.selectObj = data.selectObj
    }
  },
  GET_FORM_SHIP: (state) => {
    let data = storage.getObj(FORM_SHIP)
    if (data) {
      state.formObj = data.formObj
      state.selectObj = data.selectObj
    }
  },
  CLEAR_FORM_FISH: (state) => {
    storage.remove(FORM_FISH)
  },
  CLEAR_FORM_SHIP: (state) => {
    storage.remove(FORM_SHIP)
  },
  SET_FORM_OBJ: (state, data) => {
    console.log('SET_FORM_OBJ: ', data)
    if (data) {
      state.formObj = data.formObj
      state.selectObj = data.selectObj
    }
  }
}

const actions = {
  clearFormObj: ({ commit }, type) => {
    commit('CLEAR_FORMOBJ')
    commit(`CLEAR_FORM_${type}`)
  },
  getFormObj: ({commit}, type) => {
    commit(`GET_FORM_${type}`)
  },
  saveFormObj: ({commit}, type) => {
    commit(`SAVE_FORM_${type}`)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
