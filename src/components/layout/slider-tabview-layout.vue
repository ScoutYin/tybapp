<template>
  <l-main-layout back
                 class="slider-tabview-layout-container">
    <l-tab v-model="selected" class="tab">
      <l-tab-item v-for="(item, index) in items"
                  :key="index">
        {{item.title}}
      </l-tab-item>
    </l-tab>
    <keep-alive>
      <component :is="tabView" class="main-view"></component>
    </keep-alive>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'

// 组件异步加载
const asyncComponents = {
  MineFavProduct: (resolve) => require(['@/views/mine/fav/product'], resolve),
  MineFavShip: (resolve) => require(['@/views/mine/fav/ship'], resolve),
  MineFavFish: (resolve) => require(['@/views/mine/fav/fish'], resolve),

  SellerAll: (resolve) => require(['@/views/mine/order/seller/all'], resolve),
  SellerDelivered: (resolve) => require(['@/views/mine/order/seller/delivered'], resolve),
  SellerPreDeliver: (resolve) => require(['@/views/mine/order/seller/pre-deliver'], resolve),
  SellerPreEvaluate: (resolve) => require(['@/views/mine/order/seller/pre-evaluate'], resolve),
  SellerPrePayment: (resolve) => require(['@/views/mine/order/seller/pre-payment'], resolve),

  BuyerAll: (resolve) => require(['@/views/mine/order/buyer/all'], resolve),
  BuyerDelivered: (resolve) => require(['@/views/mine/order/buyer/delivered'], resolve),
  BuyerPreDeliver: (resolve) => require(['@/views/mine/order/buyer/pre-deliver'], resolve),
  BuyerPreEvaluate: (resolve) => require(['@/views/mine/order/buyer/pre-evaluate'], resolve),
  BuyerPrePayment: (resolve) => require(['@/views/mine/order/buyer/pre-payment'], resolve)
}

export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    LTab,
    LTabItem,
    ...asyncComponents
  },
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {
      selected: 0
    }
  },
  computed: {
    tabViews () {
      let names = this.items.map(item => {
        return item.componentName
      })
      return names
    },
    tabView () {
      return this.tabViews[this.selected]
    }
  }
}
</script>

<style lang="scss">
.slider-tabview-layout-container {
  .tab {
    position: fixed;
    z-index: 10;
    top: 44px;
  }
  .main-view {
    position: relative;
    top: 44px;
    height: calc(100% - 44px);
    &.order-list-container {
      .order-item {
        margin: 15px 0 ;
      }
    }
  }
}
</style>
