<template>
  <div class="select-container">
    <l-header :title="selectTitle" fixed>
      <l-button slot="left" @click.native="close">
        取消
      </l-button>
    </l-header>
    <div class="main">
      <select-list :list="selectList" @selected="selected"></select-list>
    </div>
  </div>
</template>

<script>
import LHeader from 'components/header'
import SelectList from 'components/lists/select-list'
import { mapGetters } from 'vuex'
export default {
  components: {
    LHeader,
    SelectList
  },
  props: {

  },
  computed: {
    ...mapGetters([
      'selectTitle',
      'selectList'
    ])
  },
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    console.log('this.selectTitle: ', this.selectTitle)
  },
  methods: {
    close () {
      this.$store.dispatch('hideSelectView')
    },
    selected (item) {
      console.log('selected: ', item)
      this.$store.dispatch('selectComplete', item)
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
    top: 44px;
    background-color: inherit;
    height: 100%;
    width: 100%;
    margin-bottom: 44px;
  }
}
</style>
