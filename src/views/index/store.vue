<template>
  <main-layout class="store-container" search>
    <div slot="title">123</div>
    <mt-swipe :auto="0" :show-indicators="true">
      <mt-swipe-item v-for="item in items">
        <img :src="item.imgSrc" alt="" style="width: 100%;">
      </mt-swipe-item>
    </mt-swipe>

    商城
  </main-layout>
</template>

<script>
import MainLayout from 'components/layout/mainLayout'
export default {
  name: '',
  components: {
    MainLayout
  },
  data () {
    return {
      items: [
        {
          id: 1,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237dd62df0.jpg'
        }, {
          id: 2,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237e98a3d7.jpg'
        }, {
          id: 3,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237f4a1620.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.store-container {
  .mint-swipe {
    height: 17.5vh;
    .mint-swipe-item {
    }
  }
}
</style>
