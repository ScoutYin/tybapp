<template>
  <l-main-layout back class="article-list-container">
    <l-pulldown-refresh :top-load-method="initData"
                        ref="topLoad"
                        class="article-list">
      <l-article-list :list="list"></l-article-list>
    </l-pulldown-refresh>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPulldownRefresh from 'components/pulldown-refresh'
import LArticleList from 'components/lists/article-list'
import listMixin from '@/mixins/list'
import { getArticleList } from 'api'
export default {
  name: 'ArticleList',
  components: {
    LMainLayout,
    LArticleList,
    LPulldownRefresh
  },
  mixins: [listMixin],
  mounted () {
    this.init(getArticleList)
    this.initData()
  },
  methods: {
    initData () {
      this.maxId = 0
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
