<template>
  <l-main-layout class="confirm-cart-container" back>
    <l-address-select-item
      :consignee="address.consignee"
      :mobile="address.mobile || address.phone"
      :address="address.address"
      @click.native="toAddressList"
      v-is-link>
    </l-address-select-item>
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
                             :qty="goodsItem.qty">
          </l-cart-goods-item>
        </div>
      </div>
    </div>
    <div class="cart-bottom">
        <div class="total">
          <span>合计：</span>
          <span class="price">￥{{ totalPrice }}</span>
        </div>
        <div class="btn" @click="confirm">
          <span>确认订单</span>
        </div>
      </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LCartGoodsItem from 'components/items/cart-goods-item'
import LAddressSelectItem from 'components/items/address-select-item'
import { getDefaultAddress, createCart } from 'api'
import { mapGetters } from 'vuex'
export default {
  components: {
    LMainLayout,
    LCartGoodsItem,
    LAddressSelectItem
  },
  computed: {
    cartList () {
      let list = this.$store.getters.cartList
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
    },
    totalPrice () {
      let total = 0
      for (let item of this.cartList) {
        for (let productItem of item._product) {
          total += (parseInt(productItem.price * 100) * productItem.qty / 100)
        }
      }
      return total.toFixed(2)
    },
    ...mapGetters([
      'address'
    ]),
    checkedIds () {
      let arr = []
      for (const shopItem of this.cartList) {
        for (const productItem of shopItem._product) {
          arr.push(productItem.cartid)
        }
      }
      return arr
    }
  },
  data () {
    return {
      addr: {}
    }
  },
  created () {
    this.getDefaultAddress()
  },
  methods: {
    async getDefaultAddress () {
      let res = await getDefaultAddress()
      this.$store.commit('SET_ADDRESS', res.data)
    },
    toAddressList () {
      this.$router.push({name: 'AddressList'})
    },
    async confirm () {
      let params = {
        id: this.checkedIds,
        address_id: this.address.id
      }
      let res = await createCart(params)
      this.$vux.toast.text('订单提交成功！', 'middle')
      this.$router.push({name: 'Mine'})
      console.log('createCart: ', res.data)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';
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
    }
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
