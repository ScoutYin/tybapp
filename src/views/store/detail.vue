<template>
  <l-main-layout class="store-detail-container" back>
    这是商品详情页面
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import { getGoodsDetail } from 'api'
export default {
  name: 'StoreDetail',
  components: {
    LMainLayout
  },
  data () {
    return {
      params: this.$route.query,
      goodsData: {}
    }
  },
  mounted () {
    console.log(this.params)
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        await getGoodsDetail(this.params).then((res) => {
          this.goodsData = res.data
        })
      } catch (err) {}
    }
  }
}
</script>

<style lang="scss">
.store-detail-container {

}
</style>
