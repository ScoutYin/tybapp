<template>
  <l-main-layout class="mine-container">
    <div class="head-wrapper">
      <div class="back"></div>
      <div class="mask">

      </div>
    </div>
    <div class="list">
      <mt-cell :title="item.title"
        :icon="item.icon"
        :value="item.value"
        v-for="(item, index) in list"
        :key="index"
        @click.native="toPath(item.path)">
      </mt-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
export default {
  name: 'Mine',
  components: {
    LMainLayout
  },
  data () {
    return {
      list: [
        { title: '我的收藏', icon: '', path: '' },
        { title: '设置', icon: '', path: '/mine/settings' }
      ]
    }
  },
  methods: {
    toPath (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="scss">
.mine-container {
  .head-wrapper {
    position: relative;
    height: 25vh;
    width: 100%;
    overflow: hidden;
    .back {
      &::before {
        content: '';
        position: absolute;
        top: 0; right: 0; left: 0; bottom: 0;
        background: url('/static/timg.jpg') 0 / cover;
        filter: blur(10px);
      }
    }
    .mask {
      &::before {
        content: '';
        position: absolute;
        top: 0; right: 0; left: 0; bottom: 0;
        background: rgba(119,103,137,.43);
        z-index: 10;
      }
    }
  }

}
</style>
