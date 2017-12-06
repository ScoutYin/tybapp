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
    width: 100%;
    flex-wrap: wrap;
    padding: 0 18px;
    justify-content: space-between;
    .item-wrapper {
      // width: 50%;
      .item {
        margin: 10px auto;
        width: 160px;
        background: #fff;
        .image {
          width: 160px;
          height: 100px;
        }
        .content {
          margin: 5px;
          font-size: 14px;
          line-height: 1.5;
          .price {
            color: red;
          }
        }
      }
    }
  }
}
</style>
