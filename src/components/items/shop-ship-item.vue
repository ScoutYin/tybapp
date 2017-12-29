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
@import '../../common/style/mixins';

.l-shop-ship-item-wrapper {
  .content {
    border: 1px solid #eee;
    border-top: none;
    @include text-overflow(1);
    .title {
      margin: 5px;
    }
  }
}
</style>
