<template>
  <l-pulldown-refresh class="order-layout-container order-list-container"
              :top-load-method="initData"
              ref="topLoad">
    <div class="order-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100">
      <l-order-item v-for="(item, index) in list"
                    :key="index"
                    class="order-item"
                    :item="item">
      </l-order-item>
    </div>
    <l-part-line v-if="loading && list.length !== 0 " text="没有更多"></l-part-line>
    <l-part-line text="暂无订单" v-else></l-part-line>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LOrderItem from 'components/items/order-item'
import listMixin from '@/mixins/list'
import LPartLine from 'components/common/part-line'
export default {
  name: 'SellerAll',
  components: {
    LOrderItem,
    LPulldownRefresh,
    LPartLine
  },
  props: {
    type: [String, Number],
    method: Function
  },
  mixins: [listMixin],
  mounted () {
    this.init(this.method, { idType: 'order_id' })
    this.initData()
  },
  created () {
  },
  methods: {
    initData () {
      this.maxId = 0
      this.getOrderList()
    },
    async getOrderList () {
      try {
        await this.loadData({status: this.type})
        this.$refs['topLoad'].onTopLoaded()
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
.order-layout-container {
  .order-item {
    margin-top: 10px;
  }
}
</style>
