<template>
  <div class="l-list-bottom">
    <div class="loadmore-text" v-if="loading"><span>加载更多</span></div>
    <div class="loadmore-text" v-else><span>没有更多了</span></div>
  </div>
</template>

<script>
export default {
  name: 'LListBottom',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.l-list-bottom {
  position: relative;
  height: 28px;
  margin: 10px;
  .loadmore-text {
    text-align: center;
    font-size: 13px;
    display: flex;

    &>span {
      flex-grow: 1;
    }

    &::after, &::before {
      content: "";
      margin-top: 8px;
      display: inline-block;
      height: 0;
      border-top: 1px solid #cfcfcf;
      flex-grow: 5;
    }
  }
}
</style>
