<template lang="html">
  <l-main-layout class="settings-container" back>
    <mt-cell v-for="item in items" :title="item.title"></mt-cell>
    <div>
      <mt-button size="large" @click.native="logout" v-if="isLogin">退出登录</mt-button>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  components: {
    LMainLayout
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
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
  },
  watch: {
    'isLogin' (newValue) {
      console.log('isLogin: ', this.isLogin)
      if (newValue === false) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss">
</style>
