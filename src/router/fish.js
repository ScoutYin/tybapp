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
    path: '/fish/buy-detail',
    component: FishBuyDetail,
    name: 'FishBuyDetail',
    meta: {
      nocache: true
    }
  }
]
