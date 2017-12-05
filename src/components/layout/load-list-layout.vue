<template>
  <l-pulldown-refresh>
    <slot></slot>
  </l-pulldown-refresh>
</template>

<script>
import listMixin from '@/mixins/list'
import LPulldownRefresh from 'components/pulldown-refresh'
export default {
  name: 'LLoadListLayout',
  components: {
    LPulldownRefresh
  },
  props: {
    fetchFunc: Function,
    typeId: {
      type: String,
      default: 'id'
    }
  },
  mixin: [listMixin],
  mounted () {
    this.init(this.fetchFunc, this.typeId)
  }
}
</script>

<style lang="scss">

</style>
