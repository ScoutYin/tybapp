<template>
  <div class="shop-goods-item-wrapper">
    <div class="image">
      <img :src="item.src">
    </div>
    <div class="progress-wrapper">
      <div class="progress-inner" :style="`width: ${width}%;`"></div>
      <div class="progress-text">已售 {{sales}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    sales () {
      return this.item.sales || 0
    },
    width () {
      return parseInt(this.sales)
    }
  }
}
</script>

<style lang="scss">
.shop-goods-item-wrapper {
  .progress-wrapper {
    position: relative;
    margin-top: 8px;
    background: rgba(241, 90, 34, 0.4);
    width: 100%;
    height: 12px;
    border-radius: 6px;
    .progress-inner {
      height: 100%;
      background: #f15a22;
      border-radius: inherit;
    }
    .progress-text {
      position: absolute;
      top: 0;
      left: 50%;
      font-size: 10px;
      color: white;
      transform: translateX(-50%);
    }
  }
}
</style>
