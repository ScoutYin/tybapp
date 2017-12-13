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
        transform: `translate3d(${this.translateX}px, 0px, 0px)`
      }
    },
    listWidth () {
      return this.$refs.list.clientWidth - window.document.body.clientWidth
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
    handleTouchStart (event) {
      this.startX = event.touches[0].clientX
      this.lastX = this.translateX
      console.log('start', this.startX)
    },
    handleTouchMove (event) {
      if (this.translateX <= 0 &&
          this.translateX + this.listWidth >= 0) {
        let currentX = event.touches[0].clientX
        this.translateX = this.lastX + currentX - this.startX
        event.preventDefault()
        event.stopPropagation()
      }
      // console.log('move', this.translateX, this.listWidth)
    },
    handleTouchEnd (event) {
      console.log('end')
      if (this.translateX > 0) {
        this.translateX = 0
      }

      if (this.translateX + this.listWidth < 0 && this.listWidth > 0) {
        this.translateX = -this.listWidth
      }
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
  display: flex;
  .l-tab-list {
    display: flex;
    flex-flow: row nowrap;
    flex-shrink: 0;
    padding: 0 10px;
    .l-tab-item {
      // box-sizing: border-box;
      display: flex;
      font-size: 14px;
      text-align: center;
      align-items: center;
      padding: 0 5px;
      // margin: auto;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }  
  }
}
</style>
