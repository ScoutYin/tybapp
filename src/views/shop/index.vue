<template>
  <l-main-layout class="l-shop-header-container" back>
    <header class="shop-header">
      <div class="thumb">
        <img :src="shopData.thumb" alt="">
      </div>
      <div class="content">
        <div class="shop-title">{{ shopData.shopname }}</div>
        <div class="shop-evaluate">
          {{ `服务 ${shopData.service_score}
              发货 ${shopData.shipping_score}
              品质 ${shopData.quality_score}` }}
        </div>
      </div>
    </header>
    <l-tab v-model="selected">
      <!-- <l-tab-item>首页</l-tab-item> -->
      <l-tab-item>店铺介绍</l-tab-item>
      <l-tab-item>供应产品</l-tab-item>
      <l-tab-item>联系方式</l-tab-item>
    </l-tab>
    <div class="content-view">
      <section v-if="selected === 0">
        <div v-html="parseHTML(shopData.introduce)"></div>
      </section>
      <section v-if="selected === 1">
      </section>
      <section v-if="selected === 2" class="link-section">
        <div>{{`联系人： ${shopData.linkman}`}}</div>
        <div>{{`手机号： ${shopData.mobile}`}}</div>
        <!-- <div>{{`传 真： ${shopData.fax}`}}</div> -->
        <div>{{`地 址： ${shopData.address}`}}</div>
      </section>
    </div>
    <footer class="tel" v-tel="123">
      <l-icon icon="icon-dianhua" class="icon-dianhua"></l-icon>
      <span class="text">联系电话</span>
    </footer>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LTab, LTabItem } from 'components/tab'
import { getShopIndex } from 'api'
export default {
  components: {
    LMainLayout,
    LTab,
    LTabItem
  },
  data () {
    return {
      selected: 0,
      shopData: {}
    }
  },
  mounted () {
    this.getShopIndex()
  },
  methods: {
    async getShopIndex () {
      try {
        let res = await getShopIndex({ shopid: this.$route.query.shopid })
        this.shopData = res.data
      } catch (err) {
        console.error(err.message)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../common/style/var.scss";

.l-shop-header-container {
  .shop-header {
    height: 120px;
    background: $default-color;
    display: flex;
    align-items: center;
    padding: 0 30px;
    .thumb {
      height: 80px;
      width: 80px;
    }
    .content {
      padding-left: 15px;
      height: 80px;
      color: white;
      font-size: 16px;
      .shop-evaluate {
        font-size: 13px;
        margin-top: 10px;
      }
    }
  }
  .content-view {
    margin-top: 10px;
    background: white;
    padding: 10px;
    .link-section {
      &:nth-child(1) {
        line-height: 25px;
      }
    }
  }
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
