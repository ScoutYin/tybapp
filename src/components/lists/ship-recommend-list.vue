<template>
  <div class="l-ship-recommend-wrapper">
    <div v-for="(item, index) in list"
         :key="index"
         class="item">
      <ship-item :item="item"></ship-item>
    </div>
  </div>
</template>

<script>
import ShipItem from 'components/items/shop-ship-item'
export default {
  name: 'LShipRecommend',
  components: {
    ShipItem
  },
  props: {
    list: Array
  }
}
</script>

<style lang="scss">
.l-ship-recommend-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  .item {
    width: 165px;
    margin: 10px auto;
    .image {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
