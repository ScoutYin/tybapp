import Vue from 'vue'

/**
 * 使用该指令从而比较便捷地引入icon
 * 考虑到图标的引入方式可能为Font class也可能为Symbol
 * 为了方便以后进行切换
 */
const directive = Vue.directive('icon', {
  inserted: (el, binding, vnode) => {
    // console.log(el, binding, vnode)
    // el = '<svg slot="icon" aria-hidden="true"><use :xlink:href="`#${icon}`"></use></svg>'
  }
})

export default directive
