import Vue from 'vue'

const directive = Vue.directive('permission-click', {
  bind: (el, binding, vnode) => {
    console.log('permission-click: ', el, binding, vnode)
  }
})

export default directive
