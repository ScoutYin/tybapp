<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <popup
      v-model="loginVisible"
      height="100%"
      class="popup-container">
      <login-view></login-view>
    </popup>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import LoginView from 'components/popup/login'
import SelectView from 'components/popup/select'
import { Popup } from 'vux'
export default {
  name: 'app',
  components: {
    LoginView,
    SelectView,
    Popup
  },
  computed: {
    loginVisible: {
      get: function () {
        return this.$store.getters.loginVisible
      },
      set: function (newValue) {
        this.$store.commit('CONTROL_LOGIN', newValue)
      }
    },
    selectVisible: {
      get: function () {
        return this.$store.getters.selectVisible
      },
      set: function (newValue) {
        this.$store.commit('CONTROL_SELECT_VIEW', newValue)
      }
    }
    // ...mapGetters([
    //   'loginVisible'
    // ])
  },
  data () {
    return {
      cityPickerVisible: true
    }
  },
  mounted () {
    if (this.$store.getters.isLogin) {
      this.$store.dispatch('getUserInfo')
    }
  },
  watch: {
    '$route' (newValue) {
      // if (newValue.meta.needLogin) {
      //   console.log('this page needLogin.')
      //   this.loginVisible = true
      // }
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100vh;
  background: #efefef;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #555;
  font-size: 14px;
  .popup-container {
    overflow: hidden;
  }
  .icon {
    width: 1.3em;
    height: 1.3em;
    // vertical-align: -0.15em;
    fill: currentColor;
    // overflow: hidden;
    margin: auto 0;
  }
}
</style>
