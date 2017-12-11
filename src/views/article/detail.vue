<template>
  <l-main-layout class="article-detail" back>
    <section class="section">
      <div class="title">{{ detailData.title }}</div>
      <div class="bottom">
        <div class="views">阅读量：{{ detailData.views }}</div>
        <div class="inputtime">{{ detailData.inputtime | time2Date }}</div>
      </div>
    </section>
    <section class="section">
      <div class="content" v-html="parseHTML(articleData.content)"></div>
    </section>
  </l-main-layout>
</template>

<script>
import LDetailLayout from 'components/layout/detail-layout'
import LMainLayout from 'components/layout/main-layout'
import { getArticleDetail } from 'api'
export default {
  components: {
    LDetailLayout,
    LMainLayout
  },
  data () {
    return {
      thumbs: [],
      detailData: {},
      articleData: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      try {
        let id = this.$route.query.id
        let res = await getArticleDetail({id: id})
        if (res.data) {
          this.detailData = res.data
          this.articleData = this.detailData.ArticleData
        }
        console.log(this.detailData)
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style lang="scss">
.article-detail {
  .section {
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      padding-bottom: 10px;
      color: #111;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
