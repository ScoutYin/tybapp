import Vue from 'vue'
import store from '../../store'

// 通过该指令能判断是否登录，未登录则需要先登录再进行对应的操作
const directive = Vue.directive('permission-click', {
  bind: (el, binding, vnode) => {
    el.addEventListener('click', (e) => {
      if (!store.getters.isLogin) {
        store.dispatch('showLogin')
      } else {
        typeof binding.value === 'function' && binding.value()
      }
    })
  }
})

export default directive
