<template>
  <l-main-layout back class="article-list-container">
    <l-pulldown-refresh :top-load-method="initData"
                        ref="topLoad"
                        class="article-list">
      <l-article-list :list="list"
                      v-infinite-scroll="loadMore"
                      infinite-scroll-disabled="loading"
                      infinite-scroll-distance="100"
                      class="list"></l-article-list>
      <l-part-line v-if="loading && list.length !== 0 " text="没有更多"></l-part-line>
    </l-pulldown-refresh>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPulldownRefresh from 'components/pulldown-refresh'
import LArticleList from 'components/lists/article-list'
import listMixin from '@/mixins/list'
import LPartLine from 'components/common/part-line'
import { getArticleList } from 'api'
export default {
  name: 'ArticleList',
  components: {
    LMainLayout,
    LArticleList,
    LPulldownRefresh,
    LPartLine
  },
  mixins: [listMixin],
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.maxId = 0
      this.init(getArticleList)
      this.getList()
    },
    async getList () {
      try {
        await this.loadData()
        console.log(this.list)
        this.$refs['topLoad'].onTopLoaded()
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
.article-list-container {
  .article-list {
    background: #fff;
  }
}
</style>
