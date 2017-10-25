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
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin () {
      this.$emit('commit', {username: this.username, password: this.password})
    },
    resetFields () {

    }
  },
  created () {
    console.log('login form: ', this)
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
