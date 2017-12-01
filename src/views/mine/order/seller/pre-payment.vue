<template>
  <div class="seller-pre-payment-container">
    <div class="order-list">
      <l-order-item v-for="(item, index) in orderData"
                    :key="index"
                    class="order-item"
                    :item="item">
      </l-order-item>
    </div>
  </div>
</template>

<script>
import { getUserOrderList, getCommonThumb } from 'api'
import LOrderItem from 'components/items/order-item'
export default {
  name: 'SellerPrePayment',
  components: {
    LOrderItem
  },
  data () {
    return {
      orderData: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      try {
        let res = await getUserOrderList()
        this.orderData = res.data
        await this.getThumbs()
        this.orderData = Object.assign({}, this.orderData)
        console.log('getOrderList: ', this.orderData)
      } catch (err) {
        throw err
      }
    },
    async getThumbs () {
      for (let i = 0; i < this.orderData.length; ++i) {
        let arr = this.orderData[i].OrderData || []
        let thumbIds = this.getThumbIds(arr)
        console.log('thumbIds: ', thumbIds)
        try {
          let thumbs = await getCommonThumb({id: thumbIds})
          this.orderData[i].thumbs = thumbs.data
        } catch (err) {
          throw err
        }
      }
    },
    getThumbIds (arr) {
      let thumbStr = ''
      for (let i = 0; i < arr.length; ++i) {
        let thumbId = arr[i].data_thumb
        thumbStr = thumbStr + thumbId + ','
      }
      if (thumbStr !== '') {
        console.log(thumbStr)
        return thumbStr.slice(0, -1)
      }
      return thumbStr
    }
  }
}
</script>

<style lang="scss">
.seller-pre-payment-container {
  .order-item {
    margin-top: 10px;
  }
}
</style>
