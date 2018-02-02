<template>
  <l-main-layout back>
    <component :is="openShopView" @change="changeStatus" :msg="msg" :status="status"></component>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { getOpenShopStatus } from 'api'

const views = {
  0: 'OpenShopReviewFailed',
  1: 'OpenShopView',
  2: 'OpenShopUnderReview'
}

export default {
  components: {
    LMainLayout,
    OpenShopView: (resolve) => require(['./open-shop-view'], resolve),
    OpenShopUnderReview: (resolve) => require(['./open-shop-status-view'], resolve),
    OpenShopReviewFailed: (resolve) => require(['./open-shop-status-view'], resolve)
  },
  computed: {
    openShopView () {
      let view = views[this.status]
      if (view === 'undefined') {
        // 这里应该稍微做一下异常处理
        return undefined
      }
      return view
    }
  },
  data () {
    return {
      status: -1,
      msg: ''
    }
  },
  mounted () {
    this.getOpenShopStatus()
  },
  methods: {
    async getOpenShopStatus () {
      let res = await getOpenShopStatus()
      this.status = res.data.status
      this.msg = res.data.msg
      console.log('getOpenShopStatus: ', res.data)
    },
    changeStatus (status) {
      this.getOpenShopStatus()
      console.log('change')
    }
  }
}
</script>

<style lange="scss">

</style>
