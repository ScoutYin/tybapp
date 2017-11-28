import Vue from 'vue'

const directive = Vue.directive('is-link', {
  bind: (el, binding, vnode) => {
    el.style.position = 'relative'
    let div = window.document.createElement('div')
    div.className = 'is-link'
    el.appendChild(div)
  }
})

export default directive
