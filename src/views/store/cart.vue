<template>
  <l-main-layout class="cart-container" back loadmore>
    <div v-if="cartList.length === 0" class="cart-empty-tip">
      <l-part-line text="购物车为空"></l-part-line>
    </div>
    <template v-else>
      <div slot="header-right" @click="toEdit()">{{isEdit ? '完成' : '编辑'}}</div>
      <div class="edit-bar" v-if="isEdit">
        <span>请勾选你要操作的商品</span>
        <div class="delete" @click="deleteProduct">删除</div>
      </div>
      <div class="shop-item-container" :class="{'has-edit': isEdit}">
        <div v-for="(item, index) in cartList" :key="index" class="shop-item">
          <div class="shop-title">
            <l-checkbox :id="item.shopid"
              :checked="item.checked"
              @change="onChangeShop($event, index)">
            </l-checkbox>
            <div class="left" @click="toShop(item.shopid)">
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
              <l-checkbox slot="left"
                          :id="goodsItem.cartid"
                          :checked="goodsItem.checked"
                          @change="onChangeProduct($event, index, goodsIndex)">
              </l-checkbox>
            </l-cart-goods-item>
          </div>
        </div>
      </div>
      <div class="cart-bottom">
        <l-checkbox id="all"
          :checked="selectAll.checked"
          @change="onChangeAll($event)"
          class="select-all">
          <template slot="right-text">全选</template>
        </l-checkbox>
        
        <div class="total">
          <span>合计：</span>
          <span class="price">￥{{ totalChoosePrice }}</span>
        </div>
        <div class="btn" @click="toConfirmOrder">
          <span>{{ `结算(${totalCnt})` }}</span>
        </div>
      </div>
    </template>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LCartGoodsItem from 'components/items/cart-goods-item'
import LPartLine from 'components/common/part-line'
import { getCartList, deleteCartItems } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'StoreCart',
  components: {
    LMainLayout,
    LPartLine,
    LCartGoodsItem
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
          total += (parseInt(item.checked ? item.price * 100 : 0) * item.qty / 100)
        }
      }

      return total.toFixed(2)
    },
    totalCnt () {
      let cnt = 0
      for (let index = 0; index < this.cartList.length; ++index) {
        let _product = this.cartList[index]._product
        for (let item of _product) {
          if (item.checked) {
            ++cnt
          }
        }
      }
      return cnt
    },
    checkedIds () {
      let arr = []
      for (const shopItem of this.cartList) {
        for (const productItem of shopItem._product) {
          if (productItem.checked) {
            arr.push(productItem.cartid)
          }
        }
      }
      return arr
    },
    ...mapGetters([
      'cartList'
    ])
  },
  data () {
    return {
      selectAll: { checked: false },
      isEdit: false
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    async getCartList () {
      try {
        let res = await getCartList()
        if ('list' in res.data) {
          this.$store.commit('SET_CART_LIST', res.data.list)
        }
      } catch (err) {
        console.error(err.message)
      }
    },
    toShop (shopid) {
      this.$router.push({name: 'ShopIndex', query: { shopid }})
    },
    onChangeAll (value) {
      this.checkedAll = value
      for (const index in this.cartList) {
        this.onChangeShop(value, index)
      }
    },
    onChangeShop (value, index) {
      this.cartList[index].checked = value
      for (const productIndex in this.cartList[index]._product) {
        this.onChangeProduct(value, index, productIndex)
      }
      this.changeParent(this.selectAll, this.cartList)
    },
    onChangeProduct (value, index, productIndex) {
      let shopItem = this.cartList[index]
      let productItem = shopItem._product[productIndex]

      productItem.checked = value
      this.$set(shopItem._product, productIndex, productItem)

      this.changeParent(this.cartList[index], shopItem._product)
    },
    changeParent (parent, data) {
      let checkedCnt = 0
      for (let item of data) {
        checkedCnt += item.checked ? 1 : 0
      }

      checkedCnt === 0 && (parent.checked = false)
      checkedCnt === data.length && (parent.checked = true)
    },
    toEdit () {
      console.log('edit!')
      this.isEdit = !this.isEdit
    },
    async deleteProduct () {
      const deleteIds = this.checkedIds

      if (deleteIds.length === 0) {
        return
      }

      let res = await deleteCartItems({id: deleteIds})
      this.getCartList()
      console.log('deleteIds:', deleteIds, res)
    },
    async toConfirmOrder () {
      if (this.totalCnt === 0) {
        this.$vux.toast.text('请选择商品', 'middle')
        return
      }
      // const confirmIds = this.checkedIds
      this.$router.push({name: 'ConfirmCart'})
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.cart-container {
  .edit-bar {
    position: fixed;
    height: 40px;
    left: 0;
    right: 0;
    background: #fff;
    margin-bottom: 10px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .delete {
      border: 1px solid $default-color;
      color: $default-color;
      padding: 4px 12px;
      border-radius: 12px;
    }
  }
  .shop-item-container {
    &.has-edit {
      margin-top: 50px;
    }
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
      background: $default-color;
      background: -webkit-gradien(left, #46c2ff, $default-color);
      background: linear-gradient(left, #46c2ff, $default-color);
      color: #fff;
    }
  }
}
</style>
