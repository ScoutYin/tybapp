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
import Article from './article'
import Message from './message'
import Publish from './publish'
import Shop from './shop'
import Address from './address'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: Index,
    name: 'Index',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: IndexHome,
        name: 'Home'
      }, {
        path: '/store',
        component: IndexStore,
        name: 'Store'
      }, {
        path: '/message',
        component: IndexMessage,
        name: 'Message'
      }, {
        path: '/mine',
        component: IndexMine,
        name: 'Mine'
      }
    ]
  }, {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  ...Message,
  ...Mine,
  ...Recruitment,
  ...Store,
  ...Fish,
  ...Ship,
  ...Article,
  ...Publish,
  ...Shop,
  ...Address
]

let router = new Router({
  // mode history 需要后端服务器作支持，否则可能会白屏
  mode: 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    // 记录body滚动位置，非body滚动用v-save-scroll指令
    if (savedPosition && !from.meta.noKeepAlive) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
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
router.beforeEach((to, from, next) => {
  let history = store.getters.history
  console.log('history: ', history)
  if (history.indexOf(to.fullPath) > -1) {
    store.commit('BACK', {toPath: to.fullPath, fromPath: from.fullPath})
    from.meta.noKeepAlive = true
  } else {
    store.commit('FORWARD', to.fullPath)
    // 明确不需要缓存的路由nocache需为true
    from.meta.noKeepAlive = from.meta.nocache
  }
  next()
})
export default router
