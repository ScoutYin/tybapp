<template>
  <l-main-layout class="publish-job-hunting-container"
    :handleBack="cancel">
    <div slot="header-right" @click="save">保存</div>
    <l-button-tab v-model="selected">
      <l-button-tab-item>基本信息</l-button-tab-item>
      <l-button-tab-item>求职意向</l-button-tab-item>
      <l-button-tab-item>从业经验</l-button-tab-item>
      <l-button-tab-item>联系方式</l-button-tab-item>
    </l-button-tab>
    
    <div class="content"
      v-for="(formData, step) in formDatas"
      :key="step"
      v-if="selected === step"
      ref="content">
      <section class="section"
               v-for="(item, index) in formData"
               :key="index">
        <publish-form :formDatas="item"></publish-form>
      </section>
      <div class="button" @click="preStep()" v-if="selected !== 0">
        上一步
      </div>
      <div class="button" @click="nextStep()" v-if="selected !== formDatas.length - 1">
        下一步
      </div>
      <l-button-commit class="button"
        type="ship"
        :method="method"
        @success="commitSuccess"
        v-if="selected === formDatas.length - 1">发布</l-button-commit>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { LButtonTab, LButtonTabItem } from 'components/button-tab'
import PublishForm from 'components/publish/form'
import { addJobHunting } from 'api'
import LButtonCommit from 'components/unit/button-commit'
import { createMap } from '@/utils/common'
import PublishMixin from '@/mixins/publish'

export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    LButtonTab,
    LButtonTabItem,
    PublishForm,
    LButtonCommit
  },
  mixins: [PublishMixin],
  data () {
    const workObj = {
      postion: {
        label: '担任职位',
        type: 'select',
        selectType: 'JOB'
      },
      start_time: {
        label: '开始时间',
        type: 'datetime',
        size: 'small'
      },
      end_time: {
        label: '结束时间',
        type: 'datetime',
        size: 'small'
      },
      catid: {
        label: '作业类型',
        type: 'select',
        selectType: 'SHIP_CATEGORY'
      }
    }
    const certObj = {
      cert: {
        label: '证书名称',
        type: 'select',
        selectType: 'SEAMAN_CERTIFICATE',
        size: 'small',
        required: true
      },
      hold: {
        label: '持有情况',
        type: 'select',
        size: 'small',
        required: true,
        options: [
          { label: '有且有效', value: 1 },
          { label: '有且失效', value: 2 }
        ]
      },
      cert_no: {
        label: '证书编号',
        type: 'input',
        required: true
      },
      start_time: {
        label: '证书有效起始时间',
        type: 'datetime',
        size: 'small'
      },
      end_time: {
        label: '证书有效结束时间',
        type: 'datetime',
        size: 'small'
      }
    }
    return {
      method: addJobHunting,
      selected: 0,
      formDatas: [
        [
          createMap({
            'realname': {
              label: '姓名',
              type: 'input',
              required: true
            },
            'birthday': {
              label: '出生日期',
              type: 'datetime',
              required: true
            },
            'education': {
              label: '学历',
              type: 'select',
              selectType: 'EDUCATION',
              required: true
            },
            'school': {
              label: '毕业学校',
              type: 'input',
              required: true
            },
            'graduation_date': {
              label: '毕业时间',
              type: 'datetime',
              size: 'small',
              required: true
            },
            // '': {
            //   label: '所学专业',
            //   type: 'input',
            //   size: 'small'
            // },
            'language': {
              label: '外语水平',
              type: 'select',
              selectType: 'LANGUAGE',
              size: 'small'
            },
            'height': {
              label: '身高',
              type: 'input-number',
              size: 'small'
            },
            'address': {
              label: '现居住地',
              type: 'select-city',
              required: true
            },
            'postion': {
              label: '担任职务',
              type: 'select',
              selectType: 'JOB',
              required: true
            },
            'seniority': {
              label: '航海经验',
              type: 'select',
              selectType: 'JOB_YEARS',
              required: true,
              size: 'small'
            },
            'skill': {
              label: '特殊技能',
              type: 'input',
              size: 'small'
            }
          }),
          createMap({
            'cert': {
              label: '证书',
              type: 'multiple',
              obj: certObj
            }
          })
        ], [
          createMap({
            'job': {
              label: '应聘岗位',
              type: 'select',
              selectType: 'JOB',
              required: true
            },
            'salary': {
              label: '期待月薪（元/月）',
              type: 'input',
              required: true
            },
            'catid': {
              label: '作业要求',
              type: 'select',
              selectType: 'SHIP_CATEGORY',
              size: 'small',
              required: true
            },
            'category_detail': {
              label: '详细作业方式',
              type: 'input',
              size: 'small'
            }
          })
        ], [
          // this.createMultipleMap('work', workObj, 0)
          createMap({
            'work': {
              label: '工作',
              type: 'multiple',
              obj: workObj
            }
          })
        ], [
          createMap({
            'mobile': {
              label: '手机',
              type: 'input-number',
              required: true
            },
            'qq': {
              label: '联系QQ',
              type: 'input-number'
            },
            'email': {
              label: '邮件',
              type: 'input'
            }
          })
        ]
      ],
      workObj: workObj
    }
  },
  mounted () {
    this.publishType = 'JOBHUNTING'
    // this.createMultipleMap('work', this.workObj, 0)
  },
  methods: {
    nextStep () {
      this.$refs['content'][0].offsetParent.scrollTop = 0
      ++this.selected
    },
    preStep () {
      this.$refs['content'][0].offsetParent.scrollTop = 0
      --this.selected
    },
    commitSuccess () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.publish-job-hunting-container {
  .content {
    position: relative;
    .section {
      margin-bottom: 10px;
      padding: 10px 10px 0 10px;
      background: #fff;
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
