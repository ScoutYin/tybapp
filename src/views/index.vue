<template>
  <div class="">
    <tabs-view :tabs="tabs">
    </tabs-view>
  </div>
</template>

<script>
import TabsView from '@/views/tabsView'
export default {
  name: 'Index',
  components: {
    TabsView
  },
  data () {
    return {
      tabs: [
        { id: 0, title: '首页' },
        { id: 1, title: '商城' },
        { id: 2, title: '+' },
        { id: 3, title: '消息' },
        { id: 4, title: '我' }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
