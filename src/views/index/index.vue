<template>
  <div class="index-container">
    <keep-alive>
      <router-view class="tab-views"></router-view>
    </keep-alive>

    <l-tabbar v-model="selected" class="tabbar">
      <l-tabbar-item v-for="(item, index) in tabs" :key="index" @click.native="jump(item.componentName)">
        <l-icon slot="icon" :icon="item.icon" :class="['icon', item.id === 2 ? 'big-font' : 'common-font']"></l-icon>
        <span class="">{{ item.title }}</span>
      </l-tabbar-item>
    </l-tabbar>

    <popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      class="popup-wrapper">
      <l-popup-items :items="popupItems"></l-popup-items>
    </popup>
  </div>
</template>

<script>
import { Popup } from 'vux'
import LPopupItems from 'components/publish/popup-items'
import LTabbar from 'components/tabbar/tabbar'
import LTabbarItem from 'components/tabbar/tabbar-item'

export default {
  name: 'Index',
  components: {
    Popup,
    LPopupItems,
    LTabbar,
    LTabbarItem
  },
  computed: {
  },
  data () {
    return {
      tabs: [
        { id: 0, title: '首页', icon: 'icon-shouye', componentName: 'Home' },
        { id: 1, title: '商城', icon: 'icon-gouwudai', componentName: 'Store' },
        { id: 2, title: '发布', icon: 'icon-fabu' },
        { id: 3, title: '消息', icon: 'icon-xinxi', componentName: 'Message' },
        { id: 4, title: '我', icon: 'icon-wode', componentName: 'Mine' }
      ],
      popupItems: [
        { id: 0, title: '发渔获', icon: 'icon-buyfish', componentName: 'PublishFish' },
        { id: 1, title: '发渔船', icon: 'icon-chuan', componentName: 'PublishShip' },
        { id: 2, title: '发招聘', icon: 'icon-zhaoping', componentName: 'PublishRecruiting' },
        { id: 3, title: '发求职', icon: 'icon-qiuzhi', componentName: 'PublishJobHunting' }
      ],
      selected: 0,
      popupVisible: false
    }
  },
  mounted () {
    console.log(this.$route)
    // 刷新页面的情况下， 或者URL方式输入的情况下，需要重新计算table的默认selected
    this.initTabs()
  },
  methods: {
    initTabs () {
      for (let i = 0; i < this.tabs.length; ++i) {
        if (this.$route.name === this.tabs[i].componentName) {
          this.selected = i
        }
      }
    },
    jump (name) {
      if (name) {
        this.$router.push({ name: name })
      } else {
        this.publish()
      }
    },
    publish () {
      if (this.$store.getters.isLogin) {
        this.popupVisible = true
      } else {
        this.$store.dispatch('showLogin')
      }
    }
  },
  watch: {
    'selected' (newVal, oldValue) {
      // 如果选中中间的，则修改成之前的
      if (newVal === 2) {
        this.selected = oldValue
      }
    },
    '$route' (newVal) {
      this.initTabs()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
.index-container {
  overflow: hidden;
  .tab-views {
    position: absolute;
    width: 100%;
    height: calc(100vh - 55px);
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }

  .big-font {
    position: absolute;
    left: calc(50% - 27px);
    bottom: 10px;
    border-radius: 50%;
    padding: 1px;
    background: #26a2ff;
    font-size: 42px;
    color: white;
  }
  .common-font {
    font-size: 18px;
  }
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 55px;
    border-top: 1px solid #eee;
  }
  .popup-wrapper {
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>
