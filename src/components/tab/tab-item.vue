<template>
  <div class="l-tab-item"
       :style="$parent.value === id ? style : {}"
       @click="onItemClicked">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LTabItem',
  componentName: 'LTabItem',
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style () {
      return {
        color: this.$parent.activeColor || 'red',
        borderColor: this.$parent.activeColor,
        borderWidth: this.$parent.lineWidth,
        borderBottomStyle: 'solid'
      }
    }
  },
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  },
  methods: {
    onItemClicked () {
      this.$parent.$emit('input', this.id)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.l-tab-item {
  &.is-selected {
  }
}
</style>
