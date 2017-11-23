import Myfav from 'views/mine/myfav'
import Settings from 'views/mine/settings'
import Order from 'views/mine/order'
import Userinfo from 'views/mine/userinfo'

export default [
  {
    path: '/mine/settings',
    component: Settings,
    name: 'Settings'
  }, {
    path: '/mine/myfav',
    component: Myfav,
    name: 'MineMyfav',
    meta: {
      needLogin: true
    }
  }, {
    path: '/mine/order',
    component: Order,
    name: 'Order',
    meta: {
      needLogin: true
    }
  }, {
    path: '/mine/userinfo',
    component: Userinfo,
    name: 'Userinfo',
    meta: {
      needLogin: true
    }
  }
]
