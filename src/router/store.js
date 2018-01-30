import StoreDetail from 'views/store/detail'
import StoreCart from 'views/store/cart'
import ConfirmCart from 'views/store/confirm-cart'

export default [
  {
    path: '/store/detail',
    component: StoreDetail,
    name: 'StoreDetail'
  }, {
    path: '/store/cart',
    component: StoreCart,
    name: 'StoreCart'
  }, {
    path: '/store/confirm-cart',
    component: ConfirmCart,
    name: 'ConfirmCart'
  }
]
