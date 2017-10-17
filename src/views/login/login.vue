<template lang="html">
  <div class="login-container">
    <l-mint-header fixed>
      <mt-button slot="left" @click.native="close">
        <i class="iconfont icon-guanbi2"></i>
      </mt-button>
      <h1 slot="center" class="mint-header-title" v-text="headerTitle"></h1>
    </l-mint-header>
    <div class="main">
      <l-login-panel @commit="login"></l-login-panel>
    </div>
  </div>
</template>

<script>
import LMintHeader from 'components/header'
import LLoginPanel from 'components/panels/login'
export default {
  name: 'LoginView',
  components: {
    LMintHeader,
    LLoginPanel
  },
  props: {
    headerTitle: {
      type: String,
      default: '登录'
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.$store.dispatch('hideLogin')
    },
    async login (params) {
      this.$store.dispatch('userLogin', params)
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-color: #efefef;
  height: 100vh;
  .main {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 100%;
  }
}
</style>
