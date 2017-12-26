<template>
  <l-main-layout back
    :handleBack="cancel"
    class="publish-recruiting-container">
    <div slot="header-right" @click="save">保存</div>
    <div class="content">
      <section v-for="(item, index) in formDatas"
               :key="index"
               class="section">
        <publish-form :formDatas="item"></publish-form>
      </section>
      <l-button-commit class="button"
        type="recruiting"
        :method="method"
        @success="commitSuccess">发布</l-button-commit>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import PublishMixin from '@/mixins/publish'
import PublishForm from 'components/publish/form'
import { createMap } from '@/utils/common'
import { addRecruiting } from 'api'
import LButtonCommit from 'components/unit/button-commit'
export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    PublishForm,
    LButtonCommit
  },
  mixins: [PublishMixin],
  data () {
    return {
      method: addRecruiting,
      formDatas: [
        createMap({
          'job': {
            label: '职位',
            type: 'select',
            selectType: 'JOB',
            required: true
          },
          // 'currency': {
          //   label: '薪资币种',
          //   type: 'select',
          //   selectType: '',
          //   size: 'small'
          // },
          'salary': {
            label: '薪资',
            type: 'input-number',
            selectType: ''
          },
          'numbers': {
            label: '招聘人数',
            type: 'input',
            required: true
          },
          'cert': {
            label: '证书要求',
            type: 'select',
            selectType: 'CERT_NAME',
            size: 'small',
            required: true
          },
          'catid': {
            label: '渔船类型',
            type: 'select',
            selectType: 'SHIP_CATEGORY_ONE',
            size: 'small',
            required: true
          },
          // 'shiptype': {
          //   label: '渔船类型',
          //   type: 'select',
          //   selectType: 'SHIP_TYPE',
          //   size: 'small',
          //   required: true
          // },
          'age': {
            label: '年龄要求',
            type: 'select',
            selectType: 'AGE',
            size: 'small',
            required: true
          },
          'shipping_line': {
            label: '航线区域',
            type: 'select',
            selectType: 'SHIPPING_LINE',
            size: 'small',
            required: true
          },
          'address': {
            label: '上船地点',
            type: 'select-city',
            required: true
          }
        }),
        createMap({
          'long': {
            label: '船长',
            type: 'input-number',
            size: 'small'
          },
          'gtonnage': {
            label: '总吨位',
            type: 'input-number',
            size: 'small'
          },
          'power': {
            label: '主机总功率',
            type: 'input-number'
          }
        }),
        createMap({
          'linkman': {
            label: '联系人',
            type: 'input',
            required: true
          },
          'phone': {
            label: '联系电话',
            type: 'input-number',
            required: true
          }
        })
      ]
    }
  },
  mounted () {
    this.publishType = 'RECRUITING'
  },
  methods: {
    commitSuccess () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.publish-recruiting-container {
  .content {
    position: relative;
    .section {
      padding: 10px 10px 0 10px;
      background: #fff;
      margin-bottom: 10px;
    }
    .button {
      margin: 10px;
      background-color: $default-color;
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
    }
  }
}
</style>
