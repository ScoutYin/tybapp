<template>
  <div class="open-shop-status-container">
    <div class="img-wrapper">
      <img src="http://www.taoyu58.com/Public/Home/images/mshop.png" class="img">
    </div>
    <div class="msg-wrapper" :style="{borderColor: parseInt(status) === 0 ? 'red' : 'green'}">{{ msg }}</div>
    <div class="modify-btn" @click="toModify" v-if="parseInt(status) === 0">修改资料</div>
  </div>
</template>

<script>
import { getOpenShopInfo } from 'api'
export default {
  props: {
    msg: String,
    status: [Number, String]
  },
  methods: {
    async toModify () {
      let res = await getOpenShopInfo()
      console.log('toModify', res.data)
      this.$store.commit('SET_FORMOBJ', res.data)
      this.$emit('change', 1)
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/style/var.scss";

.open-shop-status-container {
  .img-wrapper {
    display: flex;
    .img {
      width: 50%;
      height: 50%;
      margin: 30px auto 10px;
    }
  }
  .msg-wrapper {
    margin: 10px 20px;
    padding: 10px;
    border: 1px dashed red;
    line-height: 1.5;
  }
  .modify-btn {
    margin: 20px;
    padding: 10px;
    text-align: center;
    color: #fff;
    background: $default-color;
  }
}
</style>
