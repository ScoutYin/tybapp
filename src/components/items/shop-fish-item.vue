<template>
  <div class="l-shop-fish-item-wrapper">
    <div class="image">
      <img :src="thumb">
    </div>
    <div class="content">
      <div class="title">
        {{title}}
      </div>
      <div class="bottom">
        <div class="price" v-if="price">
          {{price | lPrice}}
        </div>
        <div class="sales" v-if="sales">
          销量：{{sales}}
        </div>
      </div>
    </div>
    <div class="is-edit" v-if="isEdit">123</div>
  </div>
</template>

<script>
export default {
  props: {
    // item: Object
    title: String,
    price: [String, Number],
    sales: String,
    thumb: String,
    isEdit: Boolean
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
  position: relative;
  .content {
    .title {
      margin: 5px 0;
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
  .is-edit {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
