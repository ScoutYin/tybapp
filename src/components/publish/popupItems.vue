<template>
  <div class="l-popup-items-wrapper">
    <div class="item-wrapper"
      v-for="(item, index) in items"
      :key="index">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`"></use>
      </svg>
      <p class="label">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LPopupItems',
  componentName: 'LPopupItems',
  props: {
    items: Array
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
.l-popup-items-wrapper {
  height: 80px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  .item-wrapper {
    text-align: center;
    margin: auto 0;
    color: $default-color;
    .icon {

    }
    .label {

    }
  }
}
</style>
