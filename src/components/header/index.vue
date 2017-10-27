<template>
  <header
    class="l-header"
    :class="{ 'is-fixed': fixed }">
    <div class="l-header-button is-left">
      <slot name="left"></slot>
    </div>
    <div class="is-center">
      <h1 class="l-header-title" v-text="title" v-if="title"></h1>
      <slot name="center"></slot>
    </div>
    <div class="l-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LMintHeader',
  props: {
    fixed: Boolean,
    title: String
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.l-header {
  align-items: center;
  background-color: $header-color;
  box-sizing: border-box;
  color: $default-font-color;
  display: flex;
  font-size: 14px;
  height: $header-height;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
</style>
