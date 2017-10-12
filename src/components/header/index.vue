<template>
  <header
    class="mint-header"
    :class="{ 'is-fixed': fixed }">
    <div class="mint-header-button is-left">
      <slot name="left"></slot>
    </div>
    <slot name="center"></slot>
    <div class="mint-header-button is-right">
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

</style>
