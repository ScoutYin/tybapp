<template>
  <div class="select-container">
    <v-distpicker type="mobile" @selected="selected"></v-distpicker>
  </div>
</template>

<script>
import LHeader from 'components/header'
import VDistpicker from 'v-distpicker'
export default {
  components: {
    LHeader,
    VDistpicker
  },
  props: {

  },
  computed: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    close () {
    },
    selected (item) {
      this.$emit('selected', item)
    }
  }
}
</script>

<style lang="scss">
.select-container {
  background-color: #efefef;
  overflow: hidden;
  .main {
    position: relative;
    margin-top: 44px;
    background-color: inherit;
    height: 100%;
    width: 100%;
  }
}
</style>
