<template>
  <div class="goods-top-item-wrapper" @click="toDetail">
    <div class="image">
      <img :src="item.thumb">
      <div class="flag">0{{num}}</div>
    </div>
    <div class="title">{{ item.title }}</div>
    <div class="price">{{ item.price | lPrice }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    num: Number
  },
  methods: {
    toDetail () {
      this.$router.push({name: 'FishBuyDetail', query: { id: this.item.id, type: 'product' }})
    }
  }
}
</script>

<style lang="scss">
.goods-top-item-wrapper {
  position: relative;
  .title {
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .price {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .flag {
    position: absolute;
    right: -1px;
    top: -1px;
    height: 24px;
    width: 36px;
    background: #fdb933;
    font-size: 14px;
    text-align: center;
    padding-top: 6px;
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      right: 0;
      top: 23px;
      border-top: 5px solid #fdb933;
      border-right: 18px solid #fdb933;
      border-left: 18px solid #fdb933;
      border-bottom: 5px solid transparent;
    }
  }
}
</style>
