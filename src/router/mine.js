import Myfav from 'views/mine/myfav'
import Settings from 'views/mine/settings'
import Order from 'views/mine/order'
import Userinfo from 'views/mine/userinfo'
import OrderBuyer from 'views/mine/order/buyer/index'
import OrderSeller from 'views/mine/order/seller/index'
import SellerDelivered from 'views/mine/order/seller/delivered'
import SellerPreDeliver from 'views/mine/order/seller/pre-deliver'
import SellerPreEvaluate from 'views/mine/order/seller/pre-evaluate'
import SellerPrePayment from 'views/mine/order/seller/pre-payment'

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
    },
    // redirect: '/mine/order/seller/pre-deliver',
    children: [
      {
        path: '/mine/order/seller/delivered',
        component: SellerDelivered,
        name: 'SellerDelivered'
      }, {
        path: '/mine/order/seller/pre-deliver',
        component: SellerPreDeliver,
        name: 'SellerPreDeliver'
      }, {
        path: '/mine/order/seller/pre-evaluate',
        component: SellerPreEvaluate,
        name: 'SellerPreEvaluate'
      }, {
        path: '/mine/order/seller/pre-payment',
        component: SellerPrePayment,
        name: 'SellerPrePayment'
      }
    ]
  }
]
