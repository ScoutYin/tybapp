<template>
  <l-search v-model="value" class="search-container" autofocus :result="filterResult">
    <div slot="left" @click="back">
      <l-icon icon="icon-left"></l-icon>
    </div>
  </l-search>
</template>

<script>
import LSearch from 'components/search'
export default {
  name: 'Search',
  components: {
    LSearch
  },
  data () {
    return {
      value: '',
      filterResult: [
        'first',
        'second',
        'third',
        'fourth'
      ],
      result: [
        { title: 'first', value: '123' },
        { title: 'second', value: '234' },
        { title: 'third', value: '345' },
        { title: 'fourth', value: '456' }
      ]
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.search-container {
  .icon-left {
    font-size: 20px;
    margin-right: 8px;
  }
}
</style>
