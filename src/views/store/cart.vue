<template>
  <l-main-layout class="cart-container" back loadmore>
    <div v-if="cartList.length === 0" class="cart-empty-tip">
      <l-part-line text="购物车为空"></l-part-line>
    </div>
    <div class="shop-item-container">
      <div v-for="(item, index) in cartList" :key="index" class="shop-item">
        <div class="shop-title">
          <l-checkbox :id="item.shopid"
            :checked="item.checked"
            @change="onChangeAll($event, index)">
          </l-checkbox>
          <div class="left" @click="toShop(item.shopid)">
            <l-icon icon="icon-dianpu"></l-icon>
            <span class="shopname">{{ item.shopname }}</span>
          </div>
        </div>
        <div class="goods-list">
          <div class="goods-item" v-for="(goodsItem, goodsIndex) in item._product" :key="goodsIndex">
            <l-checkbox :id="goodsItem.cartid"
              :checked="goodsItem.checked"
              @change="onChange($event, goodsIndex, item)">
            </l-checkbox>
            <div class="content">
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
    </div>
    <div class="cart-bottom">
      <l-checkbox id="all"
        @change="onChangeAll()">
      </l-checkbox>
      <div class="select-all">
        <span>全选</span>
      </div>
      <div class="total">
        <span>合计：</span>
        <span class="price">￥{{ totalChoosePrice }}</span>
      </div>
      <div class="btn">
        <span>结算(0)</span>
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
    totalChoosePrice () {
      if (this.cartList.length === 0) {
        return 0
      }

      let total = 0
      for (let index = 0; index < this.cartList.length; ++index) {
        let _product = this.cartList[index]._product
        for (let item of _product) {
          total += parseInt(item.checked ? item.price : 0)
        }
      }

      return total
    }
  },
  data () {
    return {
      cartList: [],
      checked: {}
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
    },
    onChangeAll (value, index) {
      this.cartList[index].checked = value
      for (let productIndex in this.cartList[index]._product) {
        let item = this.cartList[index]._product[productIndex]
        item.checked = value
        this.$set(this.cartList[index]._product, productIndex, item)
      }
      console.log(this.cartList[index])
    },
    onChange (value, index, shop) {
      let product = shop._product
      let item = product[index]
      item.checked = value
      this.$set(product, index, item)

      let checkedCnt = 0
      for (let productItem of product) {
        checkedCnt += productItem.checked ? 1 : 0
      }

      if (checkedCnt === 0) {
        shop.checked = false
      }

      if (checkedCnt === product.length) {
        shop.checked = true
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.cart-container {
  .shop-item-container {
    margin-bottom: 50px;
    .shop-item {
      margin-bottom: 10px;
      .shop-title {
        padding: 10px;
        background: white;
        border-bottom: 1px solid #eee;
        display: flex;
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
    padding-left: 10px;
    .select-all {
      // margin-left: 10px;
    }
    .total {
      flex: 1;
      text-align: right;
      margin-right: 10px;
    }
    .btn {
      display: inline-block;
      line-height: 40px;
      width: 100px;
      text-align: center;
      background: linear-gradient(left, #46c2ff, $default-color);
      color: #fff;
    }
  }
}
</style>
