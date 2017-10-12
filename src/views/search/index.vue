<template>
  <mt-search v-model="value" class="search-container" autofocus :result="filterResult">
    <!-- <mt-cell
      v-for="item in result"
      :title="item.title"
      :value="item.value">
    </mt-cell> -->
  </mt-search>
</template>

<script>
export default {
  name: '',
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
  }
}
</script>

<style lang="scss">

</style>
