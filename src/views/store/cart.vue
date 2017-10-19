<template>
  <l-main-layout back>
    我是购物车页面
    <mt-cell v-for="(item, index) in cartList" :key="index">{{ item }}</mt-cell>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import { mapGetters } from 'vuex'
export default {
  name: 'StoreCart',
  components: {
    LMainLayout
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  }
}
</script>

<style lang="scss">

</style>
