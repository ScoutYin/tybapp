import Vue from 'vue'
import Router from 'vue-router'

import Index from 'views/index'
import IndexHome from 'views/index/home'
import IndexStore from 'views/store'
import IndexMessage from 'views/message'
import IndexMine from 'views/mine'
import RecruitmentRecruiting from 'views/recruitment/recruiting'
import RecruitmentJobHunting from 'views/recruitment/jobHunting'
import Search from 'views/search'
import Settings from 'views/mine/settings'
import StoreDetail from 'views/store/detail'
import StoreCart from 'views/store/cart'

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
  }, {
    path: '/recruitment/recruiting',
    component: RecruitmentRecruiting,
    name: 'Recruiting'
  }, {
    path: '/recruitment/jobHunting',
    component: RecruitmentJobHunting,
    name: 'JobHunting'
  }, {
    path: '/mine/settings',
    component: Settings,
    name: 'Settings'
  }, {
    path: '/store/detail',
    component: StoreDetail,
    name: 'StoreDetail'
  }, {
    path: '/store/cart',
    component: StoreCart,
    name: 'StoreCart'
  }
]

export default new Router({
  // mode history 需要后端服务器作支持，否则可能会白屏
  // mode: 'history',
  routes: routes
})
