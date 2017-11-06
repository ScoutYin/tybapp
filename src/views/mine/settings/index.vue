<template lang="html">
  <l-main-layout class="settings-container" back>
    <div class="list">
      <l-cell :title="item.title"
        v-for="(item, index) in items"
        :key="index">
      </l-cell>
    </div>
    <div>
      <l-button size="large" @click.native="logout" v-if="isLogin">退出登录</l-button>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LButton from 'components/common/button'
import LCell from 'components/common/cell'
import { mapGetters } from 'vuex'
export default {
  name: 'Settings',
  components: {
    LMainLayout,
    LButton,
    LCell
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
