import FishBuyList from '../views/fish/buy-list'
import FishSellList from '../views/fish/sell-list'

export default [
  {
    path: '/fish/buy-list',
    component: FishBuyList,
    name: 'FishBuyList'
  }, {
    path: '/fish/sell-list',
    component: FishSellList,
    name: 'FishSellList'
  }
]
