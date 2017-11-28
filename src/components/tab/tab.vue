<template>
  <div class="l-tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  prorps: {
    lineWidth: {
      type: Number,
      default: 3
    },
    activeColor: String,
    defaultColor: String
  }
}
</script>

<style lang="scss">
.l-tab {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 44px;
  display: flex;
  .l-tab-item {
    flex: 1;
    height: 100%;
    line-height: 44px;
    font-size: 14px;
    text-align: center;
  }
}
</style>
