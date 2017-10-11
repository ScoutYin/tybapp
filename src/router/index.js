import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: resolve => require(['@/views/index.vue'], resolve),
    name: 'Index'
  }
]

export default new Router({
  routes: routes
})
