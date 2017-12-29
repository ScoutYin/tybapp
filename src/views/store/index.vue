<template>
  <div class="store-container">
    <l-main-layout class="main"
      ref="main">
      <swiper :aspect-ratio="100/320" auto class="swipe" ref="swipe">
        <swiper-item class="swiper-img" style="width: 100%;" v-for="(item, index) in ad" :key="index">
          <img :src="item.thumb" width="100%" height="100%">
        </swiper-item>
      </swiper>

      <l-goods-list class="hot"></l-goods-list>
      <!-- <div class="loadmore-bottom-text">
        <l-part-line :text="canLoadmore ? '加载更多' : '没有可加载的'">
          <inline-loading slot="left" v-if="canLoadmore" class="inline-loading"></inline-loading>
        </l-part-line>
      </div> -->
    </l-main-layout>
  </div>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { Swiper, SwiperItem } from 'vux'
import { getAdvert } from 'api'
import LGoodsItem from 'components/lists/goods-item'
import LGoodsList from 'components/lists/goods-list'

export default {
  name: '',
  components: {
    LMainLayout,
    Swiper,
    SwiperItem,
    LGoodsItem,
    LGoodsList
  },
  computed: {
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
      ad: [],
      lists: []
    }
  },
  created () {

  },
  mounted () {
    this.getAd()
  },
  methods: {
    async getAd () {
      try {
        let res = await getAdvert({id: 5})
        this.ad = res.data
        console.log('ad: ', res)
      } catch (err) {
        throw err
      }
    },
    toGoodsDetail (id) {
      this.$router.push({ path: `/store/detail?type=${this.tabIndex}&id=${id}` })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
.store-container {
  .main {
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
  }
}
</style>
