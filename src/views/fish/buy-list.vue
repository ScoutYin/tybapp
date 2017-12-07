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
             :key="index"
             @click="toDetail(item.id)">
          <div class="item">
            <div class="image">
              <img :src="item.thumb">
            </div>
            <div class="content">
              <div class="title">
                {{item.title}}
              </div>
              <div class="price">
                {{item.price | lPrice}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </l-pulldown-refresh>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPulldownRefresh from 'components/pulldown-refresh'
import listMixin from '@/mixins/list'
import { getFishList } from 'api'
export default {
  name: 'FishBuyList',
  components: {
    LMainLayout,
    LPulldownRefresh
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
    },
    toDetail (id) {
      this.$router.push({name: 'FishBuyDetail', params: { id: id }})
    }
  }
}
</script>

<style lang="scss">
.fish-buyer-list-container {
  .list {
    display: flex;
    width: 375px;
    flex-wrap: wrap;
    padding: 0 5px;
    margin: 0 auto;
    justify-content: flex-start;
    .item-wrapper {
      width: 182.5px;
      .item {
        margin: 10px auto;
        width: 167.5px;
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
}
</style>
