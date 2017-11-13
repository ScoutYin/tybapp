<template>
  <div class="l-order-item">
    <div class="item-header">
      <div class="shop-name">
        <label>{{item.shopName}}</label>
      </div>
      <div :class="['pay-status', `pay-status-${item.status}`]">
        <label>{{ payStatus.title }}</label>
      </div>
    </div>
    <div class="item-content">
      <div class="item-goods-list">
        <div class="goods-item" v-for="(goodsItem, index) in item.goods" :key="index">
          <div class="thumb">
            <img :src="goodsItem.thumb" />
          </div>
          <div class="content">
            <div class="title">
              <label>{{goodsItem.title}}</label>
            </div>
            <div class="remark">
              <label>{{goodsItem.remark}}</label>
            </div>
          </div>
          <div class="price">
            <div class="sale-price">￥{{goodsItem.salePrice}}</div>
            <div class="pre-sale-price">￥{{goodsItem.preSalePrice}}</div>
          </div>
        </div>
        <div class="total">
          {{`共 ${item.goods.length} 件商品 合计:`}}
          <span class="total-price">{{`￥${item.totalPrice}`}}</span>
          {{`(含运费￥${item.freight })`}}</div>
      </div>
    </div>
    <div class="item-bottom"></div>
  </div>
</template>

<script>
const PAY_STATUS = {
  0: {
    title: '付款成功'
  },
  1: {
    title: '未付款'
  },
  2: {
    title: '取消订单'
  }
}
export default {
  name: 'LOrderItem',
  props: {
    item: Object
  },
  computed: {
    payStatus () {
      return PAY_STATUS[this.item.status]
    },
    payStatusClass () {
      return `pay-status-${this.item.status}`
    }
  }
}
</script>

<style lang="scss">、
.l-order-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #bbb;
  background: white;
  font-size: 14px;
  .item-header {
    display: flex;
    height: 20px;
    align-items: center;
    .shop-name {
      text-align: left;
      flex-grow: 1;
    }
    .pay-status {
      text-align: right;
      color: 13px;
      &.pay-status-0 {
        color: green;
      }
      &.pay-status-1 {
        color: red;
      }
      &.pay-status-2 {
        color: #777;
      }
    }
  }
  .item-content {
    flex-grow: 1;
    .item-goods-list {
      .goods-item {
        display: flex;
        padding: 10px 0;
        .thumb {
          width: 80px;
          height: 80px;
          border: 1px solid #eee;
        }
        .content {
          flex-grow: 1;
          margin: 0 10px;
          .title {
            line-height: 1.75;
          }
          .remark {
            font-size: 12px;
            color: #777;
          }
        }
        .price {
          line-height: 1.5;
          .sale-price {
            color: red;
          }
          .pre-sale-price {
            text-decoration: line-through;
            color: #777;
          }
        }
      }
      .total {
        text-align: right;
        font-size: 12px;
        .total-price {
          font-size: 16px;
          color: red;
        }
      }
    }
  }
}
</style>
