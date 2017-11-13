<template>
  <l-main-layout class="cart-container" back loadmore>
    <div v-if="cartList.length === 0" class="cart-empty-tip">
      <l-part-line text="购物车为空"></l-part-line>
    </div>
    <div v-for="(item, index) in cartList" :key="index" class="shop-item">
      <div class="shop-title">
        <div class="left">
          {{ item.shop.shopname }}
        </div>
      </div>
      <div class="goods-list">
        <div class="goods-item" v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex">
          <div class="thumb">
            <img :src="goodsItem.picture" />
          </div>
          <div class="text">
            <div class="title">{{goodsItem.title}}</div>
            <div class="desc"></div>
            <div class="bottom">
              <div class="price">
                ￥{{ goodsItem.price }}
              </div>
              <div class="cnt">
                ×{{ goodsItem.cnt }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LPartLine from 'components/common/partLine'
import { mapGetters } from 'vuex'
export default {
  name: 'StoreCart',
  components: {
    LMainLayout,
    LPartLine
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  }
}
</script>

<style lang="scss">
.cart-container {
  .shop-item {
    margin-bottom: 10px;
    .shop-title {
      padding: 10px;
      background: white;
      border-bottom: 1px solid #eee;
    }
    .goods-list {
      .goods-item {
        display: flex;
        padding: 10px;
        background: white;
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
            flex-grow: 2
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
    }
  }
  .cart-empty-tip {
    margin: 20px 10px;
  }
}
</style>
