<template lang="html">
  <div class="login-container">
    <l-header :title="headerTitle">
      <l-button slot="left" @click.native="close">
        <l-icon slot="icon" icon="icon-guanbi1"></l-icon>
      </l-button>
    </l-header>
    <div class="main">
      <l-login-panel @commit="login" v-if="isLogin" ref="login" :data="loginFormData">
        <div @click="toRegister" class="to-register">
           <label @click="toRegister">免费注册</label>
        </div>
      </l-login-panel>
      <l-register-panel @commit="register" :data="registerFormData" ref="register" v-else>
        <div class="to-login">
          <label @click="toLogin">去登录</label>
        </div>
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
      loginFormData: {},
      registerFormData: {}
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
          this.resetData()
          this.$store.dispatch('loginSuccess')
        })
      } catch (err) {

      }
    },
    async register (params) {
      console.log('register: ', params)
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
      this.loginFormData = {}
      this.registerFormData = {}
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-color: #efefef;
  overflow: hidden;
  .main {
    position: relative;
    background-color: inherit;
    height: 100%;
    width: 100%;
    .to-register {
      text-align: right;
      color: #777;
    }
  }
}
</style>
