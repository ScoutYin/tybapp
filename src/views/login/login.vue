<template lang="html">
  <div class="login-container">
    <l-header fixed :title="headerTitle">
      <l-button slot="left" icon="guanbi1" @click.native="close"></l-button>
    </l-header>
    <div class="main">
      <l-login-panel @commit="login" v-if="isLogin" ref="login" :data="loginFormData">
        <div @click="toRegister">注册</div>
      </l-login-panel>
      <l-register-panel v-else>
        <div @click="toLogin">登录</div>
      </l-register-panel>
    </div>
  </div>
</template>

<script>
import LHeader from 'components/header'
import LButton from 'components/common/button'
import LLoginPanel from 'components/panels/login'
import LRegisterPanel from 'components/panels/register'
export default {
  name: 'LoginView',
  components: {
    LHeader,
    LLoginPanel,
    LRegisterPanel,
    LButton
  },
  props: {
    headerTitle: {
      type: String,
      default: '登录'
    }
  },
  computed: {
  },
  data () {
    return {
      isLogin: true,
      loginFormData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    close () {
      this.$store.dispatch('hideLogin')
      // 等动画消失以后再进行重置操作
      setTimeout(() => {
        this.resetData()
      }, 200)
    },
    async login (params) {
      try {
        await this.$store.dispatch('userLogin', params).then(() => {
          // 如果登陆成功，登陆标志置为true，储存token，回调函数if need
          this.$store.dispatch('loginSuccess')
        })
      } catch (err) {

      }
    },
    toRegister () {
      this.isLogin = false
    },
    toLogin () {
      this.isLogin = true
    },
    resetData () {
      this.isLogin = true
      // 还需要清空输入框
      this.$refs.login.resetFields()
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
    top: 44px;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>
