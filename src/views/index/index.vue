<template>
  <div class="index-container">
    <keep-alive>
      <router-view class="tab-views"></router-view>
    </keep-alive>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item v-for="(item, index) in tabs" :key="index" :id="item.id" @click.native="toPath(item.path)">
        <!-- <img slot="icon" :src="item.src" v-if="item.src" :class="item.id === 2 ? 'big-img' : ''"> -->
        <i slot="icon" :class="['iconfont', item.icon, item.id === 2 ? 'icon-fabu big-font' : 'common-font']"></i>
        {{ item.title }}
      </mt-tab-item>
    </mt-tabbar>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      class="popup-wrapper">
      <!-- 暂时套用tabbar的样式 -->
      <mt-tabbar>
        <mt-tab-item v-for="(item, index) in popupItems" :key="index" :id="item.id" @click.native="toPath(item.path)">
          <i slot="icon" :class="['iconfont', item.icon, 'common-font']"></i>
          {{ item.title }}
        </mt-tab-item>
      </mt-tabbar>
    </mt-popup>
  </div>
</template>

<script>
// let imgSrc = '/static/timg.jpg'

export default {
  name: 'Index',
  computed: {
  },
  data () {
    return {
      tabs: [
        { id: 0, title: '首页', icon: 'icon-shouye', path: '/home' },
        { id: 1, title: '商城', icon: 'icon-dianpu', path: '/store' },
        { id: 2, title: '发布' },
        { id: 3, title: '消息', icon: 'icon-xinxi', path: '/message' },
        { id: 4, title: '我', icon: 'icon-wode', path: '/mine' }
      ],
      popupItems: [
        { id: 0, title: '发鱼货', icon: 'icon-yu', path: '' },
        { id: 1, title: '发渔船', icon: 'icon-chuan', path: '' },
        { id: 2, title: '发招聘', icon: 'icon-zhaopin', path: '' },
        { id: 3, title: '发求职', icon: 'icon-qiuzhi', path: '' }
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
        if (this.$route.path === this.tabs[i].path) {
          this.selected = i
        }
      }
    },
    toPath (path) {
      if (path) {
        this.$router.push({ path: path })
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
    'selected' (newValue, oldValue) {
      // 如果选中中间的，则修改成之前的
      if (newValue === 2) {
        this.selected = oldValue
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
.index-container {
  .tab-views {
    position: absolute;
    width: 100%;
    height: calc(100vh - 55px);
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }

  .mint-tab-item-label {
    font-size: 12px;
  }

  .popup-wrapper {
    width: 100%;
    height: 100px;
    background-color: $backgroud-color;
    .mint-tabbar {
      padding-top: 15px;
      background-image: none;
      height: 100%;
      .common-font {
        font-size: 28px;
        color: $default-color;
      }
      .mint-tab-item-label {
        font-size: 16px;
        line-height: 2em;
        color: $default-color;
      }
    }
  }

  .mint-tab-item.is-selected {
    background-color: inherit;
  }

  .big-font {
    position: absolute;
    height: 48px;
    width: 48px;
    left: calc(50% - 24px);
    bottom: 24px;
    border-radius: 50%;
    background: $default-color;
    font-size: 43px;
    color: white;
  }
  .common-font {
    font-size: 22px;
  }
}
</style>
