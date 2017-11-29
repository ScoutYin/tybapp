<template>
  <div class="l-tab">
    <div class="l-tab-list"
         :style="style"
         ref="list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lineWidth: {
      type: Number,
      default: 3
    },
    activeColor: String,
    defaultColor: String,
    value: {}
  },
  computed: {
    style () {
      return {
        transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        // transitionDuration: '0ms',
        transform: `translate(${this.translateX}px, 0px`
      }
    }
  },
  data () {
    return {
      translateX: 0,
      startX: 0,
      lastX: 0
    }
  },
  mounted () {
    this.bindEvent()
  },
  methods: {
    index (id) {
      console.log('id: ', id, this.$children)
      for (let i = 0; i < this.$children.length; ++i) {
        if (this.$children[i]._uid === id) {
          return i
        }
      }
      return -1
    },
    handleTouchStart (event) {
      this.startX = event.touches[0].clientX
      this.lastX = this.translateX
      console.log('start', this.startX)
    },
    handleTouchMove (event) {
      let currentX = event.touches[0].clientX
      console.log('this refs', this)
      if (this.translateX <= 0) {
        this.translateX = this.lastX + currentX - this.startX
        event.preventDefault()
        event.stopPropagation()
      }
      console.log('move', this.translateX)
    },
    handleTouchEnd (event) {
      console.log('end')
    },
    bindEvent () {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
    }
  }
}
</script>

<style lang="scss">
.l-tab {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 44px;
  overflow: hidden;
  .l-tab-list {
    display: flex;
    padding: 0 10px;
    .l-tab-item {
      box-sizing: border-box;
      display: block;
      // flex: 1 1 50%;
      height: 100%;
      line-height: 44px;
      font-size: 14px;
      text-align: center;
      margin: 0 20px;
    }  
  }
}
</style>
