<template>
  <l-main-layout back>
    <l-tab v-model="selected">
      <l-tab-item>1233333</l-tab-item>
      <l-tab-item>123444444444</l-tab-item>
      <l-tab-item>123</l-tab-item>
      <l-tab-item>123</l-tab-item>
      <l-tab-item>123</l-tab-item>
      <l-tab-item>123</l-tab-item>
      <l-tab-item>123</l-tab-item>
      <l-tab-item>1333323</l-tab-item>
    </l-tab>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'
export default {
  components: {
    LTab,
    LTabItem,
    LMainLayout
  },
  data () {
    return {
      selected: 0
    }
  }
}
</script>

<style lang="scss">

</style>
