<template>
  <l-pulldown-refresh class="seller-pre-deliver-container"
              :top-load-method="initData"
              ref="topLoad">
    <div class="order-list">
      <l-order-item v-for="(item, index) in list"
                    :key="index"
                    class="order-item"
                    :item="item"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10">
      </l-order-item>
    </div>
  </l-pulldown-refresh>
</template>

<script>
export default {
  name: 'SellerPreDeliver'
}
</script>

<style lang="scss">

</style>
