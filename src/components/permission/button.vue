<template>
  <div class="permission-button">
    <div @click="clicked">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  /**
   * 判断用户是否登陆，从而控制其跳转权限，已经实现自定义指令版本的，该组件可废弃
   */
  name: 'LPermissionButton',
  props: {

  },
  methods: {
    clicked () {
      if (this.$store.getters.isLogin) {
        this.$emit('click')
      } else {
        this.$store.dispatch('showLogin')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
