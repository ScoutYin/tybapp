<template>
  <div class="l-tab-item"
       :class="{ 'is-selected': $parent.value === id }"
       :style="style"
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
        color: this.$parent.activeColor,
        borderColor: this.$parent.activeColor,
        borderWidth: `${this.$parent.lineWidth}px`
      }
    }
  },
  data () {
    return {
      id: this.$parent.index(this._uid)
    }
  },
  methods: {
    onItemClicked () {
      this.$parent.$emit('input', this.id)
      console.log('id: ', this.$parent.value, this.id)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.l-tab-item {
  &.is-selected {
    border-bottom-color: $default-color;
    border-bottom-style: solid;
  }
}
</style>
