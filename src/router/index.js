import Vue from 'vue'
import Router from 'vue-router'

import Index from 'views/index'
import IndexHome from 'views/index/home'
import IndexStore from 'views/index/store'
import IndexMessage from 'views/index/message'
import IndexMine from 'views/index/mine'
import RecruitmentRecruiting from 'views/recruitment/recruiting'
import RecruitmentJobHunting from 'views/recruitment/jobHunting'

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
    path: '/recruitment/recruiting',
    component: RecruitmentRecruiting,
    name: 'Recruiting'
  }, {
    path: '/recruitment/jobHunting',
    component: RecruitmentJobHunting,
    name: 'JobHunting'
  }
]

export default new Router({
  routes: routes
})
