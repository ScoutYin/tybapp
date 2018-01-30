<template>
  <l-pulldown-refresh class="mine-fav-layout-container"
    :top-load-method="initData"
    ref="topLoad">
    <div class="fav-list"
      v-infinite-scroll="_loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100">
      <l-shop-ship-item
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :title="item.title"
        :thumb="item.thumb"
        @click.native="toShipDetail(item.contentid)">
      </l-shop-ship-item>
    </div>
    <l-part-line v-if="loading && list.length !== 0 " text="没有更多"></l-part-line>
    <l-part-line text="暂无收藏" v-else></l-part-line>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LPartLine from 'components/common/part-line'
import LShopShipItem from 'components/items/shop-ship-item'
import listMixin from '@/mixins/list'
import { getFavoriteList } from 'api'
export default {
  name: 'MineFavShip',
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
        this.$refs.topLoad && this.$refs.topLoad.onTopLoaded()
      } catch (err) {
        throw err
      }
    },
    _loadMore () {
      this.loadMore({model: 'ship'})
    },
    toShipDetail (id) {
      this.$router.push({name: 'ShipBuyDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">

</style>
