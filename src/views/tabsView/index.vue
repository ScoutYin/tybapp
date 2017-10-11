<template>
  <div class="tab-container">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="item in tabs" :id="item.id">
        <mt-cell v-for="n in 20" :title="n + item.title"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item v-for="item in tabs" :id="item.id">
        <img slot="icon" :src="item.src" v-if="item.src">
        {{ item.title }}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    tabs: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      // tabs默认有一个空对象
      selected: this.tabs[0].id
    }
  }
}
</script>

<style lang="scss">
.tab-container {
  overflow: hidden;
  height: calc(100vh - 55px);
}
</style>
