<template>
  <div class="l-fish-recommend-list">
    <div v-for="(item, index) in list"
         :key="index"
         class="item">
      <l-fish-item :item="item"></l-fish-item>
    </div>
  </div>
</template>

<script>
import LFishItem from 'components/items/shop-fish-item'
export default {
  name: 'LFishRecommendList',
  components: {
    LFishItem
  },
  props: {
    list: Array
  }
}
</script>

<style lang="scss">
.l-fish-recommend-list {
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
