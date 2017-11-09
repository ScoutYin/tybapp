<template>
  <l-main-layout class="mine-container">
    <div class="head-wrapper">
      <div class="back"></div>
      <div class="mask">

      </div>
    </div>
    <div class="list">
      <l-cell :title="item.title"
        :value="item.value"
        v-for="(item, index) in list"
        :key="index"
        :is-link="item.isLink"
        @click.native="toPath(item.path)">
        <l-icon slot="icon" :icon="item.icon"></l-icon>
      </l-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LCell from 'components/common/cell'

export default {
  name: 'Mine',
  components: {
    LMainLayout,
    LCell
  },
  data () {
    return {
      list: [
        { title: '我的收藏', icon: 'icon-xihuan', value: '123', path: '/mine/myfav', isLink: true },
        { title: '我的购物车', icon: 'icon-gouwuche', path: '/store/cart', isLink: true },
        { title: '我的订单', icon: 'icon-dingdan', path: '/mine/order', isLink: true },
        { title: '设置', icon: 'icon-shezhi', path: '/mine/settings', isLink: true }
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
