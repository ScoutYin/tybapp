<template>
  <l-main-layout class="cart-container" back loadmore>
    <div v-if="cartList.length === 0" class="cart-empty-tip">
      <l-part-line text="购物车为空"></l-part-line>
    </div>
    <mt-cell v-for="(item, index) in cartList" :key="index">{{ item }}</mt-cell>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LPartLine from 'components/common/partLine'
import { mapGetters } from 'vuex'
export default {
  name: 'StoreCart',
  components: {
    LMainLayout,
    LPartLine
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  }
}
</script>

<style lang="scss">
.cart-container {
  .cart-empty-tip {
    margin: 20px 10px;
  }
}
</style>
