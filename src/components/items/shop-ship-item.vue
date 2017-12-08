<template>
  <div class="l-shop-ship-item-wrapper" @click="toShipDetail(item.id)">
    <div class="image">
      <img :src="item.thumb">
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
  },
  methods: {
    toShipDetail (id) {
      this.$router.push({name: 'ShipBuyDetail', query: { id: id }})
    }
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
