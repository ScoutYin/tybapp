<template>
  <div class="l-goods-list">
    <div class="l-goods-top-list list">
      <div class="list-title">鱼获专区</div>
      <l-shop-goods-top-item
        v-for="(item, index) in hotItems"
        :key="index"
        class="list-item"
        :item="item"
        :num="index + 1"
        @click.native="toDetail(item.id)">
        {{ item }}
      </l-shop-goods-top-item>
    </div>

    <div class="list">
      <div class="list-title">鱼获专区</div>
      <l-shop-goods-item
        v-for="(item, index) in goodsItems"
        :key="index"
        class="list-item"
        :item="item">
        {{ item }}
      </l-shop-goods-item>
    </div>

    <div class="list">
      <div class="list-title">渔船专区</div>
      <l-shop-ship-item
        v-for="(item, index) in shipItems"
        :key="index"
        class="list-item"
        :item="item">
        {{ item }}
      </l-shop-ship-item>
    </div>
  </div>
</template>

<script>
import LShopGoodsTopItem from '../items/shop-goods-top-item'
import LShopGoodsItem from '../items/shop-goods-item'
import LShopShipItem from '../items/shop-ship-item'
export default {
  components: {
    LShopGoodsTopItem,
    LShopGoodsItem,
    LShopShipItem
  },
  data () {
    return {
      hotItems: [
        { id: 0, src: '', title: '标准型焊接小车/HK-5SN', price: '2800.00' },
        { id: 1, src: '', title: '野生新鲜 鲜活豆腐鱼 龙头鱼', price: '20.00' },
        { id: 2, src: '', title: '东海野生银鲳鱼 新鲜平鱼', price: '120.00' }
      ],
      goodsItems: [
        { id: 0, src: '', sales: 30 },
        { id: 1, src: '', sales: 40 },
        { id: 2, src: '', sales: 12 }
      ],
      shipItems: [
        { id: 0, src: '', title: '编号：TRA273' },
        { id: 0, src: '', title: '编号：TRA273' },
        { id: 0, src: '', title: '编号：TRA273' },
        { id: 0, src: '', title: '编号：TRA273' },
        { id: 0, src: '', title: '编号：TRA273' },
        { id: 0, src: '', title: '编号：TRA273' }
      ]
    }
  },
  methods: {
    toDetail (id) {
      console.log('id: ', id)
      this.$router.push({ path: `/store/detail?id=${id}` })
    }
  }
}
</script>

<style lang="scss">
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
        margin: 6px 0;
        text-align: left;
      }
      .price {
        color: red;
      }
    }
  }
}

</style>
