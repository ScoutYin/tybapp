<template>
  <div class="l-search-bar">
    <slot name="icon">
      <l-icon icon="icon-sousuo"></l-icon>
    </slot>
    <label class="l-searchbar-label">{{placeholder}}</label>
  </div>
</template>

<script>
export default {
  name: 'LSearchBar',
  componentName: 'LSearchBar',

  props: {
    placeholder: String
  }
}
</script>

<style lang="scss">
.l-search-bar {
  // background: white;
  text-align: center;
  // display: flex;
  .icon {
    margin: auto 8px;
    font-size: 10px;
    text-align: right;
  }

  .l-searchbar-label {
    text-align: left;
  }
}
</style>
