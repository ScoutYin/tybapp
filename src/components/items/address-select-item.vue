<template>
  <div class="address-select-wrapper">
    <l-icon icon="icon-dizhi"></l-icon>
    <div class="content">
      <div class="head">
        <div class="name">
          收货人：{{consignee }}
        </div>
        <div class="tel">
          {{ mobile }}
        </div>
      </div>
      <div class="address">
        收货地址：{{ address }}
      </div>
      <div class="tips"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    consignee: String,
    mobile: String,
    address: String
  }
}
</script>

<style lang="scss">
.address-select-wrapper {
  display: flex;
  background: #fff;
  padding: 10px;
  margin: 10px 0;
  .content {
    padding: 0 20px 0 10px;
    flex: 1;
    line-height: 1.5;
    font-size: 13px;
    .head {
      display: flex;
      justify-content: space-between;
      .name {
        flex: 1;
      }
      .tel {
        text-align: right;
      }
    }
  }
}
</style>
