<template>
  <l-pulldown-refresh class="mine-fav-layout-container"
    :top-load-method="initData"
    ref="topLoad">
    <div class="fav-list">
      <l-product-item :title="item.title"
                   :price="item.extend"
                   :thumb="item.thumb"
                   @click.native="toDetail(item.contentid)"
                   v-for="(item, index) in list"
                   :key="index"
                   class="item">
      </l-product-item>
    </div>
    <div v-if="list && list.length <= 0">
      <l-part-line text="暂无收藏"></l-part-line>
    </div>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LPartLine from 'components/common/part-line'
import LProductItem from 'components/items/shop-fish-item'
import listMixin from '@/mixins/list'
import { getFavoriteList } from 'api'
export default {
  components: {
    LPulldownRefresh,
    LPartLine,
    LProductItem
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
        await this.loadData({model: 'product'})
        this.$refs['topLoad'].onTopLoaded()
      } catch (err) {
        throw err
      }
    },
    toDetail (id) {
      this.$router.push({name: 'FishBuyDetail', query: { id: id, type: 'product' }})
    }
  }
}
</script>

<style lang="scss">

</style>
