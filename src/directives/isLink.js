import Vue from 'vue'

const directive = Vue.directive('is-link', {
  bind: (el, binding, vnode) => {
    let isLink = true
    if (typeof binding.value !== 'undefined') {
      isLink = typeof binding.value === 'function' ? binding.value() : binding.value
    }
    if (isLink) {
      el.style.position = 'relative'
      let div = window.document.createElement('div')
      div.className = 'is-link'
      el.appendChild(div)
    }
  }
})

export default directive
