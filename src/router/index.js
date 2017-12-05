import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Index from 'views/index'
import IndexHome from 'views/index/home'
import IndexStore from 'views/store'
import IndexMessage from 'views/message'
import IndexMine from 'views/mine'

import Search from 'views/search'

// import MineMyfav from 'views/mine/myfav'
import Recruitment from './recruitment'
import Store from './store'
import Mine from './mine'
import Fish from './fish'
import Ship from './ship'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: Index,
    name: 'Index',
    redirect: '/home',
    meta: { keepAlive: true },
    children: [
      {
        path: '/home',
        component: IndexHome,
        name: 'Home',
        meta: { keepAlive: true }
      }, {
        path: '/store',
        component: IndexStore,
        name: 'Store',
        meta: { keepAlive: true }
      }, {
        path: '/message',
        component: IndexMessage,
        name: 'Message',
        meta: { keepAlive: true }
      }, {
        path: '/mine',
        component: IndexMine,
        name: 'Mine',
        meta: { keepAlive: true }
      }
    ]
  }, {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  ...Mine,
  ...Recruitment,
  ...Store,
  ...Fish,
  ...Ship
]

let router = new Router({
  // mode history 需要后端服务器作支持，否则可能会白屏
  // mode: 'history',
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.needLogin && !store.getters.isLogin) {
    // 登陆成功执行callback func并进行路由跳转，否则停滞在当前路由页面
    store.dispatch('showLogin', () => {
      next()
    })
  } else {
    next()
  }
})

export default router
