import Vue from 'vue'
import { storage } from '@/utils/storage'

const jsonToMap = (obj) => {
  let newObj = {}
  Object.keys(obj).forEach((key, index) => {
    newObj[key] = []
    let value = obj[key]
    if (value && value.length > 0) {
      for (let objItem of value) {
        let map = new Map()
        for (let item of objItem) {
          let key = item[0]
          let value = item[1]
          map.set(key, value)
        }
        newObj[key].push(map)
      }
    }
  })
  console.log('newObj: ', newObj)
  return newObj
}

const state = {
  formObj: {},
  defaultObj: {},
  multipleObj: {}
}

const getters = {
  formObj: (state) => { return state.formObj },
  defaultObj: (state) => { return state.defaultObj },
  multipleObj: (state) => { return state.multipleObj }
}

const mutations = {
  SET_FORMOBJ_ITEM: (state, params) => {
    console.log('params: ', params)
    Vue.set(state.formObj, params.key, params.value)
  },
  SET_FORMOBJ: (state, obj) => {
    state.formObj = obj
  },
  SET_MULTIPLEOBJ_ITEM: (state, params) => {
    Vue.set(state.multipleObj, params.key, params.value)
  },
  SET_FORM_DEFAULT_ITEM: (state, params) => {
    Vue.set(state.defaultObj, params.key, params.value)
  },
  DELETE_FORMOBJ_KEYS: (state, keys) => {
    for (let key of keys) {
      delete state.formObj[key]
    }
  },
  CLEAR_FORMOBJ: (state) => {
    state.formObj = {}
    state.defaultObj = {}
    state.multipleObj = {}
  },
  SAVE_FORM_DATA: (stata, type) => {
    const obj = {
      formObj: state.formObj,
      multipleObj: state.multipleObj
    }
    storage.setObj(`TYBFORM_${type}`, obj)
  },
  GET_FORM_DATA: (state, type) => {
    console.log('get_form_data: ', type)
    let data = storage.getObj(`TYBFORM_${type}`)
    if (data) {
      state.formObj = data.formObj
      state.multipleObj = jsonToMap(data.multipleObj)
    } else {
      state.formObj = {}
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
