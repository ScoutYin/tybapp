<template lang="html">
  <l-main-layout class="settings-container" back>
    <mt-cell v-for="item in items" :title="item.title"></mt-cell>
    <div>
      <mt-button size="large" @click.native="logout">退出登录</mt-button>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
export default {
  name: 'Settings',
  components: {
    LMainLayout
  },
  data () {
    return {
      items: [{
        title: '修改密码'
      }, {
        title: '通用'
      }, {
        title: '关于'
      }]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style lang="scss">
</style>
