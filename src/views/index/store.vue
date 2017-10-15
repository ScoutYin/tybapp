<template>
  <div class="store-container">
    <main-layout class=""
      search
      loadmore
      @load-top="loadTop"
      ref="main">
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

      <tab class="tabs" :line-width="2" custom-bar-width="60px" ref="tab" v-model="tabIndex">
        <tab-item  @on-item-click="onItemClick">渔货</tab-item>
        <tab-item  @on-item-click="onItemClick">渔船</tab-item>
      </tab>

      <div class="store-list" ref="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-for="item in lists[tabIndex]">{{ item }} {{ tabIndex }}</div>
      </div>

    </main-layout>
    <tab class="tabs-top" :line-width="2" custom-bar-width="60px" v-show="isTabTop" v-model="tabIndex">
      <tab-item @on-item-click="onItemClick">渔货</tab-item>
      <tab-item @on-item-click="onItemClick">渔船</tab-item>
    </tab>
  </div>

</template>

<script>
import MainLayout from 'components/layout/mainLayout'
import { Tab, TabItem } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    MainLayout,
    Tab,
    TabItem
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
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237dd62df0.jpg'
        }, {
          id: 2,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237e98a3d7.jpg'
        }, {
          id: 3,
          imgSrc: 'http://tyb.allship.cn/Uploads/Picture/2017-09-08/59b237f4a1620.jpg'
        }
      ],
      lists: [[], []],
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
      tabIndex: 0,
      tabTop: 0
    }
  },
  mounted () {
    this.createLists()

    console.log(this)
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

    if (this.indexStoreTab.length === 0) {
      // 这里的tab有两个，所以push两个值
      for (let i = 0; i < this.lists.length; ++i) {
        this.indexStoreTab.push(this.tabTop)
      }
    }
    console.log('lists: ', this.lists)
  },
  methods: {
    createLists () {
      for (let i = 0; i < this.lists.length; ++i) {
        this.lists[i] = []
        for (let j = 0; j < 50; ++j) {
          this.lists[i].push({id: j, title: `title ${j}`})
        }
      }
      this.lists = Object.assign({}, this.lists)
    },
    addLists () {
      let length = this.lists[this.tabIndex].length
      for (let i = 0; i < 10; ++i) {
        let id = length + i
        this.lists[this.tabIndex].push({id: id, title: `title ${id}`})
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
      }, 2000)
    },
    onItemClick (index) {

    }
  },
  watch: {
    'tabIndex' (newValue, oldValue) {
      let curScrollTop = this.$refs.main.getScrollTop()

      if (this.tabTop < curScrollTop) {
        this.indexStoreTab[oldValue] = curScrollTop
        this.$refs.main.setScrollTop(this.indexStoreTab[newValue])
      } else {

      }
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
    // overflow: scroll;
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
