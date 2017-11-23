<template>
  <l-main-layout class="mine-container">
    <div class="head-wrapper" v-permission-click="toUserInfo">
      <div class="thumb"></div>
    </div>
    <div class="section">
      <l-cell title="我是买家" is-link></l-cell>
      <div class="list-wrapper">
        <div class="list-item"
             v-for="(item, index) in buyerList"
             :key="index">
          <l-icon :icon="item.icon" class="icon"></l-icon>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <l-cell title="我是卖家" is-link></l-cell>
      <div class="list-wrapper">
        <div class="list-item"
             v-for="(item, index) in sellerList"
             :key="index">
          <div class="num">{{ item.num }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="section">
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
        { title: '我的收藏', icon: 'icon-xihuan', path: '/mine/myfav', isLink: true },
        { title: '我的订单', icon: 'icon-dingdan', path: '/mine/order', isLink: true },
        { title: '设置', icon: 'icon-shezhi', path: '/mine/settings', isLink: true }
      ],
      buyerList: [
        { title: '待付款', icon: 'icon-dingdan' },
        { title: '待发货', icon: 'icon-dingdan' },
        { title: '待收获', icon: 'icon-dingdan' },
        { title: '评价', icon: 'icon-dingdan' }
      ],
      sellerList: [
        { title: '待付款', num: 12 },
        { title: '待发货', num: 23 },
        { title: '待收获', num: 34 },
        { title: '评价', num: 45 }
      ]
    }
  },
  methods: {
    toPath (path) {
      this.$router.push({ path: path })
    },
    toUserInfo () {
      this.$router.push({ path: '/mine/userinfo' })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.mine-container {
  color: #333;
  .head-wrapper {
    position: relative;
    height: 100px;
    width: 100%;
    overflow: hidden;
    background: $default-color;
    .thumb {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, .5);
      margin: auto;
      // border: 1px solid #eee;
    }
  }
  .section {
    margin-bottom: 15px;
    background: #fff;
    .list-wrapper {
      display: flex;
      justify-content: space-around;
      padding: 5px 15px 15px 15px;
      .list-item {
        text-align: center;
        .num {
          font-size: 16px;
          color: $default-color;
          margin-bottom: 10px;
        }
        .icon {
          font-size: 24px;
          color: #666;
        }
        .title {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
