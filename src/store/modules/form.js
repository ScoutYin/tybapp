import Vue from 'vue'
import { storage } from '@/utils/storage'

const state = {
  formObj: {},
  selectObj: {},
  defaultObj: {}
}

const getters = {
  formObj: (state) => { return state.formObj },
  selectObj: (state) => { return state.selectObj },
  defaultObj: (state) => { return state.defaultObj }
}

const mutations = {
  SET_FORMOBJ_ITEM: (state, params) => {
    console.log('params: ', params)
    Vue.set(state.formObj, params.key, params.value)
  },
  SET_SELECTOBJ_ITEM: (state, params) => {
    Vue.set(state.selectObj, params.key, params.value)
  },
  SET_FORM_DEFAULT_ITEM: (state, params) => {
    Vue.set(state.defaultObj, params.key, params.value)
  },
  CLEAR_FORMOBJ: (state) => {
    state.formObj = {}
    state.selectObj = {}
    state.defaultObj = {}
  },
  SET_FORM_OBJ: (state, data) => {
    console.log('SET_FORM_OBJ: ', data)
    if (data) {
      state.formObj = data.formObj
      state.selectObj = data.selectObj
    }
  },
  SAVE_FORM_DATA: (stata, type) => {
    const obj = {
      formObj: state.formObj,
      selectObj: state.selectObj
    }
    storage.setObj(`TYBFORM_${type}`, obj)
  },
  GET_FORM_DATA: (state, type) => {
    console.log('get_form_data: ', type)
    let data = storage.getObj(`TYBFORM_${type}`)
    if (data) {
      state.formObj = data.formObj
      state.selectObj = data.selectObj
    }
  },
  CLEAR_FORM_DATA: (state, type) => {
    storage.remove(`TYBFORM_${type}`)
  }
}

const actions = {
  clearFormObj: ({ commit }, type) => {
    commit('CLEAR_FORMOBJ')
    commit('CLEAR_FORM_DATA', type)
  },
  getFormObj: ({commit}, type) => {
    commit('GET_FORM_DATA', type)
  },
  saveFormObj: ({commit}, type) => {
    commit('SAVE_FORM_DATA', type)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
