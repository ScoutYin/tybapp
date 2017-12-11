<template>
  <div class="l-order-item-wrapper">
    <div class="top">
      <l-icon icon="icon-dingdan"></l-icon>
      <div class="no">
        {{ item.order_sn }}
      </div>
      <div class="time">
        {{ item.create_time | time2Date}}
      </div>
    </div>
    <div class="main-content">
      <div class="item"
           v-for="(goodsItem, index) in item.OrderData"
           :key="index">
        <div class="image">
          <img v-if="goodsItem.thumb" :src="goodsItem.thumb" alt="">
        </div>
        <div class="content">
          <div class="title">{{goodsItem.data_title}}</div>
        </div>
        <div class="right">
          <div class="price">{{goodsItem.data_price | lPrice}}</div>
          <div class="cnt price">×{{goodsItem.data_num}}</div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="left">
        共{{item.total_num}}件商品 合计：
        <span style="font-size: 14px" class="price">{{item.order_amount | lPrice}}</span>
        （含运费¥{{item.shipping_price}}）</div>
      <!-- <div class="status">待付款</div> -->
    </div>
    <div class="addr-content">
      <l-icon class="icon" icon="icon-zuobiao"></l-icon>
      <div class="content">
        <div class="top">
          <div class="consignee">收件人：{{item.consignee}}</div>
          <div class="phone">{{item.phone}}</div>
        </div>
        <div class="addr">
          收货地址：{{item.address_name}} {{item.address}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getCommonThumb } from 'api'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    thumbIds () {
      if (!this.item || !this.item.OrderData) {
        return ''
      }
      let thumbStr = ''
      for (let i = 0; i < this.item.OrderData; ++i) {
        let thumbId = this.item.OrderData[i]
        thumbStr = thumbStr + thumbId + ','
      }
      return thumbStr.slice(0, -1)
    }
  },
  created () {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="scss">
.l-order-item-wrapper {
  background-color: #fff;
  &>.top {
    display: flex;
    padding: 10px;
    .no {
      margin-left: 10px;
    }
    .time {
      flex-grow: 1;
      margin-left: 10px;
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .item {
      background-color: #f3f3f3;
      display: flex;
      padding: 10px;
      margin-bottom: 5px;
      .image {
      width: 80px;
      height: 80px;
      min-width: 80px;
      // border: 1px solid #aaa;
      }
      .content {
        flex-grow: 1;
        margin: 0 10px;
      }
      .right {
        width: 80px;
        min-width: 80px;
        text-align: right;
        color: red;
      }
    }
  }
  .total {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .left {
      flex-grow: 1;
    }
  }
  .addr-content {
    display: flex;
    padding: 10px;
    font-size: 14px;
    .icon {
      font-size: 20px;
      margin: auto 5px;
    }
    .content {
      flex-grow: 1;
      .top {
        display: flex;
        padding: 5px 0;
        .consignee {
          flex-grow: 1;
        }
        .phone {
          text-align: right;
        }
      }
    }
  }
}
</style>
