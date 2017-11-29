import Myfav from 'views/mine/myfav'
import Settings from 'views/mine/settings'
import Order from 'views/mine/order'
import Userinfo from 'views/mine/userinfo'
import OrderBuyer from 'views/mine/order/buyer'
import OrderSeller from 'views/mine/order/seller'

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
  }, {
    path: '/mine/order/buyer',
    component: OrderBuyer,
    name: 'OrderBuyer',
    meta: {
      needLogin: false // debug
    }
  }, {
    path: '/mine/order/seller',
    component: OrderSeller,
    name: 'OrderSeller',
    meta: {
      needLogin: false
    }
  }
]
