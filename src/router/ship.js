import ShipBuyList from '../views/ship/buy-list'
import ShipSellList from '../views/ship/sell-list'
import ShipBuyDetail from '../views/ship/buy-detail'

export default [
  {
    path: '/ship/buy-list',
    component: ShipBuyList,
    name: 'ShipBuyList'
  }, {
    path: '/ship/sell-list',
    component: ShipSellList,
    name: 'ShipSellList'
  }, {
    path: '/ship/buy-detail',
    component: ShipBuyDetail,
    name: 'ShipBuyDetail',
    meta: {
      nocache: true
    }
  }
]
