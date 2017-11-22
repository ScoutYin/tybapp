<template>
  <div class="shop-ship-item-wrapper">
    <div class="image">
      <img :src="item.src">
    </div>
    <div class="content">
      <div class="title">{{ item.title }}</div>
    </div>
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
.shop-ship-item-wrapper {
  .content {
    border: 1px solid #eee;
    border-top: none;
    .title {
      padding-left: 5px;
    }
  }
}
</style>
