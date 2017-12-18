<template>
  <div class="select-container">
    <l-header :title="title" fixed>
      <l-button slot="left" @click.native="close">
        取消
      </l-button>
    </l-header>
    <div class="main">
      <select-list :list="list" @selected="selected"></select-list>
    </div>
  </div>
</template>

<script>
import LHeader from 'components/header'
import SelectList from 'components/lists/select-list'
export default {
  components: {
    LHeader,
    SelectList
  },
  props: {
    title: String,
    list: Array
  },
  data () {
  },
  mounted () {
    console.log('this.selectTitle: ', this.title)
  },
  methods: {
    close () {
      this.$store.commit('CONTROL_SELECT_VIEW', false)
    },
    selected (item) {
      this.$emit('selected', item)
      this.$store.commit('CONTROL_SELECT_VIEW', false)
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
