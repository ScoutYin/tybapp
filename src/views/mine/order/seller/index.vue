<template>
  <l-main-layout :handleBack="back"
                 class="order-seller-container">
    <l-tab v-model="selected" class="tab">
      <l-tab-item v-for="(item, index) in tabItems"
                  :key="index">
        {{item.title}}
      </l-tab-item>
    </l-tab>
    <router-view class="main-view"></router-view>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'
export default {
  components: {
    LTab,
    LTabItem,
    LMainLayout
  },
  data () {
    return {
      selected: -1,
      tabItems: [
        { title: '全部订单', componentName: 'SellerAll' },
        { title: '待付款', componentName: 'SellerPrePayment' },
        { title: '待发货', componentName: 'SellerPreDeliver' },
        { title: '待评价', componentName: 'SellerPreEvaluate' },
        { title: '已发货', componentName: 'SellerDelivered' },
        { title: '退款中' },
        { title: '交易成功' },
        { title: '交易关闭' },
        { title: '待付款' }
      ]
    }
  },
  created () {
    this.selected = 0
  },
  methods: {
    // onTabItem (index) {
    //   this.router
    // }
    back () {
      this.$router.push({ name: 'Mine' })
    }
  },
  watch: {
    selected (val, oldVal) {
      let componentName = this.tabItems[val].componentName
      this.$router.push({name: componentName})
    }
  }
}
</script>

<style lang="scss">
.order-seller-container {
  .tab {
    position: fixed;
    z-index: 10;
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
