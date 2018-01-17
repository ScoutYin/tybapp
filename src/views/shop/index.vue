<template>
  <l-main-layout class="l-shop-header-container" back>
    <header class="shop-header">
      <div class="thumb"></div>
      <div class="content">
        <title class="shop-title"></title>
        <div class="shop-evaluate"></div>
      </div>
    </header>
    <l-tab v-model="selected">
      <!-- <l-tab-item>首页</l-tab-item> -->
      <l-tab-item>店铺介绍</l-tab-item>
      <l-tab-item>供应产品</l-tab-item>
      <l-tab-item>联系方式</l-tab-item>
    </l-tab>
    <section v-if="selected === 0">

    </section>
    <footer class="tel" v-tel="123">
      <l-icon icon="icon-dianhua" class="icon-dianhua"></l-icon>
      <span class="text">联系电话</span>
    </footer>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'
export default {
  components: {
    LMainLayout,
    LTab,
    LTabItem
  },
  data () {
    return {
      selected: 0
    }
  }
}
</script>

<style lang="scss">
@import "../../common/style/var.scss";

.l-shop-header-container {
  .tel {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    background: white;
    .icon-dianhua {
      color: $default-color;
    }
    .text {
      padding: 0 10px;
    }
  }
}
</style>
