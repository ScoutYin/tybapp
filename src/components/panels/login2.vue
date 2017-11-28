<template lang="html">
  <div class="login-panel">
    <l-form class="login-form" ref="form">
      <l-form-item label="用户名" class="form-item">
        <input v-model="data.username" placeholder="请输入用户名">
      </l-form-item>
      <l-form-item label="密码" class="form-item">
        <input v-model="data.password" placeholder="请输入密码">
      </l-form-item>
    </l-form>
    <div @click="onLogin" class="btn-login">点 我 登 录</div>
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
.login-panel {
  margin: 10px;
  box-sizing: border-box;
  font-size: 13px;
  .login-form {
    background: white;
    font-weight: 600;
    .form-item {
      padding: 10px 0;
      input {
        outline: none;
        font-size: 12px;
      }
    }
  }
  .btn-login {
    margin: 10px 0;
    padding: 10px;
    background: rgba(7, 17, 27, 0.1);
    text-align: center;
    border-radius: 4px;
  }
}
</style>
