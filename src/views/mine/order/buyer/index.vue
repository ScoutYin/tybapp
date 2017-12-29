<template>
  <slider-tabview-layout :items="tabItems"></slider-tabview-layout>
</template>

<script>
import SliderTabviewLayout from 'components/layout/slider-tabview-layout'
export default {
  name: 'MineOrderBuyer',
  components: {
    SliderTabviewLayout
  },
  data () {
    return {
      tabItems: [
        { title: '全部订单', componentName: 'BuyerAll' },
        { title: '待付款', componentName: 'BuyerPrePayment' },
        { title: '待发货', componentName: 'BuyerPreDeliver' },
        { title: '待收货', componentName: 'BuyerDelivered' }
        // { title: '待评价', componentName: 'BuyerPreEvaluate' }
      ]
    }
  }
}
</script>

<style lang="scss">
.order-buyer-container {

}
</style>
