<template>
  <div class="">
    <div class="">

    </div>

    <checklist :title="'Basic Usage'" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
  </div>
</template>

<script>
export default {
  name: 'LCartItem',
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss">

</style>
