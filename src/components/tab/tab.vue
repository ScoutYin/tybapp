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
    value: {},
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    style () {
      return {
        transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        transitionDuration: this.opts.transitionDuration,
        transform: `translate3d(${this.translateX}px, 0px, 0px)`
      }
    },
    swipeAreaWidth () {
      return window.document.body.clientWidth
    },
    listWidth () {
      return this.$refs.list.clientWidth - this.swipeAreaWidth
    },
    opts () {
      return Object.assign({}, this.defaultOptions, this.options)
    }
  },
  data () {
    return {
      touching: false,
      translateX: 0,
      startX: 0,
      lastX: 0,
      startTimeStamp: 0,
      defaultOptions: {
        // 最大回弹距离;
        reBoundX: 60,
        // 惯性力;
        force: 2,
        // transition动画duration;
        transitionDuration: '1s'
      }
    }
  },
  mounted () {
    this.bindEvent()
  },
  methods: {
    handleTouchStart (event) {
      this.touching = true
      this.startX = this.lastX = event.touches[0].clientX
      this.startTimeStamp = event.timeStamp
    },
    handleTouchMove (event) {
      this.currentX = event.touches[0].clientX
      if (this.toLeft()) {  // 向左滑动;
        if (this.translateX <= 0 && this.translateX + this.listWidth > 0) {
          this.translateX += this.currentX - this.lastX
        } else if (this.translateX + this.listWidth <= 0) {
          this.translateX += this.opts.reBoundX * (this.currentX - this.lastX) / this.swipeAreaWidth
        } else if (this.translateX > 0) {
          this.translateX += this.currentX - this.lastX
        }
      } else {
        if (this.translateX >= 0) {  // 向右滑动;
          this.translateX += this.opts.reBoundX * (this.currentX - this.lastX) / this.swipeAreaWidth
        } else if (this.translateX <= 0 && this.translateX + this.listWidth >= 0) {
          this.translateX += this.currentX - this.lastX
        } else if (this.translateX + this.listWidth <= 0) {
          this.translateX += this.currentX - this.lastX
        }
      }
      this.lastX = this.currentX
      event.preventDefault()
      event.stopPropagation()
    },
    handleTouchEnd (event) {
      this.touching = false
      this.endTimeStamp = event.timeStamp
      let speed = (this.lastX - this.startX) / (this.endTimeStamp - this.startTimeStamp)
      this.translateX += speed * this.opts.force * 100
      if (this.translateX > 0) {
        this.translateX = 0
      }
      if (this.translateX + this.listWidth < 0 && this.listWidth >= 0) {
        this.translateX = -this.listWidth
      }
    },
    toLeft () {
      return this.currentX - this.lastX < 0 ? 1 : 0
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
  line-height: 44px;
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid #ddd;
  .l-tab-list {
    display: flex;
    flex-flow: row nowrap;
    flex-shrink: 0;
    padding: 0 10px;
    min-width: 100%;
    .l-tab-item {
      // box-sizing: border-box;
      flex-grow: 1;
      font-size: 14px;
      text-align: center;
      padding: 0 5px;
      // margin: auto;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }  
  }
}
</style>
