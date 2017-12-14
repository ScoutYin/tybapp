<template>
  <div class="l-button-tab-item"
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
        backgroundColor: this.$parent.activeColor,
        color: '#fff',
        borderRadius: this.$parent.isRadius ? `${this.$parent.height / 2}px` : ''
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
.l-button-tab-item {
  &.is-selected {
  }
}
</style>
