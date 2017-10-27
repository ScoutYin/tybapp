<template lang="html">
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
    <slot></slot>
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
