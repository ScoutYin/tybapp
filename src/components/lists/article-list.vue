<template>
  <div class="l-article-list">
    <div v-for="(item, index) in list"
          :key="index"
          class="item"
          @click="toDetail(item.id)">
      <aside class="aside">
        <div class="title">{{ item.title }}</div>
        <div class="others">
          <div class="copyfrom">{{ item.copyfrom }}</div>
          <div class="inputtime">{{ item.inputtime | time2Date }}</div>
        </div>
      </aside>
      <div class="thumb">
        <img :src="item.thumb" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    toDetail (id) {
      this.$router.push({name: 'ArticleDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixins.scss';

.l-article-list {
  padding: 10px;
  background: #fff;
  .item {
    padding: 5px 0;
    display: flex;
    border-bottom: 1px solid #f3f3f3;
    width: 100%;
    flex-flow: row;
    .aside {
      flex: 1;
      margin-right: 15px;
      overflow: hidden;
      .title {
        height: 40px;
        line-height: 20px;
        margin-bottom: 10px;
        font-size: 14px;
        // @include text-overflow(2);
      }
      .others {
        display: flex;
        font-size: 12px;
        color: #999;
        .copyfrom {
          max-width: calc(100% - 120px);
          overflow: hidden;
          @include text-overflow(1);
        }
        .inputtime {
          flex: 1;
          text-align: right;
        }
      }
    }
    .thumb {
      width: 80px;
      height: 60px;
    }
  }
}
</style>
