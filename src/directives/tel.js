import Vue from 'vue'

// 通过该指令来触发电话
const directive = Vue.directive('tel', {
  inserted: (el, bind) => {
    el.addEventListener('click', (e) => {
      let tel = bind.value
      window.location.href = `tel:${tel}`
    })
  }
})

export default directive
