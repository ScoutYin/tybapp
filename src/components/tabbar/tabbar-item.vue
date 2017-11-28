<template>
  <div class="tabbar-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="item-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LTabbarItem',
  component: 'LTabbarItem',
  data () {
    return {
      id: this.$parent.index(this._uid)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.tabbar-item {
  text-align: center;
  margin: 5px auto;
  width: 100%;
  color: #888;
  &.is-selected {
    color: $default-color;
  }
  .item-icon {

  }
  .item-text {
    // font-size: 14PX;
  }
}
</style>

