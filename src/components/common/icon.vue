<template>
  <svg slot="icon" aria-hidden="true" v-if="type === 'symbol'" class="icon">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
  <i v-else-if="type === 'font'" :class="`iconfont ${icon}`"></i>
</template>

<script>
export default {
  name: 'LIcon',
  componentName: 'LIcon',
  props: {
    icon: String,
    type: {
      type: String,
      default: 'symbol',
      validator: (value) => {
        return ['symbol', 'font'].indexOf(value) > -1
      }
    }
  }
}
</script>

<style>

</style>
