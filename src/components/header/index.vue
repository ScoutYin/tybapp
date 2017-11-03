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
import LButton from '../common/button'

export default {
  name: 'LMintHeader',
  components: {
    LButton
  },
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

  .l-header-button {
    flex: .5;

    &>:first-child {
      background-color: transparent;
      border: 0;
      box-shadow: none;
      color: inherit;
      display: inline-block;
      padding: 0;
      font-size: inherit;
      &::after {
        content: none;
      }
    }
  }

  .is-left {
    text-align: left;
  }

  .is-right {
    text-align: right;
  }

  .is-center {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    font-size: inherit;
    font-weight: normal;
    .l-header-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: inherit;
      font-weight: 400;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  }
}
.l-header.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  z-index: 2001;
}
</style>
