<template>
  <l-main-layout class="home-container" title="淘鱼宝">
    <swiper :aspect-ratio="100/320" auto class="swipe" ref="swipe">
      <swiper-item class="swiper-img" style="width: 100%;" v-for="(item, index) in items" :key="index">
        <img :src="item.imgSrc" width="100%" height="100%">
      </swiper-item>
    </swiper>
    <div class="grid-layout">
      <div class="grid-item" v-for="(item, index) in gridDatas" :key="index" @click="toPath(item.path)">
        <l-icon :icon="item.icon"></l-icon>
        <div>{{ item.title }}</div>
      </div>
    </div>

    <div class="section dynamic-banner" v-is-link>
      <div class="left-title">
        交易动态
      </div>
      <div class="right-content">
        <div class="item"
              v-for="(item, index) in dynamicData"
              :key="index">
          {{`${item.buyer}和${item.seller}成交`}}
          <span class="update-time">{{item.updateTime}}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="title">渔获指数</div>
    </div>
    <div class="section">
      <div class="title">渔获销冠</div>
      <l-fish-recommend-list :list="fishRecommend"></l-fish-recommend-list>
    </div>
    <div class="section">
      <div class="title">渔船推荐</div>
      <l-ship-recommend-list :list="shipRecommend"></l-ship-recommend-list>
    </div>
    <div class="section">
      <div class="title">政策资讯</div>
      <l-article-list :list="articleList" class="article-list"></l-article-list>
      <div class="more" @click="toArticleList">更多资讯</div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LButton from 'components/common/button'
import LShipRecommendList from 'components/lists/ship-recommend-list'
import LArticleList from 'components/lists/article-list'
import LFishRecommendList from 'components/lists/fish-recommend-list'
import { Swiper, SwiperItem } from 'vux'
import LCell from 'components/common/cell'
import { getArticleList, getFishExponent, getShipRecommend, getTaglib } from 'api'
export default {
  name: '',
  components: {
    LMainLayout,
    LButton,
    Swiper,
    SwiperItem,
    LCell,
    LShipRecommendList,
    LFishRecommendList,
    LArticleList
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
      gridDatas: [
        { title: '我要买船', icon: 'icon-chuan', path: '/ship/buy-list' },
        { title: '我要买鱼', icon: 'icon-buyfish', path: '/fish/buy-list' },
        { title: '我要招人', icon: 'icon-zhaoping', path: '/recruitment/recruiting' },
        { title: '我要卖船', icon: 'icon-chuanbojiaoyi', path: '/ship/sell-list' },
        { title: '我要卖鱼', icon: 'icon-sellfish', path: '/fish/sell-list' },
        { title: '我要求职', icon: 'icon-qiuzhi', path: '/recruitment/jobHunting' }
      ],
      dynamicData: [
        { buyer: '12312341234', seller: '13533233323', updateTime: '4小时前' },
        { buyer: '13555555555', seller: '13512344321', updateTime: '5小时前' }
      ],
      exponents: [],
      articleList: [],
      shipRecommend: [],
      fishRecommend: [],
      show: false
    }
  },
  mounted () {
    this.getExponents()
    this.getArticles()
    this.getShip()
    this.getFish()
  },
  methods: {
    toPath (path) {
      if (path) {
        this.$router.push({ path: path })
      }
    },
    topLoad () {
      console.log('topLoad.')
      this.flag = false
      setTimeout(() => {
        this.$refs.topLoad.onTopLoaded()
      }, 1000)
    },
    clicked () {
      console.log('clicked.')
      this.show = true
    },
    async getExponents () {
      try {
        let res = await getFishExponent({limit: 3})
        this.exponents = res.data
        console.log('exponent: ', res.data)
      } catch (err) {
        throw err
      }
    },
    async getArticles () {
      try {
        let res = await getArticleList({limit: 5})
        this.articleList = res.data
        console.log(res.data)
      } catch (err) {
        throw err
      }
    },
    async getFish () {
      try {
        let res = await getTaglib({modelid: 9, limit: 2, sort: 'sales'})
        this.fishRecommend = res.data
        console.log('getFish: ', res.data)
      } catch (err) {
        throw err
      }
    },
    async getShip () {
      try {
        let res = await getShipRecommend()
        this.shipRecommend = res.data
        console.log('getShip: ', res.data)
      } catch (err) {
        throw err
      }
    },
    toArticleList () {
      this.$router.push({name: 'ArticleList'})
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.home-container {
  color: #666;
  .grid-layout {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    .grid-item {
      flex: 0 0 33.3%;
      padding: 25px;
      font-size: 14px;
      border-style: solid;
      border-color: #eee;
      border-width: 0;

      &:nth-child(1) {
        border-right-width: 1px;
        border-bottom-width: 1px;
        .icon {
          color: #D8615B;
        }
      }
      &:nth-child(2) {
        border-right-width: 1px;
        border-bottom-width: 1px;
        .icon {
          color: #9BB45F;
        }
      }
      &:nth-child(3) {
        border-bottom-width: 1px;
        .icon {
          color: #71C3BE;
        }
      }
      &:nth-child(4) {
        border-right-width: 1px;
        .icon {
          color: #75B17C;
        }
      }
      &:nth-child(5) {
        border-right-width: 1px;
        .icon {
          color: #427FB5;
        }
      }
      &:nth-child(6) {
        .icon {
          color: #E8D658;
        }
      }
      .icon {
        font-size: 30px;
      }
    }
  }
  .dynamic-banner {
    // position: relative;
    display: flex;
    .left-title {
      font-size: 18px;
      width: 40px;
      color: $default-color;
    }
    .right-content {
      margin-left: 10px;
      .item {
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
  .section {
    background: #fff;
    padding: 10px;
    margin-bottom: 20px;
    &>.title {
      text-align: center;
      font-size: 16px;
      color: #111;
    }
    .more {
      text-align: right;
      color: #999;
    }
    .article-list {
      margin: 0 -10px;
    }
  }
}
</style>
