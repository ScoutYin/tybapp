import StoreDetail from 'views/store/detail'
import StoreCart from 'views/store/cart'

export default [
  {
    path: '/store/detail',
    component: StoreDetail,
    name: 'StoreDetail'
  }, {
    path: '/store/cart',
    component: StoreCart,
    name: 'StoreCart'
  }
]
