import FishBuyList from '../views/fish/buy-list'
import FishSellList from '../views/fish/sell-list'
import FishBuyDetail from '../views/fish/buy-detail'

export default [
  {
    path: '/fish/buy-list',
    component: FishBuyList,
    name: 'FishBuyList'
  }, {
    path: '/fish/sell-list',
    component: FishSellList,
    name: 'FishSellList'
  }, {
    path: '/fish/buy-detail/:id',
    component: FishBuyDetail,
    name: 'FishBuyDetail'
  }
]
