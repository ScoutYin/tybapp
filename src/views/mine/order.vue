<template>
  <l-main-layout class="mine-order-container" back topLoad>
    <div class="order-list">
      <l-order-item v-for="(item, index) in items" :key="index" :item="item" class="item">
      </l-order-item>
    </div>
  </l-main-layout>
</template>

<script>
import LOrderItem from 'components/lists/order-item'
import LMainLayout from 'components/layout/main-layout'
export default {
  name: 'MineOrder',
  components: {
    LOrderItem,
    LMainLayout
  },
  data () {
    return {
      items: [
        {
          shopName: '一横的店铺',
          status: 0,
          goods: [{
            thumb: '',
            title: '我买了条鱼',
            remark: '没有备注',
            salePrice: '100.00',
            preSalePrice: '1000.00'
          }],
          totalPrice: '108.00',
          freight: '8.00'
        }, {
          shopName: '二横的店铺',
          status: 1,
          goods: [{
            thumb: '',
            title: '我买了条鱼',
            remark: '没有备注',
            salePrice: '100.00',
            preSalePrice: '1000.00'
          }, {
            thumb: '',
            title: '我买只条虾',
            remark: '要活的',
            salePrice: '10.00',
            preSalePrice: '20.00'
          }],
          totalPrice: '108.00',
          freight: '8.00'
        }, {
          shopName: '一竖的店铺',
          status: 2,
          goods: [{
            thumb: '',
            title: '我买了条船',
            remark: '没有备注',
            salePrice: '1390000.00',
            preSalePrice: '2000000.00'
          }],
          totalPrice: '108.00',
          freight: '8.00'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.mine-order-container {
  overflow: hidden;
  .order-list {
    padding: 10px;
    .item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
