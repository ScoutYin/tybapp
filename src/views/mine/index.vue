<template>
  <l-main-layout class="mine-container">
    <div class="head-wrapper" v-permission-click="toUserInfo">
      <div class="thumb">
        <img :src="userinfo.avatar_thumb || ''" alt="">
      </div>
      <div class="right">
        <div class="name">
          {{userinfo.company || userinfo.nickname || userinfo.mobile || '立即登录'}}
        </div>
        <div class="desc" v-if="!userinfo.avatar_thumb">登录可享受更多功能</div>
      </div>
    </div>
    <div class="section" v-permission-click="toOrderBuyer">
      <l-cell title="我是买家" v-is-link></l-cell>
      <div class="list-wrapper">
        <div class="list-item"
             v-for="(item, index) in buyerList"
             :key="index">
          <l-icon :icon="item.icon" class="icon"></l-icon>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="section" v-permission-click="toOrderSeller">
      <l-cell title="我是卖家" v-is-link></l-cell>
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
        v-is-link="item.isLink"
        @click.native="toPath(item.path)">
        <l-icon slot="icon" :icon="item.icon"></l-icon>
      </l-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LCell from 'components/common/cell'
import { mapGetters } from 'vuex'

export default {
  name: 'Mine',
  components: {
    LMainLayout,
    LCell
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  data () {
    return {
      list: [
        { title: '我的收藏', icon: 'icon-shoucang', path: '/mine/fav', isLink: true },
        { title: '设置', icon: 'icon-shezhi', path: '/mine/settings', isLink: true }
      ],
      buyerList: [
        { title: '待付款', icon: 'icon-dingdan' },
        { title: '待发货', icon: 'icon-dingdan' },
        { title: '待收货', icon: 'icon-dingdan' },
        { title: '评价', icon: 'icon-dingdan' }
      ],
      sellerList: [
        { title: '待付款', num: 12 },
        { title: '待发货', num: 23 },
        { title: '待收货', num: 34 },
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
    },
    toOrderBuyer () {
      this.$router.push({ path: '/mine/order/buyer' })
    },
    toOrderSeller () {
      this.$router.push({ path: '/mine/order/seller' })
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
    display: flex;
    padding: 0 50px;
    .thumb {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, .5);
      // border: 1px solid #eee;
    }
    .right {
      padding-left: 20px;
      padding-top: 20px;
      color: #fff;
      .name {
        font-size: 18px;
      }
      .desc {
        font-size: 12px;
        line-height: 2;
      }
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
