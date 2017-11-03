<template>
  <div class="l-tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LTabbar',
  component: 'LTabbar',
  props: {
    value: {}
  },
  methods: {
    index (id) {
      for (let i = 0; i < this.$children.length; ++i) {
        if (this.$children[i]._uid === id) {
          return i
        }
      }
      return -1
    }
  }
}
</script>

<style lang="scss">
.l-tabbar {
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
}
</style>
