<template>
  <l-pulldown-refresh class="mine-fav-layout-container"
    :top-load-method="initData"
    ref="topLoad">
    <div class="fav-list">
    </div>
    <div v-if="list && list.length <= 0">
      <l-part-line text="暂无收藏"></l-part-line>
    </div>
  </l-pulldown-refresh>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import LPartLine from 'components/common/part-line'
import listMixin from '@/mixins/list'
import { getFavoriteList } from 'api'
export default {
  components: {
    LPulldownRefresh,
    LPartLine
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
        await this.loadData({model: 'shop'})
        this.$refs.topLoad && this.$refs.topLoad.onTopLoaded()
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">

</style>
