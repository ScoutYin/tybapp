<template>
  <l-detail-layout class="buy-detail-container"
                   :thumbs="thumbs">
    <section class="section">
      <div class="fish-title">{{ detailData.title }}</div>
      <div class="price">{{ detailData.price | lPrice }}</div>
      <div class="bottom">
        <div class="num">起售量：{{ detailData.num }}</div>
        <div class="address">{{ detailData.address }}</div>
      </div>
    </section>
    <section class="section">
      <div class="title">产品评价</div>
      <div class="comment">暂无评价</div>
    </section>
    <section class="section">
      <div class="title">产品详情</div>
      <article class="content" v-html="content">
      </article>
    </section>
  </l-detail-layout>
</template>

<script>
import LDetailLayout from 'components/layout/detail-layout'
import { getShopFishDetail } from 'api'
export default {
  components: {
    LDetailLayout
  },
  data () {
    return {
      detailData: {},
      thumbs: [],
      content: ''
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        let res = await getShopFishDetail({id: this.$route.params.id})
        if (res.data) {
          this.detailData = res.data
          this.thumbs = this.detailData.thumb
          this.content = this.detailData.FishData.content
        }
        console.log('detailData: ', this.detailData)
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
.buy-detail-container {
  .section {
    margin-bottom: 10px;
    background: #fff;
    padding: 10px;
    &>.title {
      font-size: 16px;
    }
    &>.price {
      font-size: 16px;
      padding: 10px 0;
      &+.bottom {
        display: flex;
        justify-content: space-between;
      }
    }
    &>.comment {
      padding-top: 10px;
    }
    &>.content {
      padding-top: 10px;
    }
  }
}
</style>
