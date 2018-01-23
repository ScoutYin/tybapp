<template>
  <l-main-layout class="cart-container" back loadmore>
    <div v-if="cartList.length === 0" class="cart-empty-tip">
      <l-part-line text="购物车为空"></l-part-line>
    </div>
    <div class="shop-item-container">
      <div v-for="(item, index) in cartList" :key="index" class="shop-item">
        <div class="shop-title" @click="toShop(item.shopid)">
          <div class="left">
            <l-icon icon="icon-dianpu"></l-icon>
            <span class="shopname">{{ item.shopname }}</span>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-item" v-for="(goodsItem, goodsIndex) in item._product" :key="goodsIndex">
            <div class="thumb">
              <img :src="goodsItem.thumb" />
            </div>
            <div class="text">
              <div class="title">{{goodsItem.title}}</div>
              <div class="desc"></div>
              <div class="bottom">
                <div class="price">
                  ￥{{ goodsItem.price }}
                </div>
                <div class="cnt">
                  ×{{ goodsItem.qty }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-bottom">
      <div>全选</div>
      <div class="total">
        合计：
      </div>
      <div class="btn">
        结算(0)
      </div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPartLine from 'components/common/part-line'
// import { mapGetters } from 'vuex'
import { getCartList } from 'api'

export default {
  name: 'StoreCart',
  components: {
    LMainLayout,
    LPartLine
  },
  computed: {
    // ...mapGetters([
    //   'cartList'
    // ])
  },
  data () {
    return {
      cartList: []
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    async getCartList () {
      try {
        let res = await getCartList()
        console.log('getCartList: 111111', res)
        if ('list' in res.data) {
          this.cartList = res.data.list
        }
      } catch (err) {
        console.error(err.message)
      }
    },
    toShop (shopid) {
      this.$router.push({name: 'ShopIndex', query: { shopid }})
    }
  }
}
</script>

<style lang="scss">
.cart-container {
  .shop-item-container {
    margin-bottom: 50px;
    .shop-item {
      margin-bottom: 10px;
      .shop-title {
        padding: 10px;
        background: white;
        border-bottom: 1px solid #eee;
        .left {
          display: flex;
          .shopname {
            margin-left: 5px;
          }
        }
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
      }
    }
  }
  .cart-empty-tip {
    margin: 20px 10px;
  }
  .cart-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 40px;
    border-top: 1px solid #eee;
    background: white;
    .total {
      flex: 1;
      text-align: right;
    }
    .btn {
      width: 100px;
      // background-color
    }
  }
}
</style>
