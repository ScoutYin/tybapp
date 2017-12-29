<template>
  <slider-tabview-layout :items="tabItems"></slider-tabview-layout>
</template>

<script>
import SliderTabviewLayout from 'components/layout/slider-tabview-layout'
export default {
  name: 'MineOrderSeller',
  components: {
    SliderTabviewLayout
  },
  data () {
    return {
      tabItems: [
        { title: '全部订单', componentName: 'SellerAll' },
        { title: '待付款', componentName: 'SellerPrePayment' },
        { title: '待发货', componentName: 'SellerPreDeliver' },
        // { title: '待评价', componentName: 'SellerPreEvaluate' },
        { title: '已发货', componentName: 'SellerDelivered' },
        { title: '退款中' },
        { title: '交易成功' },
        { title: '交易关闭' },
        { title: '待付款' }
      ]
    }
  }
}
</script>

<style lang="scss">
.order-seller-container {

}
</style>

