<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mt-popup
      v-model="loginVisible"
      position="bottom"
      class="popup-container">
      <login-view></login-view>
    </mt-popup>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import LoginView from 'views/login/login'
export default {
  name: 'app',
  components: {
    LoginView
  },
  computed: {
    loginVisible: {
      get: function () {
        return this.$store.state['Login'].loginVisible
      },
      set: function (newValue) {
        this.$store.state['Login'].loginVisible = newValue
      }
    }
    // ...mapGetters([
    //   'loginVisible'
    // ])
  },
  data () {
    return {

    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100vh;
  background: #efefef;
  .popup-container {
    width: 100%;
    height: 100vh;
  }
}
</style>
