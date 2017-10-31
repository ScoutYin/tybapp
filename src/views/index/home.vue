<template>
  <l-main-layout class="home-container" title="淘鱼宝">
    <div class="grid-layout">
      <div class="grid-item" v-for="(item, index) in gridDatas" :key="index" @click="toPath(item.path)">
        <img slot="icon" :src="item.src" v-if="item.src">
        {{ item.title }}
      </div>
    </div>
    <l-loadmore :top-load-method="loadmore" ref="loadmore">
      <div v-for="(item, index) in gridDatas"  :key="index">123</div>
    </l-loadmore>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LLoadmore from 'components/loadmore'
export default {
  name: '',
  components: {
    LMainLayout,
    LLoadmore
  },
  data () {
    return {
      gridDatas: [
        { title: '我要买船', src: '/', path: '' },
        { title: '我要卖船', src: '/', path: '' },
        { title: '我要招人', src: '/', path: '/recruitment/recruiting' },
        { title: '我要求职', src: '/', path: '/recruitment/jobHunting' },
        { title: '我要买货', src: '/', path: '' },
        { title: '我要卖货', src: '/', path: '' }
      ]
    }
  },
  methods: {
    toPath (path) {
      if (path) {
        this.$router.push({ path: path })
      }
    },
    loadmore () {
      console.log('loadmore.')
      this.flag = false
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.home-container {
  .grid-layout {
    display: flex;
    flex-wrap: wrap;
    .grid-item {
      min-width: 30%;
      margin: 1%;
    }
  }
}
</style>
