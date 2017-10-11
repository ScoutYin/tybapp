<template>
  <div class="index-container">
    <router-view class="tab-views"></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item v-for="item in tabs" :id="item.id" @click.native="toPath(item.path)">
        <img slot="icon" :src="item.src" v-if="item.src">
        {{ item.title }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      tabs: [
        { id: 0, title: '首页', src: '/', path: '/home' },
        { id: 1, title: '商城', path: '/store' },
        { id: 2, title: '+' },
        { id: 3, title: '消息', path: '/message' },
        { id: 4, title: '我', path: '/mine' }
      ],
      selected: 0
    }
  },
  methods: {
    toPath (path) {
      console.log('changed: ', path)
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="scss">
.index-container {
  .tab-views {
    height: calc(100vh - 55px);
  }
}
</style>
