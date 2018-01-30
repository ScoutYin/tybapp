<template>
  <div class="cart-goods-item-wrapper">
    <slot name="left"></slot>
    <div class="content">
      <div class="thumb">
        <img :src="thumb" />
      </div>
      <div class="text">
        <div class="title">{{title}}</div>
        <div class="desc"></div>
        <div class="bottom">
          <div class="price">
            ￥{{ price }}
          </div>
          <div class="cnt">
            ×{{ qty }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumb: String,
    title: String,
    desc: String,
    price: [Number, String],
    qty: [Number, String]
  }
}
</script>

<style lang="scss">
.cart-goods-item-wrapper {
  display: flex;
  padding: 10px;
  background: white;
  align-items: center;
  .content {
    display: flex;
    flex: 1;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  .thumb {
    width: 88px;
    height: 72px;
    min-width: 88px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    flex-grow: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .title {
      flex-grow: 2;
      margin-right: 20px;
    }
    .desc {
      flex-grow: 2;
    }
    .bottom {
      flex-grow: 1;
      display: flex;
      .price {
        flex-grow: 1;
        color: red;
      }
      .cnt {
        text-align: right;
      }
    }
  }
}
</style>
