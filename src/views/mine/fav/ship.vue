<template>
  <l-pulldown-refresh class="mine-fav-layout-container"
    :top-load-method="initData"
    ref="topLoad">
    <div class="fav-list">
      <l-shop-ship-item
        v-for="(item, index) in list"
        :key="index"
        class="list-item"
        :title="item.title"
        :thumb="item.thumb"
        @click.native="toShipDetail(item.id)">
      </l-shop-ship-item>
    </div>
    <div v-if="list && list.length <= 0">
      <l-part-line text="暂无收藏"></l-part-line>
    </div>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LPartLine from 'components/common/part-line'
import LShopShipItem from 'components/items/shop-ship-item'
import listMixin from '@/mixins/list'
import { getFavoriteList } from 'api'
export default {
  components: {
    LPulldownRefresh,
    LPartLine,
    LShopShipItem
  },
  mixins: [listMixin],
  mounted () {
    this.init(getFavoriteList)
    this.initData()
  },
  methods: {
    initData () {
      this.maxId = 0
      this.getFavList()
    },
    async getFavList () {
      try {
        await this.loadData({model: 'ship'})
        this.$refs['topLoad'].onTopLoaded()
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">

</style>
