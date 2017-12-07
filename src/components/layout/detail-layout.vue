<template>
  <div class="l-detail-layout-container">
    <div class="back-btn" @click="back">
      <l-icon icon="icon-left"></l-icon>
    </div>
    <div class="l-main-content"
         :style="{ height: $slots.bottom ? `calc(100vh - ${bottomHeight}px)` : '100%' }">
      <l-pulldown-refresh>
        <swiper :aspect-ratio="200/320" auto class="swipe" ref="swipe" v-if="thumbs && thumbs.length > 0">
          <swiper-item class="swiper-img" style="width: 100%;" v-for="(item, index) in thumbs" :key="index">
            <img :src="item" width="100%" height="100%">
          </swiper-item>
        </swiper>
        <slot></slot>
      </l-pulldown-refresh>
    </div>
    <div class="l-detail-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import LPulldownRefresh from 'components/pulldown-refresh'
import { Swiper, SwiperItem } from 'vux'

export default {
  name: 'LDetailLayout',
  components: {
    LPulldownRefresh,
    Swiper,
    SwiperItem
  },
  props: {
    thumbs: Array,
    bottomHeight: {
      type: String,
      default: '44'
    }
  },
  mounted () {
    console.log('this.$router: ', this)
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.l-detail-layout-container {
  position: relative;
  .back-btn {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(7, 17, 27, 0.3);
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    z-index: 1;
  }
  .l-main-content {
    height: calc(100vh - 44px);
  }
  .l-detail-bottom {
    position: fixed;
    height: 44px;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    display: flex;
  }
}
</style>
