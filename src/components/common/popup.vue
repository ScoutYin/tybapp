<template>
  <div class="l-popup">
    <transition name="l-mask">
      <l-mask v-show="show" @hide="hide"></l-mask>
    </transition>
    <transition :name="transition">
      <div  v-show="show" :class="[position ? `l-popup-${position}` : '']" class="l-popup-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import LMask from './mask'
export default {
  name: 'LPopup',
  componentName: 'LPopup',
  components: {
    LMask
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator: (value) => [
        'top',
        'bottom',
        'left',
        'right'
      ].indexOf(value) > -1
    },
    show: Boolean
  },
  data () {
    return {
      transition: ''
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
.l-popup {
  .l-popup-content {
  }
  .l-popup-top {
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .l-popup-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .l-popup-left {
    top: 50%;
    left: 0;
    bottom: auto;
    right: auto;
    transform: translate3d(0, -50%, 0)
  }
  .l-popup-right {
    top: 50%;
    right: 0;
    bottom: auto;
    left: auto;
    transform: translate3d(0, -50%, 0)
  }

  .popup-slide-top-enter,
  .popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }
  .popup-slide-right-enter,
  .popup-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
  }
  .popup-slide-bottom-enter,
  .popup-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
  .popup-slide-left-enter,
  .popup-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
  }
  .popup-fade-enter,
  .popup-fade-leave-active {
    opacity: 0;
  }
}
</style>
