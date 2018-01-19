import Vue from 'vue'
import Store from '../store'

// 该指令用于记录非body滚动区滚动位置，一个路由内（$route.fullPath）只能记录一个位置
const scrollPosition = Vue.directive('save-scroll', {
  inserted: (el, binding, vnode) => {
    let name = binding.value
    if (Store.getters.scrollPos && Store.getters.scrollPos[name]) {
      el.scrollTop = Store.getters.scrollPos[name].x || 0
      el.scrollTop = Store.getters.scrollPos[name].y || 0
    } else {
      el.scrollLeft = 0
      el.scrollTop = 0
    }
    el.scrollHandle = () => {
      let newX = el.scrollLeft
      let newY = el.scrollTop
      Store.commit('SAVE_SCROLL', {
        name,
        newX,
        newY
      })
    }
    el.addEventListener('scroll', el.scrollHandle)
  },
  unbind: (el) => {
    el.removeEventListener('scroll', el.scrollHandle)
  }
})

export default scrollPosition
