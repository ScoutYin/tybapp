<template>
  <div class="main-layout-container">
    <l-mint-header fixed>
      <mt-button icon="back" slot="left" @click.native="goBack" v-if="back">返回</mt-button>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
      <div slot="center" v-if="search" @click="toSearch">
        点我搜索
      </div>
      <h1 slot="center" class="mint-header-title" v-text="headerTitle" v-if="!hideTitle"></h1>
    </l-mint-header>
    <main class="main">
      <slot></slot>
    </main>
  </div>

</template>

<script>
import LMintHeader from 'components/header'
export default {
  name: 'MainLayout',
  components: {
    LMintHeader
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
    }
  },
  data () {
    return {
      headerTitle: this.$route.name,
      hideTitle: false
    }
  },
  created () {
    if (this.title) {
      this.headerTitle = this.title
    }

    if (this.search) {
      this.hideTitle = true
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    toSearch () {
      // 可以根据当前的路由休息来判断是从哪张页面进去到search页面的
      // let router = this.router
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style lang="scss">
.main-layout-container {
  height: 100%;
  .main {
    position: absolute;
    top: 40px;
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
