<template lang="html">
  <div class="login-panel">
    <div class="main-header"></div>
    <div class="input-wrapper">
      <input class="input-username" v-model="data.username" placeholder="用户名 / 手机号码">
    </div>
    <div class="input-wrapper">
      <input v-model="data.password" placeholder="密码">
    </div>
    <div @click="onLogin" class="btn-login">登录</div>
    <slot></slot>
  </div>
</template>

<script>
import LForm from 'components/form/form'
import LFormItem from 'components/form/form-item'
export default {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    LForm,
    LFormItem
  },
  methods: {
    onLogin () {
      this.$emit('commit', this.data)
    },
    resetFields () {
      console.log(this.$refs)
      this.$refs.form.resetFields()
      this.data = {}
    }
  },
  created () {
    console.log('login form: ', this)
    console.log(this)
    this.$on('el.form.addField', (field) => {
      console.log(field)
    })
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.login-panel {
  margin: 10px;
  box-sizing: border-box;
  font-size: 14px;
  .main-header {
    height: 150px;
  }
  .input-wrapper {
    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      padding: 0 10px;
      margin-bottom: 20px;
    }
  }
  .btn-login {
    font-size: 16px;
    margin: 10px 0;
    padding: 15px;
    background: rgba(7, 17, 27, 0.1);
    text-align: center;
    letter-spacing: 20px;
    background: $default-color;
    color: #fff;
  }
}
</style>
