<template>
  <l-detail-layout class="ship-buy-detail"
                   :thumbs="thumbs">
    <section class="section">
      <div class="ship-title">{{ detailData.title }}</div>
      <div class="price">{{ detailData.price | lPrice }}</div>
    </section>
    <section class="section">
      <div class="title">详细参数</div>
      <div class="arguments-content">
        <div class="item">编号：{{detailData.name}}</div>
        <div class="item">状态：{{detailData.status | buytype}}</div>
        <div class="item">船质：{{detailData.material_name}}</div>
        <div class="item">船长：{{detailData.long}}米</div>
        <div class="item">船宽：{{detailData.width}}米</div>
        <div class="item">船深：{{detailData.deep}}米</div>
        <div class="item">功率：{{detailData.power}}kW</div>
        <div class="item">双控功率：{{detailData.doublepower}}kW</div>
        <div class="item">总吨位：{{detailData.gtonnage}}</div>
        <div class="item">净吨位：{{detailData.nettonnage}}</div>
        <div class="item line">船籍码头：{{detailData.address}}</div>
        <div class="item line">完工日期：{{detailData.buildtime | time2Date}}</div>
      </div>
    </section>
    <section class="section">
      <div class="title">船况描述</div>
      <article class="content" v-html="parseHTML(content)">
      </article>
    </section>
    <div class="detail-bottom" slot="bottom">
      <l-unit-button-fav class="left" modelId="7" :id="detailData.id"></l-unit-button-fav>
      <div class="right" @click="callTel(detailData.tel)">
        <l-icon icon="icon-dianhua"></l-icon>
        <span class="text">
          <a>联系卖家</a></span>
      </div>
    </div>
  </l-detail-layout>
</template>

<script>
import LDetailLayout from 'components/layout/detail-layout'
import { getShipDetail } from 'api'
import LUnitButtonFav from 'components/unit/button-fav'
export default {
  components: {
    LDetailLayout,
    LUnitButtonFav
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
        let res = await getShipDetail({id: this.$route.query.id})
        if (res.data) {
          this.detailData = res.data
          this.thumbs = this.detailData.thumb
          this.content = this.detailData.ShipData.content
        }
        console.log('detailData: ', this.detailData)
      } catch (err) {
        throw err
      }
    },
    callTel (tel) {
      window.location.href = `tel:${tel}`
    }
  }
}
</script>

<style lang="scss">
.ship-buy-detail {
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
    }
    &>.comment {
      padding-top: 10px;
    }
    &>.content {
      padding-top: 10px;
    }
    .arguments-content {
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        line-height: 1.5;
        &.line {
          width: 100%;
        }
      }
    }
  }
  .detail-bottom {
    width: 100%;
    display: flex;
    .left {
      width: 80px;
      text-align: center;
      margin: auto;
    }
    .right {
      flex: 1;
      background-color: #3983D2;
      display: flex;
      color: #fff;
      font-size: 20px;
      justify-content: center;
      .text {
        margin: auto 0;
        font-size: 16px;
        padding: 0 10px;
      }
    }
  }
}
</style>
