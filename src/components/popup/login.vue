<template lang="html">
  <div class="login-container">
    <l-header :title="headerTitle" fixed>
      <l-button slot="left" @click.native="close">
        <l-icon slot="icon" icon="icon-guanbi"></l-icon>
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
import { USER_NAME_DEFAULT, storage } from '@/utils/storage'
import { userRegister } from 'api'

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
  mounted () {
    this.resetData()
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
        // 保存默认用户名
        await this.$store.dispatch('userLogin', params).then(() => {
          // 如果登陆成功，登陆标志置为true，储存token，回调函数if need
          storage.set(USER_NAME_DEFAULT, params.username)
          this.resetData()
          this.$store.dispatch('loginSuccess')
        })
      } catch (err) {
        console.error('err: ', err.message)
      }
    },
    async register (params) {
      console.log('register: ', params)
      if (!params.modelid) { params.modelid = 3 }
      try {
        let res = await userRegister(this.registerFormData)
        console.log('res: ', res)
      } catch (err) {
        console.error(err.message)
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
      this.loginFormData = {username: storage.get(USER_NAME_DEFAULT) || ''}
      this.registerFormData = {}
    }
  }
}
</script>

<style lang="scss">
.login-container {
  background-color: #efefef;
  .main {
    position: relative;
    top: 44px;
    background-color: inherit;
    height: 100%;
    width: 100%;
    .to-register {
      text-align: right;
      color: fff;
    }
  }
}
</style>
