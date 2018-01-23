
const state = {
  history: [],
  scrollPos: {},
  forward: true
}
const getters = {
  history: (state) => state.history,
  scrollPos: (state) => state.scrollPos
}
const mutations = {
  FORWARD: (state, path) => {
    state.history.push(path)
  },
  BACK: (state, {toPath, fromPath}) => {
    let index = state.history.indexOf(toPath)
    let length = state.history.length
    state.history.splice(index + 1, length - index + 1)
    delete state.scrollPos[fromPath]
  },
  SAVE_SCROLL: (state, {name, newX, newY}) => {
    state.scrollPos[name] = {
      x: newX,
      y: newY
    }
  },
  CLEAR_HISTORY: (state) => {
    state.history = []
  }
}
export default {
  state,
  getters,
  mutations
}
