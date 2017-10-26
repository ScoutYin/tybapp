<template>
  <div class="l-mask" @click="hide" v-show="show"></div>
</template>

<script>
export default {
  name: 'LMask',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
// mask 的 z-index为2000，则需要使用mask的组件的z-index都应该大于2000
.l-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
}
</style>
