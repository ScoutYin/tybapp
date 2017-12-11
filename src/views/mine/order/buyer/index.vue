<template>
  <l-main-layout :handleBack="back"
                 class="order-buyer-container">
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
        { title: '全部订单', componentName: 'BuyerAll' },
        { title: '待付款', componentName: 'BuyerPrePayment' },
        { title: '待发货', componentName: 'BuyerPreDeliver' },
        { title: '待收货', componentName: 'BuyerDelivered' },
        { title: '待评价', componentName: 'BuyerPreEvaluate' }
      ]
    }
  },
  created () {
    this.selected = 0
  },
  methods: {
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
.order-buyer-container {
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
