<template>
  <l-loadmore class="seller-pre-payment-container"
              :top-load-method="initData"
              ref="loadmore">
    <div class="order-list">
      <l-order-item v-for="(item, index) in list"
                    :key="index"
                    class="order-item"
                    :item="item"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="canLoadMore"
                    infinite-scroll-distance="10">
      </l-order-item>
    </div>
  </l-loadmore>
</template>

<script>
import { getUserOrderList, getCommonThumb } from 'api'
import LLoadmore from 'components/loadmore'
import LOrderItem from 'components/items/order-item'
import listMixin from '@/mixins/list'
export default {
  name: 'SellerPrePayment',
  components: {
    LOrderItem,
    LLoadmore
  },
  mixins: [listMixin],
  data () {
    return {
    }
  },
  async mounted () {
    this.init(getUserOrderList, 'order_id')
    this.initData()
  },
  created () {
    // this.getOrderList()
  },
  methods: {
    initData () {
      this.maxId = 0
      this.getOrderList()
    },
    async getOrderList () {
      try {
        let addList = await this.loadData()
        this.$refs['loadmore'].onTopLoaded()
        await this.getThumbs(addList)
      } catch (err) {
        throw err
      }
    },
    async getThumbs (addList) {
      for (let i = addList.length; i > 0; --i) {
        let arr = addList[addList.length - i].OrderData || []
        let thumbIds = this.getThumbIds(arr)
        try {
          let thumbs = await getCommonThumb({id: thumbIds})
          this.list[this.list.length - i].thumbs = thumbs.data
        } catch (err) {
          throw err
        }
      }
      this.list = Object.assign({}, this.list)
    },
    getThumbIds (arr) {
      let thumbStr = ''
      for (let i = 0; i < arr.length; ++i) {
        let thumbId = arr[i].data_thumb
        thumbStr = thumbStr + thumbId + ','
      }
      if (thumbStr !== '') {
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
