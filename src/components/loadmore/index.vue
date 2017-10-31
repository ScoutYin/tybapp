<template>
  <div class="l-loadmore-wrapper"
       :class="{ 'is-dropped': topDropped }"
       :style="{ transform: `translate3d(0, ${translateY}px, 0)` }">
    <div v-if="topLoadMethod"
         class="action-block"
         :style="{ height: `${topBlockHeight}px`, marginTop: `${-topBlockHeight}px` }">
      <svg class="icon"
        :class="{
          'icon-arrow': topStatus === 'pull',
          'icon-arrow': topStatus === 'drop',
          'icon-loading': topStatus === 'loading',
          'icon-complete': topStatus === 'complete'
        }"
        aria-hidden="true">
        <use :xlink:href="iconName"></use>
      </svg>
      <span class="default-text">{{ topText }}</span>
    </div>
    <div class="scroll-container">
      <slot></slot>
    </div>
    <!-- <div class="action-block" :style="{ height: `${bottomBlockHeight}px`, marginBottom: `${-bottomBlockHeight}px` }"></div> -->
  </div>
</template>

<script>
export default {
  name: 'LLoadmore',
  componentName: 'LLoadmore',
  props: {
    autoFill: {
      type: Boolean,
      default: true
    },
    distanceIndex: {
      type: Number,
      default: 2
    },
    maxDistance: {
      type: Number,
      default: 0
    },
    topDistance: {
      type: Number,
      default: 70
    },
    topLoadMethod: {
      type: Function
    },
    topLoaded: Boolean,
    // 用户自定义下拉text
    customTopText: {
      type: Array,
      validator (value) {
        return value.length === 4
      }
    }
  },
  data () {
    return {
      translateY: 0,
      topText: '',
      scrollEventTarget: null,
      topBlockHeight: 50,
      bottomBlockHeight: 50,
      containerFilled: false,
      topStatus: '',
      keys: ['pull', 'drop', 'loading', 'complete'],
      defaultTopText: ['下拉刷新', '释放更新', '加载中...', '加载完成'],
      startY: '',
      currentY: '',
      startScrollTop: '',
      direction: '',
      distance: 0,
      topDropped: false
    }
  },
  computed: {
    topTextObj () {
      let obj = {}

      if (this.customTopText) {
        this.customTopText.forEach((value, index) => {
          // 确保传进来的是字符串
          console.log('obj: ', obj)
          obj = Object.assign(obj, JSON.parse(`{"${this.keys[index]}": "${value}"}`))
        })
      } else {
        this.defaultTopText.forEach((value, index) => {
          console.log('obj: ', value)
          obj = Object.assign(obj, JSON.parse(`{"${this.keys[index]}": "${value}"}`))
        })
      }
      console.log('obj: ', obj)

      return obj
    },
    iconName () {
      let iconNames = {
        'pull': '#icon-pulldown',
        'drop': '#icon-pulldown',
        'loading': '#icon-loading-1',
        'complete': '#icon-complete'
      }

      return this.topStatus ? iconNames[this.topStatus] : ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleTouchStart (event) {
      console.log('touch start')
      this.startY = event.touches[0].clientY
      this.startScrollTop = this.scrollEventTarget.scrollTop
    },
    handleTouchMove (event) {
      console.log('touch move')
      this.currentY = event.touches[0].clientY
      this.distance = (this.currentY - this.startY) / this.distanceIndex
      this.direction = this.distance > 0 ? 'down' : 'up'
      if (this.topLoadMethod && this.direction === 'down' && this.startScrollTop === 0) {
        event.preventDefault()
        event.stopPropagation()

        this.translateY = this.distance - this.startScrollTop
        if (this.translateY < 0) {
          this.translateY = 0
        }
        this.topStatus = this.translateY >= this.topDistance ? 'drop' : 'pull'
      }
    },
    handleTouchEnd (event) {
      if (this.direction === 'down' && this.scrollEventTarget.scrollTop === 0 && this.translateY > 0) {
        this.topDropped = true
        if (this.topStatus === 'drop') {
          this.translateY = '50'
          this.topStatus = 'loading'
          this.topLoadMethod()
        } else {
          this.translateY = '0'
          this.topStatus = 'pull'
        }
      }
      this.direction = ''
    },
    handleScroll (event) {

    },
    getScrollEventTarget (element) {
      let currentNode = element
      while (currentNode &&
        currentNode.tagName !== 'HTML' &&
        currentNode.tagName !== 'BODY' &&
        currentNode.nodeType === 1) {
        let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return currentNode
        }
        currentNode = currentNode.parentNode
      }
      return window
    },
    bindTouchEvents () {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
      this.$el.addEventListener('scroll', this.handleScroll)
    },
    init () {
      this.topStatus = 'pull'
      // this.scrollEventTarget = this.getScrollEventTarget(this.$el)
      this.scrollEventTarget = this.$el.querySelector('.scroll-container')
      if (typeof this.topLoadMethod === 'function') {
        this.fillContainer()
        this.bindTouchEvents()
      }
      console.log('loadmore init: ', this.topText)
    },
    fillContainer () {
      if (this.autoFill) {
        this.$nextTick(() => {
          if (this.scrollEventTarget === window) {
            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                document.documentElement.getBoundingClientRect().bottom
          } else {
            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                this.scrollEventTarget.getBoundingClientRect().bottom
          }
          // if (!this.containerFilled) {
          //   this.bottomStatus = 'loading'
          //   this.bottomMethod(this.uuid)
          // }
        })
      }
    },
    onTopLoaded () {
      // if (id === this.uuid) {
      this.topStatus = 'complete'
      setTimeout(() => {
        this.topStatus = 'pull'
        this.translateY = 0
      }, 500)
      // }
    }
  },
  watch: {
    topStatus (newValue) {
      this.$emit('top-status-changed', newValue)
      this.topText = this.topTextObj[newValue]
      console.log('topStatus: ', this.topText)
    }
  }
}
</script>

<style lang="scss">
.l-loadmore-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .is-dropped {
    transition: .2s;
  }
  .scroll-container {
    // flex: 1;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
  }
  .action-block {
    text-align: center;
    line-height: 50px;
    position: relative;
    .default-text {
    }
    .icon-arrow {
      transition: .2s;
      transform: rotate(180deg);
    }
    .icon-loading {
      animation-name: loading;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      // animation-direction: alternate;
    }
    @keyframes loading
    {
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
    }
  }
}
</style>
