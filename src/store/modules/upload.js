import Vue from 'vue'

const state = {
  uploadPictureCache: {}
}

const getters = {
  uploadPictureCache: (state) => { return state.uploadPictureCache }
}

const mutations = {
  SET_UPLOAD_PICTURE_ITEM: (state, params = {}) => {
    if (!params.key) {
      return
    }
    Vue.set(state.uploadPictureCache, params.key, params.value)
    console.log('state.uploadPictureCache', state.uploadPictureCache)
  },
  DEL_UPLOAD_PICTURE_ITEM: (state, key) => {
    if (!key) {
      return
    }
    delete state.uploadPictureCache[key]
    state.uploadPictureCache = Object.assign({}, state.uploadPictureCache)
  },
  CLEAR_UPLOAD_PICTURE_CACHE: (state) => {
    state.uploadPictureCache = {}
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
