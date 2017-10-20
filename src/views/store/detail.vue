<template>
  <div class="store-detail-container">
    <l-main-layout class="" back>
      这是商品详情页面
    </l-main-layout>

    <div class="bottom-bar">
      <div class="item-shop item-common">
        <i class="iconfont icon-dianpu"></i>
        <div class="title">店铺</div>
      </div>
      <div class="line"></div>
      <div class="item-fav item-common">
        <i class="iconfont icon-biaoxing"></i>
        <div class="title">收藏</div>
      </div>
      <div class="line"></div>
      <div class="item-cart" @click="addGoods">
        <i class="iconfont icon-gouwuche"></i>
        <span class="title">加入购物车</span>
      </div>
    </div>

    <div class="cart" @click="toCart">
      <i class="iconfont icon-gouwuche"></i>
    </div>
  </div>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import { getGoodsDetail, getStoreShop } from 'api'
export default {
  name: 'StoreDetail',
  components: {
    LMainLayout
  },
  data () {
    return {
      params: this.$route.query,
      goodsData: {},
      shopData: {}
    }
  },
  mounted () {

  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        console.log('params: ', this.params)
        await getGoodsDetail(this.params).then((res) => {
          this.goodsData = res.data
        })
        console.log('shopid: ', this.goodsData.shopid)
        await getStoreShop({ shopid: this.goodsData.shopid }).then((res) => {
          this.shopData = res.data
        })
      } catch (err) {}
    },
    addGoods () {
      let goodInfo = {
        type: this.params.type,
        goods: this.goodsData,
        shop: this.shopData
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
.store-detail-container {
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
      width: 50px;
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
    }
  }

  .cart {
    position: fixed;
    z-index: 100;
    right: 20px;
    bottom: 70px;
    background-color: rgba(240, 255, 255, .7);
    border: 1px solid $line-color;
    border-radius: 50%;
    padding: 6px 7.2px;
    .icon-gouwuche {
      font-size: 20px;
    }
  }
}
</style>
