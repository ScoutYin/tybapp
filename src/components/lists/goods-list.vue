<template>
  <div class="l-goods-list">
    <div class="l-goods-top-list list">
      <div class="list-title goods-top">热销排行</div>
      <l-shop-goods-top-item
        v-for="(item, index) in hotItems"
        :key="index"
        class="list-item"
        :item="item"
        :num="index + 1">
      </l-shop-goods-top-item>
    </div>

    <div class="list">
      <div class="list-title goods">鱼获专区</div>
      <l-shop-goods-item
        v-for="(item, index) in goodsItems"
        :key="index"
        class="list-item"
        :item="item">
      </l-shop-goods-item>
    </div>

    <div class="list">
      <div class="list-title ship">渔船专区</div>
      <l-shop-ship-item
        v-for="(item, index) in shipItems"
        :key="index"
        class="list-item"
        :item="item">
      </l-shop-ship-item>
    </div>
  </div>
</template>

<script>
import LShopGoodsTopItem from '../items/shop-goods-top-item'
import LShopGoodsItem from '../items/shop-goods-item'
import LShopShipItem from '../items/shop-ship-item'
import { getTaglib } from 'api'

export default {
  components: {
    LShopGoodsTopItem,
    LShopGoodsItem,
    LShopShipItem
  },
  data () {
    return {
      hotItems: [],
      goodsItems: [],
      shipItems: []
    }
  },
  mounted () {
    this.getProduct()
    this.getFish()
    this.getShip()
  },
  methods: {
    async getProduct () {
      try {
        let res = await getTaglib({modelid: 5, limit: 3})
        this.hotItems = res.data
        console.log('hotItem: ', res.data)
      } catch (err) {
        throw err
      }
    },
    async getFish () {
      try {
        let res = await getTaglib({modelid: 9, limit: 3})
        this.goodsItems = res.data
        console.log('goodsItems: ', res.data)
      } catch (err) {
        throw err
      }
    },
    async getShip () {
      try {
        let res = await getTaglib({modelid: 7, limit: 6})
        this.shipItems = res.data
        console.log('shipItems: ', res.data)
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixins.scss';
.l-goods-list {
  .list {
    position: relative;
    background: white;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    padding: 30px 10px 10px 10px;
    margin-top: 20px;
    .list-title {
      position: absolute;
      left: 0;
      top: -10px;
      padding: 8px 16px 8px 12px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: yellowgreen;
      color: #fff;
      font-size: 14px;
      &.goods-top {
        background-color: #51ABA1;
      }
      &.goods {
        background-color: #F1A239;
      }
      &.ship {
        background-color: #3880CC;
      }
    }
    .list-item {
      display: flex;
      flex-direction: column;
      // align-items: center;
      font-size: 14px;
      width: 108px;
      margin: 5px;
      .image {
        position: relative;
        width: 108px;
        height: 108px;
        border: 1px solid #eee;
        margin: 0 auto;
      }
      .title {
        text-align: left;
        line-height: 1.3;
        @include text-overflow(2);
      }
      .price {
        color: red;
      }
    }
  }
}

</style>
