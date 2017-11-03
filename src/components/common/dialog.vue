<template>
  <div class="l-dialog">
    <transition name="l-mask">
      <l-mask v-show="show" @hide="hide"></l-mask>
    </transition>
    <transition name="l-dialog">
      <div v-show="show" class="dialog-wrapper">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import LMask from './mask'
export default {
  components: {
    LMask
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  watch: {
    'show' (newValue) {
      this.$emit('update:show', newValue)
      if (newValue) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/transition.scss';
.l-dialog {
  .dialog-wrapper {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: white;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
}
</style>
