<template>
  <l-main-layout class="confirm-cart-container" back>
    <!-- <address></address> -->
    <div class="shop-item-container">
      <div v-for="(item, index) in cartList" :key="index" class="shop-item">
        <div class="shop-title">
          <div class="left">
            <l-icon icon="icon-dianpu"></l-icon>
            <span class="shopname">{{ item.shopname }}</span>
          </div>
        </div>
        <div class="goods-list">
          <l-cart-goods-item v-for="(goodsItem, goodsIndex) in item._product"
                             :key="goodsIndex"
                             :thumb="goodsItem.thumb"
                             :title="goodsItem.title"
                             :price="goodsItem.price"
                             :qty="goodsItem.qty"></l-cart-goods-item>
        </div>
      </div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LCartGoodsItem from 'components/items/cart-goods-item'
export default {
  components: {
    LMainLayout,
    LCartGoodsItem
  },
  computed: {
    cartList () {
      let list = this.$store.getters.getCartList
      let result = []
      // 先进行一次深拷贝
      for (let i = 0; i < list.length; ++i) {
        let item = list[i]
        if (item instanceof Object) {
          result.push({})
          Object.keys(item).forEach((value, index) => {
            if (value !== '_product') {
              result[i][value] = item[value]
            } else {
              result[i][value] = item[value].slice(0)
            }
          })
        }
      }
      result = result.filter((value) => {
        let cnt = 0
        if (value instanceof Object &&
            '_product' in value &&
            value._product instanceof Array) {
          value._product = value._product.filter((productItem) => {
            if (productItem.checked) {
              ++cnt
              return true
            }
            return false
          })
        }
        return cnt > 0
      })

      return result
    }
  }
}
</script>

<style lang="scss">
.confirm-cart-container {
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
}
</style>
