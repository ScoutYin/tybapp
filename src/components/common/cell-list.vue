<template>
  <div class="l-cell-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LCellList',
  componentName: 'LCellList'
}
</script>

<style lang="scss">
.l-cell-list {
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 0;
    left: 15px;
    right: 0;
    border-bottom: 1px solid #d9d9d9;
    transform: scaleY(0.5);
  }
}
</style>
