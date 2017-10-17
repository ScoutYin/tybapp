<template lang="html">
  <div class="login-panel">
    <h2><span class="title"></span>登陆</h2>
    <fieldset>
      <p><label for="username">Username</label></p>
      <p><input type="username" id="username" placeholder="请输入用户名" v-model="username"></p>

      <p><label for="password">Password</label></p>
      <p><input type="password" id="password" placeholder="请输入密码" v-model="password"></p>

      <mt-button @click.native="onLogin" type="primary" size="large">登 录</mt-button>
    </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      this.$emit('commit', {username: this.username, password: this.password})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-panel {

}
</style>
