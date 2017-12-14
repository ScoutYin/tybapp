<template>
  <div class="l-button-tab">
    <div class="l-button-tab-list" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    activeColor: {
      type: String,
      default: '#26a2ff'
    },
    height: {
      type: String,
      default: '30'
    },
    isRadius: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      style: {
        color: this.activeColor,
        backgroundColor: '#fff',
        height: `${this.height}px`,
        lineHeight: `${this.height}px`,
        borderRadius: this.isRadius ? `${this.height / 2}px` : ''
      }
    }
  }
}
</script>

<style lang="scss">
.l-button-tab {
  padding: 15px;
  .l-button-tab-list {
    display: flex;
    align-items: center;
    .l-button-tab-item {
      text-align: center;
      flex: 1;
    }
  }
}
</style>
