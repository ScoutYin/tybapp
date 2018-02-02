<template>
  <div class="open-show-view-container">
    <l-publish-form :formDatas="formDatas"
      class="publish-form-content"></l-publish-form>
    <div class="commit-btn" @click="commit">提交申请</div>
  </div>
</template>

<script>
import LPublishForm from 'components/publish/form'
import { createMap } from '@/utils/common'
import LButtonCommit from 'components/unit/button-commit'
import { applyOpenShop } from 'api'
export default {
  components: {
    LPublishForm,
    LButtonCommit
  },
  data () {
    return {
      formDatas: createMap({
        'shopname': {
          label: '店铺名称',
          type: 'input',
          required: true
        },
        'shoptype': {
          label: '类型',
          type: 'select',
          selectType: 'SHOP_TYPE',
          required: true
        },
        'idcard_front': {
          label: '身份证正面照',
          type: 'picture',
          required: true
        },
        'idcard_back': {
          label: '身份证背面照',
          type: 'picture',
          required: true
        },
        'idcard_hand': {
          label: '手持身份证照',
          type: 'picture',
          required: true
        },
        'linkman': {
          label: '联系人',
          type: 'input',
          required: true
        },
        'phone': {
          label: '联系电话',
          type: 'input',
          required: true
        },
        'area': {
          label: '所在地',
          type: 'select-city',
          required: true
        },
        'address': {
          label: '详细地址',
          type: 'input'
        },
        'introduce': {
          label: '店铺介绍',
          type: 'textarea',
          required: true
        }
      })
    }
  },
  methods: {
    async commit () {
      let formObj = this.$store.getters.formObj
      console.log(formObj)
      await applyOpenShop(formObj)
      // this.$emit('changeStatus', res.data.status)
      this.$emit('change', 2)
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/style/var.scss";
.open-show-view-container {
  .publish-form-content {
    padding: 10px;
    margin-bottom: 40px;
  }
  .commit-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: $default-color;
    color: #fff;
  }
}
</style>
