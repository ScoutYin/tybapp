<template lang="html">
  <div class="l-goods-item">
    <div class="thumb">
      <img :src="data.picture" alt="">
    </div>
    <div class="center">
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="bottom">
      <div class="price">
        <!-- span换行的话则会有一个标签之间的空隙存在 -->
        <span v-if="dPrice != 0" style="color: red; font-size: 12px;">￥</span><span style="color: red;">{{ dPrice }}</span>
      </div>
      <div class="sales-volume">销量：{{ data.sales }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LGoodsItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dPrice: this.data.price
    }
  },
  created () {
    if (parseInt(this.dPrice) === 0) {
      this.dPrice = '面议'
    }
  }
}
</script>

<style lang="scss">
.l-goods-item {
  border: 1px solid #eee;
  .thumb {
    img {
      width: 100%;
    }
  }
  .center {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .bottom {
    display: flex;
    line-height: 20px;
    .price {
      text-align: left;
      flex: 1;
      vertical-align: middle;
    }
    .sales-volume {
      text-align: right;
      flex: 1;
      font-size: 12px;
      vertical-align: middle;
    }
  }
}
</style>
