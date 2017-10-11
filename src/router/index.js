import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: resolve => require(['views/index'], resolve),
    name: 'Index',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: resolve => require(['views/index/home'], resolve),
        name: 'Home'
      }, {
        path: '/store',
        component: resolve => require(['views/index/store'], resolve),
        name: 'Store'
      }, {
        path: '/message',
        component: resolve => require(['views/index/message'], resolve),
        name: 'Message'
      }, {
        path: '/mine',
        component: resolve => require(['views/index/mine'], resolve),
        name: 'Mine'
      }
    ]
  }
]

export default new Router({
  routes: routes
})
