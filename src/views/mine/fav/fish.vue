<template>
  <l-pulldown-refresh class="mine-fav-layout-container"
    :top-load-method="initData"
    ref="topLoad">
    <div class="fav-list"
      v-infinite-scroll="_loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="100">
      <l-fish-item :title="item.title"
                   :price="item.extend"
                   :thumb="item.thumb"
                   @click.native="toDetail(item.contentid)"
                   v-for="(item, index) in list"
                   :key="index"
                   class="item">
      </l-fish-item>
    </div>
    <l-part-line v-if="loading && list.length !== 0 " text="没有更多"></l-part-line>
    <l-part-line text="暂无收藏" v-else></l-part-line>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LPartLine from 'components/common/part-line'
import LFishItem from 'components/items/shop-fish-item'
import listMixin from '@/mixins/list'
import { getFavoriteList } from 'api'
export default {
  name: 'MineFavFish',
  components: {
    LPulldownRefresh,
    LPartLine,
    LFishItem
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
        await this.loadData({model: 'fish'})
        this.$refs.topLoad && this.$refs.topLoad.onTopLoaded()
      } catch (err) {
        throw err
      }
    },
    _loadMore () {
      this.loadMore({model: 'fish'})
    },
    toDetail (id) {
      this.$router.push({name: 'FishBuyDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">

</style>
