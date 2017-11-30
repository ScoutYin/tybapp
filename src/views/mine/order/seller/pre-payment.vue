<template>
  <div>
    待付款
  </div>
</template>

<script>
import { getUserOrderList } from 'api'
export default {
  name: 'SellerPrePayment',
  created () {
    getUserOrderList()
  },
  methods: {
    async getOrderList () {
      try {
        let res = await getUserOrderList()
        console.log('getOrderList: ', res)
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">

</style>
