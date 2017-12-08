<template>
  <l-main-layout class="fish-buyer-list-container"
                 back>
    <l-pulldown-refresh :top-load-method="initData"
                        ref="topLoad"
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
      <div class="list">
        <div class="item-wrapper"
             v-for="(item, index) in list"
             :key="index">
          <l-fish-item :item="item"></l-fish-item>
        </div>
      </div>
    </l-pulldown-refresh>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPulldownRefresh from 'components/pulldown-refresh'
import LFishItem from 'components/items/shop-fish-item'
import listMixin from '@/mixins/list'
import { getFishList } from 'api'
export default {
  name: 'FishBuyList',
  components: {
    LMainLayout,
    LPulldownRefresh,
    LFishItem
  },
  mixins: [listMixin],
  mounted () {
    this.init(getFishList)
    this.initData()
  },
  methods: {
    initData () {
      this.maxId = 0
      this.getList()
    },
    async getList () {
      try {
        await this.loadData()
        console.log(this.list)
        this.$refs['topLoad'].onTopLoaded()
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
.fish-buyer-list-container {
  .list {
    display: flex;
    max-width: 375px;
    flex-wrap: wrap;
    padding: 0 5px;
    margin: 0 auto;
    justify-content: flex-start;
    .item-wrapper {
      margin: 10px auto;
      width: 165px;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      .image {
        width: 100%;
        height: 100px;
      }
      .content {
        margin: 5px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}
</style>
