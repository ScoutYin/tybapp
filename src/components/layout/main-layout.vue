<template>
  <div class="main-layout-container">
    <l-header :fixed="fixed">
      <l-button slot="left" @click.native="goBack" v-if="back">
        <l-icon slot="icon" icon="icon-left"></l-icon>
        <span>返回</span>
      </l-button>
      <div slot="center" v-if="search" @click="toSearch">
        <l-search-bar placeholder="搜索"></l-search-bar>
      </div>
      <h1 slot="center" class="l-header-title" v-text="headerTitle" v-if="!hideTitle"></h1>
    </l-header>
    <l-loadmore
      :top-load-method="loadTop"
      @top-status-change="handleTopChange"
      ref="loadmore"
      class="main"
      v-if="loadmore">
      <slot></slot>
    </l-loadmore>
    <div class="main" v-else>
      <slot></slot>
    </div>
  </div>

</template>

<script>
import LHeader from 'components/header'
import LLoadmore from 'components/loadmore'
import LSearchBar from 'components/search/search-bar'

export default {
  name: 'LMainLayout',
  components: {
    LHeader,
    LLoadmore,
    LSearchBar
  },
  props: {
    back: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    },
    loadmore: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: true
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
      this.$router.back()
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
      this.$emit('load-top', this.$refs.loadmore)
    },
    setScrollTop (value) {
      this.$refs.loadmore.$el.scrollTop = value
    },
    getScrollTop () {
      return this.$refs.loadmore.$el.scrollTop
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
    height: calc(100% - 40px);
    top: 44px;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display:none;
    }
  }
}
</style>
