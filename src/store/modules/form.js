const state = {
  selectVisible: false,
  selectTitle: '',
  selectList: [],
  onComplete: Function
}

const getters = {
  selectVisible: (state) => { return state.selectVisible },
  selectTitle: (state) => { return state.selectTitle },
  selectList: (state) => { return state.selectList }
}

const mutations = {
  SHOW_SELECT_VIEW: (state, params) => {
    state.selectVisible = true
    state.selectTitle = params.title || ''
    state.selectList = params.selectList || []
    state.onComplete = params.onComplete || Function
  },
  HIDE_SELECT_VIEW: (state) => {
    state.selectVisible = false
  },
  SELECT_COMPLETE: (state, item) => {
    state.selectVisible = false
    typeof state.onComplete === 'function' && state.onComplete(item)
  }
}

const actions = {
  showSelectView: ({ commit }, params) => {
    commit('SHOW_SELECT_VIEW', params)
  },
  hideSelectView: ({ commit }) => {
    commit('HIDE_SELECT_VIEW')
  },
  selectComplete: ({ commit }, item) => {
    commit('SELECT_COMPLETE', item)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
