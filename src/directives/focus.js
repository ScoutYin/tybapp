import Vue from 'vue'

// 通过该指令能判断是否登录，未登录则需要先登录再进行对应的操作
const directive = Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

export default directive
