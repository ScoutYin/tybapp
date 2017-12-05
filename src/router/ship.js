import ShipBuyList from '../views/ship/buy-list'
import ShipSellList from '../views/ship/sell-list'

export default [
  {
    path: '/ship/buy-list',
    component: ShipBuyList,
    name: 'ShipBuyList'
  }, {
    path: '/ship/sell-list',
    component: ShipSellList,
    name: 'ShipSellList'
  }
]
