<template>
  <l-main-layout class="ship-buy-list-container" back>
    <l-pulldown-refresh :top-load-method="initData"
                        ref="topLoad">
      <div class="list" v-infinite-scroll="loadMore"
                      infinite-scroll-disabled="loading"
                      infinite-scroll-distance="100">
        <div class="item-wrapper"
           v-for="(item, index) in list"
           :key="index"
           @click="toDetail(item.id)">
          <div class="item">
            <div class="image">
              <img :src="item.thumb">
            </div>
            <div class="content">
              <div class="name">
                编号：{{item.name}}
              </div>
              <div class="material">
                船质：{{item.material}}
              </div>
              <div class="status">
                状态：<span style="color: red;">{{item.buytype | buytype}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <l-part-line v-if="loading && list.length !== 0 " text="没有更多"></l-part-line>
    </l-pulldown-refresh>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPulldownRefresh from 'components/pulldown-refresh'
import listMixin from '@/mixins/list'
import LPartLine from 'components/common/part-line'
import { getShipList } from 'api'
export default {
  name: 'ShipBuyList',
  components: {
    LMainLayout,
    LPulldownRefresh,
    LPartLine
  },
  mixins: [listMixin],
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.init(getShipList)
      this.getList()
    },
    async getList () {
      try {
        await this.loadData()
        console.log(this.list)
        this.$refs.topLoad && this.$refs.topLoad.onTopLoaded()
      } catch (err) {
        throw err
      }
    },
    toDetail (id) {
      this.$router.push({name: 'ShipBuyDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixins.scss';
.ship-buy-list-container {
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
        .name {
          @include text-overflow(1);
        }
      }
    }
  }
}
</style>
