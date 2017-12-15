<template>
  <div class="select-list-wrapper">
    <div class="select-item-wrapper"
        v-for="(item, index) in selectList"
        :key="index">
      <div v-if="!item.children"
            @click="selected(item, index)">
        {{ item.label }}
      </div>
      <select-list v-else-if="item.expand" :list="item.children" @selected="selected(item)"></select-list>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectList',
  props: {
    list: Array
  },
  data () {
    return {
      selectList: this.list
    }
  },
  methods: {
    selected (item, index) {
      if ('children' in item) {
        if (item.expand) {
          this.selectList[index].expand = false
        } else {
          this.selectList[index].expand = true
        }
      } else {
        this.$emit('selected', item)
      }
    }
  },
  watch: {
    'list' (newVal) {
      this.selectList = newVal
    }
  }
}
</script>

<style lang="scss">
.select-list-wrapper {
  position: relative;
  padding: 10px;
  background: #fff;
  height: 100%;
  .select-item-wrapper {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
}
</style>
