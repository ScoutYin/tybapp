<template>
  <div class="main-layout-container">
    <l-header :fixed="fixed">
      <l-button slot="left" @click.native="goBack" v-if="back || handleBack">
        <l-icon slot="icon" icon="icon-left"></l-icon>
        <span>返回</span>
      </l-button>
      <div slot="center" v-if="search" @click="toSearch">
        <l-search-bar placeholder="搜索"></l-search-bar>
      </div>
      <h1 slot="center" class="l-header-title" v-text="headerTitle" v-if="!hideTitle"></h1>
    </l-header>
    <l-pulldown-refresh
      :top-load-method="loadTop"
      @top-status-change="handleTopChange"
      ref="topLoad"
      class="main"
      :style="style"
      v-if="topLoad">
      <slot></slot>
    </l-pulldown-refresh>
    <div class="main" v-else :style="style">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import LHeader from 'components/header'
import LPulldownRefresh from 'components/pulldown-refresh'
import LSearchBar from 'components/search/search-bar'

export default {
  name: 'LMainLayout',
  components: {
    LHeader,
    LPulldownRefresh,
    LSearchBar
  },
  props: {
    back: {
      type: Boolean,
      default: false
    },
    handleBack: {
      type: Function
    },
    title: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    },
    topLoad: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style () {
      return this.fixed ? { top: '44px' } : { top: '0' }
    }
  },
  data () {
    return {
      headerTitle: this.$route.name,
      hideTitle: false
    }
  },
  created () {
    this.headerTitle = this.title || this.$route.name
    this.hideTitle = this.search || false
  },
  methods: {
    goBack () {
      if (this.handleBack) {
        this.handleBack()
      } else {
        this.$router.back()
      }
    },
    toSearch () {
      // 可以根据当前的路由休息来判断是从哪张页面进去到search页面的
      // let router = this.router
      this.$router.push({ path: '/search' })
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      this.$emit('load-top', this.$refs.topLoad)
    },
    setScrollTop (value) {
      this.$refs.topLoad.$el.scrollTop = value
    },
    getScrollTop () {
      return this.$refs.topLoad.$el.scrollTop
    }
  }
}
</script>

<style lang="scss">

.main-layout-container {
  height: 100%;
  .main {
    position: relative;
    background-color: inherit;
    height: calc(100% - 44px);
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display:none;
    }
  }
}
</style>
