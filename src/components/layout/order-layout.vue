<template>
  <l-pulldown-refresh class="order-layout-container order-list-container"
              :top-load-method="initData"
              ref="topLoad">
    <div class="order-list">
      <l-order-item v-for="(item, index) in list"
                    :key="index"
                    class="order-item"
                    :item="item"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
      </l-order-item>
    </div>
    <div v-if="list.length <= 0">
      <l-part-line text="暂无订单"></l-part-line>
    </div>
  </l-pulldown-refresh>
</template>

<script>
import { getUserOrderList } from 'api'
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
  mixins: [listMixin],
  async mounted () {
    this.init(getUserOrderList, { idType: 'order_id' })
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
        await this.loadData()
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
