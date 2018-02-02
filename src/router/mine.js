import Settings from 'views/mine/settings'
import Order from 'views/mine/order'
import Userinfo from 'views/mine/userinfo/index'
import UserinfoEdit from 'views/mine/userinfo/userinfo-edit'
import UserAvatarEdit from 'views/mine/userinfo/avatar-edit'
import OrderBuyer from 'views/mine/order/buyer/index'
import OrderSeller from 'views/mine/order/seller/index'
import SellerAll from 'views/mine/order/seller/all'
import SellerDelivered from 'views/mine/order/seller/delivered'
import SellerPreDeliver from 'views/mine/order/seller/pre-deliver'
import SellerPreEvaluate from 'views/mine/order/seller/pre-evaluate'
import SellerPrePayment from 'views/mine/order/seller/pre-payment'

import BuyerAll from 'views/mine/order/buyer/all'
import BuyerDelivered from 'views/mine/order/buyer/delivered'
import BuyerPreDeliver from 'views/mine/order/buyer/pre-deliver'
import BuyerPreEvaluate from 'views/mine/order/buyer/pre-evaluate'
import BuyerPrePayment from 'views/mine/order/buyer/pre-payment'

import MineFav from 'views/mine/fav'
import MineFavProduct from 'views/mine/fav/product'
import MineFavShop from 'views/mine/fav/shop'
import MineFavShip from 'views/mine/fav/ship'
import MineFavFish from 'views/mine/fav/fish'
import MineFavJob from 'views/mine/fav/job'
import MineFavResume from 'views/mine/fav/resume'

import MineGoodsManager from 'views/mine/goods-manager'
import MineOpenShop from 'views/mine/open-shop'

export default [
  {
    path: '/mine/settings',
    component: Settings,
    name: 'Settings'
  }, {
    path: '/mine/fav',
    component: MineFav,
    name: 'MineFav',
    meta: {
      needLogin: true
    },
    children: [
      {
        path: '/mine/fav/product',
        component: MineFavProduct,
        name: 'MineFavProduct'
      }, {
        path: '/mine/fav/shop',
        component: MineFavShop,
        name: 'MineFavShop'
      }, {
        path: '/mine/fav/ship',
        component: MineFavShip,
        name: 'MineFavShip'
      }, {
        path: '/mine/fav/fish',
        component: MineFavFish,
        name: 'MineFavFish'
      }, {
        path: '/mine/fav/job',
        component: MineFavJob,
        name: 'MineFavJob'
      }, {
        path: '/mine/fav/resume',
        component: MineFavResume,
        name: 'MineFavResume'
      }
    ]
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
      needLogin: true,
      nocache: true
    }
  }, {
    path: '/mine/userinfo/edit',
    component: UserinfoEdit,
    name: 'UserinfoEdit',
    meta: {
      needLogin: true
    }
  }, {
    path: '/mine/userinfo/avatar',
    component: UserAvatarEdit,
    name: 'UserAvatarEdit',
    meta: {
      needLogin: true
    }
  }, {
    path: '/mine/order/buyer',
    component: OrderBuyer,
    name: 'OrderBuyer',
    meta: {
      needLogin: true
    },
    children: [
      {
        path: '/mine/order/buyer/all',
        component: BuyerAll,
        name: 'BuyerAll'
      }, {
        path: '/mine/order/buyer/delivered',
        component: BuyerDelivered,
        name: 'BuyerDelivered'
      }, {
        path: '/mine/order/buyer/pre-deliver',
        component: BuyerPreDeliver,
        name: 'BuyerPreDeliver'
      }, {
        path: '/mine/order/buyer/pre-evaluate',
        component: BuyerPreEvaluate,
        name: 'BuyerPreEvaluate'
      }, {
        path: '/mine/order/buyer/pre-payment',
        component: BuyerPrePayment,
        name: 'BuyerPrePayment'
      }
    ]
  }, {
    path: '/mine/order/seller',
    component: OrderSeller,
    name: 'OrderSeller',
    meta: {
      needLogin: true
    },
    // redirect: '/mine/order/seller/pre-deliver',
    children: [
      {
        path: '/mine/order/seller/all',
        component: SellerAll,
        name: 'SellerAll'
      }, {
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
  }, {
    path: '/mine/open-shop',
    component: MineOpenShop,
    name: 'MineOpenShop',
    meta: {
      needLogin: true
    }
  }, {
    path: '/mine/goods-manager',
    component: MineGoodsManager,
    name: 'MineGoodsManager',
    meta: {
      needLogin: true
    }
  }
]
