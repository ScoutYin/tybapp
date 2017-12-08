<template>
  <div class="l-shop-fish-item-wrapper"
       @click="toDetail(item.id)">
    <div class="image">
      <img :src="item.thumb">
    </div>
    <div class="content">
      <div class="title">
        {{item.title}}
      </div>
      <div class="bottom">
        <div class="price">
          {{item.price | lPrice}}
        </div>
        <div class="sales">
          销量：{{item.sales}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    toDetail (id) {
      this.$router.push({name: 'FishBuyDetail', query: { id: id }})
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/mixins.scss';
.l-shop-fish-item-wrapper {
  .content {
    .title {
      padding: 5px;
      @include text-overflow(2);
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .sales {
        font-size: 12px;
      }
    }
  }
}
</style>
