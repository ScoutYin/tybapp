<template>
  <div class="l-loadmore-wrapper"
       :style="{ transform: `translate3d(0, ${translateY}px, 0)` }">
    <div v-if="!topLoadMethod"
         :style="{ height: `${topBlockHeight}px`, marginTop: `${-topBlockHeight}px` }"
         class="action-block">
      <!-- <slot name="top-block"
            :state="state"
            :state-text="topText">
        <p class="default-text">{{ topText }}</p>
      </slot> -->
      <svg class="iconfont"
        :class="{
          'icon-pulldown': topStatus === 'pull',
          'icon-pullup': topStatus === 'drop',
          'icon-loading': topStatus === 'loading'
        }"
        aria-hidden="true">
        <use :xlink:href="iconName"></use>
      </svg>
      <slot></slot>
    </div>
    <!-- <div class="scroll-container">
      <slot></slot>
    </div>
    <div v-if="bottomLoadMethod"
         :style="{ height: `${bottomBlockHeight}px`, marginBottom: `${-bottomBlockHeight}px` }"
         class="action-block">
      <slot name="bottom-block"
            :state="state"
            :state-text="bottomText">
        <p class="default-text">{{ bottomText }}</p>
      </slot>
    </div> -->
  </div>
</template>

<script>
// const TEXT = {
//   PULL: 0,
//   DROP: 1,
//   LOADING: 2,
//   COMPLETE: 3
// }
export default {
  name: 'LLoadmore',
  componentName: 'LLoadmore',
  props: {
    topLoadMethod: {
      type: Function
    },
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
      iconName: '#icon-pulldown',
      topStatus: 'pull'
    }
  },
  computed: {
    topTextObj () {
      const keys = ['pull', 'drop', 'loading', 'complete']
      const defaultTopText = ['下拉刷新', '释放更新', '加载中...', '加载完成']
      let obj = {}

      if (this.customTopText) {
        this.customTopText.forEach((value, index) => {
          // toString 确保传进来的是字符串
          obj = Object.assign(obj, JSON.parse(`{"${keys[index]}": ${value.toString()}}`))
        })
      } else {
        defaultTopText.forEach((value, index) => {
          obj = Object.assign(obj, JSON.parse(`{"${keys[index]}": ${value}}`))
        })
      }

      return obj
    }
  },
  created () {
    this.topText = this.topTextObj
  },
  methods: {
  },
  watch: {
    topStatus (newValue) {
      this.$emit('top-status-changed', newValue)
      this.topText = this.topTextObj[newValue]
    }
  }
}
</script>

<style>

</style>
