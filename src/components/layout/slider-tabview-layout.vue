<template>
  <l-main-layout back
                 class="slider-tabview-layout-container">
    <l-tab v-model="selected" class="tab">
      <l-tab-item v-for="(item, index) in items"
                  :key="index">
        {{item.title}}
      </l-tab-item>
    </l-tab>
    <router-view class="main-view"></router-view>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'
export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    LTab,
    LTabItem
  },
  props: {
    items: Array
  },
  data () {
    return {
      selected: -1
    }
  },
  created () {
    this.selected = 0
  },
  methods: {
  },
  watch: {
    selected (val, oldVal) {
      let componentName = this.items[val].componentName
      this.$router.replace({name: componentName})
    }
  }
}
</script>

<style lang="scss">
.slider-tabview-layout-container {
  .tab {
    position: fixed;
    z-index: 10;
    top: 44px;
  }
  .main-view {
    position: relative;
    top: 44px;
    height: calc(100% - 44px);
    &.order-list-container {
      .order-item {
        margin: 15px 0 ;
      }
    }
  }
}
</style>
