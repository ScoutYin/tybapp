// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from './i18n'
import 'common/style/normalize.css'
// import './assets/iconfont/iconfont.css'
import 'common/style/common.css'
import store from './store'
import directives from './directives'
import filters from './filters'
import commonComponents from 'components/common'
import 'lib-flexible'

console.log('i18n: ', VueI18n)

Vue.use(commonComponents)
// Vue.use(store)

Vue.config.productionTip = false

Vue.prototype.parseHTML = (content) => {
  if (!content) {
    return content
  }
  return content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, url) => {
    return match.replace(url, 'http://www.taoyu58.com' + url)
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueI18n,
  directives,
  filters,
  template: '<App/>',
  components: { App }
})

// window.document.addEventListener('deviceready', function () {
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     VueI18n,
//     directives,
//     filters,
//     template: '<App/>',
//     components: { App }
//   })
//   // window.navigator.splashscreen.hide()
// }, false)
