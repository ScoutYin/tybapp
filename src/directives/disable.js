import Vue from 'vue'

const directive = Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

export default directive
