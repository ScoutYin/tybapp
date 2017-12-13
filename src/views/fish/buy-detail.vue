<template>
  <l-detail-layout class="buy-detail-container"
                   :thumbs="thumbs">
    <section class="section">
      <div class="fish-title">{{ detailData.title }}</div>
      <div class="price">{{ detailData.price | lPrice }}</div>
      <div class="bottom">
        <div class="num" v-if="detailData.num">起售量：{{ detailData.num }}</div>
        <div class="address">{{ detailData.address }}</div>
      </div>
    </section>
    <section class="section">
      <div class="title">产品评价</div>
      <div class="comment">暂无评价</div>
    </section>
    <section class="section">
      <div class="title">产品详情</div>
      <article class="content" v-html="parseHTML(content)">
      </article>
    </section>
    <div class="bottom-bar" slot="bottom">
      <div class="item-shop item-common">
        <l-icon icon="icon-dianpu"></l-icon>
        <div class="title">店铺</div>
      </div>
      <div class="line"></div>
      <l-unit-button-fav :modelId="fetchObj[this.type].modelId" :id="detailData.id"></l-unit-button-fav>
      <div class="line"></div>
      <div class="item-cart" v-permission-click="addGoods">
        <l-icon icon="icon-gouwuche"></l-icon>
        <span class="title">加入购物车</span>
      </div>
    </div>

    <div class="cart" v-permission-click="toCart">
      <l-icon icon="icon-gouwuche"></l-icon>
    </div>
  </l-detail-layout>
</template>

<script>
import LDetailLayout from 'components/layout/detail-layout'
import { getShopFishDetail, getShopProductDetail } from 'api'
import LUnitButtonFav from 'components/unit/button-fav'
export default {
  components: {
    LDetailLayout,
    LUnitButtonFav
  },
  data () {
    return {
      detailData: {},
      isFav: 0,
      thumbs: [],
      content: '',
      type: this.$route.query.type || 'fish',
      fetchObj: {
        'fish': {
          modelId: 9,
          fetch: getShopFishDetail,
          moreData: 'FishData'
        },
        'product': {
          modelId: 5,
          fetch: getShopProductDetail,
          moreData: 'ProductData'
        }
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        let res = await this.fetchObj[this.type].fetch({id: this.$route.query.id})
        if (res.data) {
          let moreData = this.fetchObj[this.type].moreData
          this.detailData = res.data
          this.thumbs = this.detailData.thumb
          this.content = this.detailData[moreData].content
        }
        console.log('detailData: ', this.detailData)
      } catch (err) {
        throw err
      }
    },
    addGoods () {
      let goodInfo = {
        // type: this.query.type,
        // goods: this.goodsData,
        // shop: this.shopData
      }
      this.$store.dispatch('addGoods', goodInfo)
    },
    toCart () {
      this.$router.push({ path: '/store/cart' })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

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
  .bottom-bar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    width: 100%;
    height: 50px;
    background: white;
    border-top: 1px solid #ddd;
    display: flex;
    .item-common {
      padding: 0 10px;
      margin: auto;
      width: 60px;
      text-align: center;
      vertical-align: middle;
      .title {
        font-size: 12px;
      }
    }
    .line {
      height: 100%;
      border-right: 1px solid #ccc;
    }
    .item-shop {
    }
    .item-fav {
    }
    .item-cart {
      line-height: 50px;
      flex: 2;
      text-align: center;
      background-color: #f74f0f;
      color: white;
      font-weight: 500;
      .title {
        vertical-align: super;
      }
    }
  }

  .cart {
    position: fixed;
    z-index: 100;
    right: 20px;
    bottom: 30px;
    background-color: rgba(240, 255, 255, .7);
    border: 1px solid $line-color;
    border-radius: 50%;
    padding: 7px 7.6px 5px;
    font-size: 18px;
  }
}
</style>
