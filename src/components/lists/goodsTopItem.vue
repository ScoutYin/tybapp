<template>
  <div class="goods-top-item-wrapper">
    <div class="image">
      <img :src="item.src">
    </div>
    <div class="title">{{ item.title }}</div>
    <div class="price">{{ item.price | lPrice }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
.goods-top-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .image {
    width: 2.8rem;
    height: 2.8rem;
    border: 1px solid #eee;
  }
  .title {
    margin: 10px 0;
  }
  .price {
    color: red;
  }
}
</style>
