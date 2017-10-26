<template lang="html">
  <!-- <div class="login-panel">
    <h2><span class="title"></span>登陆</h2>
    <fieldset>
      <p><label for="username">Username</label></p>
      <p><input type="username" id="username" placeholder="请输入用户名" v-model="data.username"></p>

      <p><label for="password">Password</label></p>
      <p><input type="password" id="password" placeholder="请输入密码" v-model="data.password"></p>

      <mt-button @click.native="onLogin" type="primary" size="large">登 录</mt-button>
    </fieldset>
    <slot></slot>
  </div> -->
  <div class="login-panel">
    <l-form>
      <l-form-item label="用户名">
        <input v-model="data.username">
      </l-form-item>
      <l-form-item label="密码">
        <input v-model="data.password">
      </l-form-item>
    </l-form>
    <button @click="onLogin">登 录</button>
  </div>
</template>

<script>
import LForm from 'components/form/form'
import LFormItem from 'components/form/formItem'
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
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      this.$emit('commit', this.data)
    },
    resetFields () {

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

<style lang="scss" scoped>
.login-panel {

}
</style>
