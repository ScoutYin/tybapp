<template>
  <div class="l-loadmore-wrapper">
    <div class="l-loadmore-content"
       :class="{ 'is-dropped': topDropped }"
       :style="{ transform: `translate3d(0, ${translateY}px, 0)` }">
      <div v-if="topLoadMethod"
          class="action-block"
          :style="{ height: `${topDistance}px`, marginTop: `${-topDistance}px` }">
        <slot name="top-block">
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
        </slot>
      </div>
      <div class="scroll-container">
        <slot></slot>
      </div>
    </div>
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
    topDistance: {
      type: Number,
      default: 50
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
      },
      default: () => ['下拉刷新', '释放更新', '加载中...', '加载完成']
    },
    loadingType: {
      type: Number,
      validator (value) {
        return [1, 2, 3].indexOf(value) > -1
      },
      default: 1
    }
  },
  data () {
    return {
      translateY: 0,
      topText: '',
      scrollEventTarget: null,
      topStatus: '',
      keys: ['pull', 'drop', 'loading', 'complete'],
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
          obj = Object.assign(obj, JSON.parse(`{"${this.keys[index]}": "${value}"}`))
        })
      }

      return obj
    },
    iconName () {
      let iconNames = {
        'pull': '#icon-pulldown',
        'drop': '#icon-pulldown',
        'loading': `#icon-loading-${this.loadingType}`,
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
      this.topDropped = false
      this.startY = event.touches[0].clientY
      this.startScrollTop = this.scrollEventTarget.scrollTop
    },
    handleTouchMove (event) {
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
          this.translateY = this.topDistance
          this.topStatus = 'loading'
          this.topLoadMethod()
        } else {
          this.translateY = 0
          this.topStatus = 'pull'
        }
      }
      this.direction = ''
    },
    bindTouchEvents () {
      this.$el.addEventListener('touchstart', this.handleTouchStart)
      this.$el.addEventListener('touchmove', this.handleTouchMove)
      this.$el.addEventListener('touchend', this.handleTouchEnd)
    },
    init () {
      this.topStatus = 'pull'
      this.scrollEventTarget = this.$el.querySelector('.scroll-container')
      if (typeof this.topLoadMethod === 'function') {
        this.bindTouchEvents()
      }
    },
    onTopLoaded () {
      this.topStatus = 'complete'
      setTimeout(() => {
        this.translateY = 0
      }, 500)
    }
  },
  watch: {
    topStatus (newValue) {
      this.$emit('top-status-changed', newValue)
      this.topText = this.topTextObj[newValue]
    }
  }
}
</script>

<style lang="scss">
.l-loadmore-wrapper {
  height: 100%;
  overflow: hidden;
  .is-dropped {
    transition: .2s;
  }

  .scroll-container {
    -webkit-overflow-scrolling: touch;
  }

  .action-block {
    text-align: center;
    line-height: 50px;
    .default-text {
      vertical-align: super;
      font-size: 13px;
    }

    .icon {
      font-size: 14px;
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
