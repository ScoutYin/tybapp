<template lang="html">
  <div class="login-container">
    <l-mint-header fixed>
      <mt-button slot="left" @click.native="close">
        <i class="iconfont icon-guanbi2"></i>
      </mt-button>
      <h1 slot="center" class="mint-header-title" v-text="headerTitle"></h1>
    </l-mint-header>
    <div class="main">
      <l-login-panel></l-login-panel>
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
    loginVisible: {
      get: function () {
        return this.$store.state['Login'].loginVisible
      },
      set: function (newValue) {
        this.$store.state['Login'].loginVisible = newValue
      }
    }
  },
  methods: {
    close () {
      this.loginVisible = false
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
