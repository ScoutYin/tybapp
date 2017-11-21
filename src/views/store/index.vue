<template>
  <div class="store-container">
    <l-main-layout class="main"
      search
      loadmore
      @load-top="loadTop"
      ref="main">
      <div slot="title">123</div>

      <swiper :aspect-ratio="100/320" auto class="swipe" ref="swipe">
        <swiper-item class="swiper-img" style="width: 100%;" v-for="(item, index) in items" :key="index">
          <img :src="item.imgSrc" width="100%" height="100%">
        </swiper-item>
      </swiper>

      <div class="hot">
        <l-goods-top-item
          v-for="(item, index) in hotItems"
          :key="index"
          class="hot-item"
          :item="item">
          {{ item }}
        </l-goods-top-item>
      </div>

      <tab class="tabs" :line-width="2" custom-bar-width="60px" ref="tab" v-model="tabIndex">
        <tab-item  @on-item-click="onItemClick">渔船</tab-item>
        <tab-item  @on-item-click="onItemClick">鱼货</tab-item>
      </tab>

      <div class="store-list" ref="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <l-goods-item
          :data="item"
          v-for="(item, index) in lists[tabIndex]"
          :key="index"
          class="goods-item"
          @click.native="toGoodsDetail(item.id)">
        </l-goods-item>
      </div>
      <div class="loadmore-bottom-text">
        <l-part-line :text="canLoadmore ? '加载更多' : '没有可加载的'">
          <inline-loading slot="left" v-if="canLoadmore" class="inline-loading"></inline-loading>
        </l-part-line>
      </div>
      
    </l-main-layout>
    <!-- <tab class="tabs-top" :line-width="2" custom-bar-width="60px" v-show="isTabTop" v-model="tabIndex">
      <tab-item @on-item-click="onItemClick">渔船</tab-item>
      <tab-item @on-item-click="onItemClick">渔货</tab-item>
    </tab> -->
    <div class="to-top" v-show="isTabTop" @click="toTop">
      <l-icon icon="icon-dingbu"></l-icon>
    </div>
  </div>
</template>

<script>
/**
 * 该页面未处理的Bug
 * 1. Tab切换的时候仍然会出现一些问题，具体的逻辑还需要稍作修改才能正常切换。
 */
import LMainLayout from 'components/layout/mainLayout'
import LPartLine from 'components/common/partLine'
import { Tab, TabItem, Swiper, SwiperItem, InlineLoading } from 'vux'
import { mapGetters } from 'vuex'
import { getGoodsList } from 'api'
import LGoodsItem from 'components/lists/goodsItem'
import LGoodsTopItem from 'components/lists/goodsTopItem'

const TAB_NUM = 2

export default {
  name: '',
  components: {
    LMainLayout,
    LPartLine,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    LGoodsItem,
    LGoodsTopItem,
    InlineLoading
  },
  computed: {
    ...mapGetters([
      'indexStoreTab'
    ])
  },
  data () {
    return {
      items: [
        {
          id: 1,
          imgSrc: 'http://www.taoyu58.com/Uploads/Picture/2017-09-08/59b237dd62df0.jpg'
        }, {
          id: 2,
          imgSrc: 'http://www.taoyu58.com/Uploads/Picture/2017-09-08/59b237e98a3d7.jpg'
        }, {
          id: 3,
          imgSrc: 'http://www.taoyu58.com/Uploads/Picture/2017-09-08/59b237f4a1620.jpg'
        }
      ],
      lists: [],
      hotItems: [
        { id: 1, src: '', title: 'xxx', price: '100.00' },
        { id: 1, src: '', title: 'xxx', price: '100.00' },
        { id: 1, src: '', title: 'xxx', price: '100.00' }
      ],
      loading: false,
      canLoadmore: false,
      isTabTop: false,
      showTotop: false,
      tabIndex: 0,
      tabTop: 0,
      scrollTop: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this.calcTabTop()
    })
  },
  mounted () {
    console.log('swipe:', this.$refs.swipe)
    if (this.indexStoreTab.length === 0) {
      // 这里的tab有两个，所以push两个值
      this.resetIndexStoreTab(this.tabTop)
    }

    // 根据Tab的个数来确定List数组的长度，方便后续遍历
    while (this.lists.length < TAB_NUM) {
      this.lists.push([])
    }

    this.refreshLists()
  },
  methods: {
    calcTabTop () {
      let refTab = this.$refs.tab
      this.tabTop = refTab.$el.offsetTop + refTab.$el.offsetParent.offsetTop
      this.$refs.tab.$parent.$el.onscroll = () => {
        let scrollTop = refTab.$parent.$el.scrollTop
        // 计算 tab 在当前文本流的Y轴坐标值
        if (scrollTop >= this.tabTop) {
          this.isTabTop = true
        } else {
          this.isTabTop = false
        }
      }
    },
    async refreshLists () {
      try {
        await getGoodsList({ type: 0 }).then((res) => {
          this.lists[0] = res.data
          this.lists = Object.assign({}, this.lists)
        })
      } catch (err) {
        console.log('error: ', err)
      }

      try {
        await getGoodsList({ type: 1 }).then((res) => {
          this.lists[1] = res.data
          this.lists = Object.assign({}, this.lists)
        })
      } catch (err) {

      }
    },
    async addLists () {
      this.loading = true
      this.canLoadmore = true
      try {
        await getGoodsList({type: this.tabIndex}).then((res) => {
          if (res.data.length === 0) {
            this.canLoadmore = false
          } else {
            this.lists[this.tabIndex] = this.lists[this.tabIndex].concat(res.data)
            this.loading = false
          }
        })
      } catch (err) {
        this.canLoadmore = false
      }
    },
    resetIndexStoreTab (tabTop) {
      for (let i = 0; i < TAB_NUM; ++i) {
        this.indexStoreTab.push('tabTop', this.tabTop)
      }
    },
    async loadTop (loadmore) {
      await this.refreshLists()
      loadmore.onTopLoaded()
    },
    loadMore () {
      this.addLists()
    },
    onItemClick (index) {
    },
    toGoodsDetail (id) {
      this.$router.push({ path: `/store/detail?type=${this.tabIndex}&id=${id}` })
    },
    toTop () {
      this.scrollTop = this.$refs.main.getScrollTop()
      if (this.scrollTop < 1) {
        return
      }
      this.$refs.main.setScrollTop(this.scrollTop / 1.3)
      requestAnimationFrame(this.toTop)
    }
  },
  watch: {
    'tabIndex' (newValue, oldValue) {
      let curScrollTop = this.$refs.main.getScrollTop()

      this.indexStoreTab[oldValue] = curScrollTop
      if (this.tabTop < curScrollTop) {
        this.$refs.main.setScrollTop(this.indexStoreTab[newValue])
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
.store-container {
  .main {
    .hot {
      background: white;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      padding: .4rem;
      .hot-item {
        max-width: 30%;
      }
    }

    /**
    * 使用position: sticky的方式可以完成tabs标签固定的效果
    * 兼容性欠佳，但是性能很优秀，比兼容onscroll的性能好很多
    */
    .tabs {
      position: sticky;
      top: -1px;
    }
    .store-list {
      width: 100%;
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      .goods-item {
        width: 41%;
        flex: 1 41%;
        margin: 2%;
        padding: 2%;
      }
    }

    .loadmore-bottom-text {
      margin: 10px 10px 20px 10px;
      .inline-loading {
        width: 15px;
        height: 15px;
      }
    }
  }
  
  .tabs-top {
    position: fixed;
    top: 40px;
    width: 100%;
    z-index: 10;
  }

  .to-top {
    position: fixed;
    z-index: 100;
    right: 20px;
    bottom: 70px;
    background-color: rgba(240, 255, 255, .7);
    border: 2px solid $default-color;
    border-radius: 50%;
    padding: 6px 7.6px;
    .icon {
      color: $default-color;
      // font-size: 20px;
    }
  }
}
</style>
