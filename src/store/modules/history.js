
const state = {
  history: ['/home'],
  scrollPos: {},
  forward: true
}
const getters = {
  history: (state) => state.history,
  scrollPos: (state) => state.scrollPos
}
const mutations = {
  FORWARD: (state, addPath) => {
    state.history.push(addPath)
  },
  BACK: (state, delPath) => {
    let index = state.history.indexOf(delPath)
    let length = state.history.length
    state.history.splice(index + 1, length - index + 1)
  },
  SAVE_SCROLL: (state, {name, newX, newY}) => {
    state.scrollPos[name] = {
      x: newX,
      y: newY
    }
  }
}
export default {
  state,
  getters,
  mutations
}
