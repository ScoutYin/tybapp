<template>
  <div class="l-shop-ship-item-wrapper">
    <div class="image">
      <img :src="thumb">
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    title: String,
    thumb: String
  }
}
</script>

<style lang="scss">
.l-shop-ship-item-wrapper {
  .content {
    border: 1px solid #eee;
    border-top: none;
    .title {
      padding: 5px;
    }
  }
}
</style>
