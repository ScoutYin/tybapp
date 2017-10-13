<template>
  <div class="store-container">
    <main-layout class=""
      search
      loadmore
      @load-top="loadTop"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div slot="title">123</div>

      <mt-swipe :auto="0" :show-indicators="true" ref="swipe" class="swipe">
        <mt-swipe-item v-for="item in items">
          <img :src="item.imgSrc" alt="" style="width: 100%;">
        </mt-swipe-item>
      </mt-swipe>

      <div class="hot">
        <div v-for="item in hotItems" class="hot-item">
          {{ item }}
        </div>
      </div>

      <tab class="tabs" :line-width="2" custom-bar-width="60px" ref="tab">
        <tab-item selected @on-item-click="onItemClick(0)">渔货</tab-item>
        <tab-item @on-item-click="onItemClick(1)">渔船</tab-item>
      </tab>

      <div class="store-list" ref="list" v-if="tabIndex === 0">
        <div v-for="item in list">{{ item }}</div>
      </div>
      <div class="store-list" ref="list" v-else>
        <div v-for="item in list">{{ item }} 22222</div>
      </div>

    </main-layout>
    <tab class="tabs-top" :line-width="2" custom-bar-width="60px" v-show="isTabTop">
      <tab-item selected @on-item-click="onItemClick">渔货</tab-item>
      <tab-item @on-item-click="onItemClick">渔船</tab-item>
    </tab>
  </div>

</template>

<script>
import MainLayout from 'components/layout/mainLayout'
import { Tab, TabItem } from 'vux'
export default {
  name: '',
  components: {
    MainLayout,
    Tab,
    TabItem
  },
  data () {
    return {
      items: [
        {
          id: 1,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237dd62df0.jpg'
        }, {
          id: 2,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237e98a3d7.jpg'
        }, {
          id: 3,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237f4a1620.jpg'
        }
      ],
      list: [],
      hotItems: [
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 },
        { id: 1 }
      ],
      loading: false,
      isTabTop: false,
      tabIndex: 0
    }
  },
  mounted () {
    this.createLists()

    console.log(this)
    this.$refs.tab.$parent.$el.onscroll = () => {
      let refTab = this.$refs.tab
      let scrollTop = refTab.$parent.$el.scrollTop
      // 计算 tab 在当前文本流的Y轴坐标值
      let tabTop = refTab.$el.offsetTop + refTab.$el.offsetParent.offsetTop
      if (scrollTop >= tabTop) {
        this.isTabTop = true
      } else {
        this.isTabTop = false
      }
    }
  },
  methods: {
    createLists () {
      this.list = []
      for (let i = 0; i < 50; ++i) {
        this.list.push({id: i, title: `title ${i}`})
      }
    },
    addLists () {
      for (let i = 0; i < 10; ++i) {
        let index = this.list.length + i
        this.list.push({id: index, title: `title ${index}`})
      }
    },
    loadTop (loadmore) {
      setTimeout(() => {
        this.createLists()
        loadmore.onTopLoaded()
      }, 1000)
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.addLists()
        this.loading = false
      }, 1000)
    },
    onItemClick (index) {
      this.tabIndex = index
    }
  }
}
</script>

<style lang="scss">
.store-container {
  .mint-swipe {
    height: 17.5vh;
    .mint-swipe-item {
    }
  }
  .hot {
    background: white;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      flex: 1 44%;
      margin: 3%;
    }
  }
  .store-list {
    width: 100%;
    background-color: white;
  }
  .tabs-top {
    position: fixed;
    top: 40px;
    width: 100%;
    z-index: 10;
  }
}
</style>
