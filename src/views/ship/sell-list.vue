<template>
  <l-main-layout back>

  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import listMixin from '@/mixins/list'
export default {
  name: 'ShipSellList',
  components: {
    LMainLayout
  },
  mixins: [listMixin]
}
</script>

<style>

</style>
