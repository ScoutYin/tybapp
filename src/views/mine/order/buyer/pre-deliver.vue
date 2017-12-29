<template>
  <l-order-layout :method="method" type="2"></l-order-layout>
</template>

<script>
import LOrderLayout from 'components/layout/order-layout'
import { getUserOrderList } from 'api'
export default {
  components: {
    LOrderLayout
  },
  data () {
    return {
      method: getUserOrderList
    }
  }
}
</script>

<style lang="scss">

</style>
