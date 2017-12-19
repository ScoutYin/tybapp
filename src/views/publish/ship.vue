<template>
  <l-main-layout back class="publish-ship-container">
    <l-button-tab v-model="selected">
      <l-button-tab-item>基本信息</l-button-tab-item>
      <l-button-tab-item>渔船参数</l-button-tab-item>
    </l-button-tab>
    <div class="content" v-if="selected === 0" ref="content">
      <section class="section"
               v-for="(item, index) in formDatas.step1"
               :key="index">
        <publish-form :formDatas="item"></publish-form>
      </section>
      <div class="button" @click="nextStep()">
        下一步
      </div>
    </div>
    <div class="content" v-else-if="selected === 1" ref="content">
      <section class="section"
               v-for="(item, index) in formDatas.step2"
               :key="index">
        <publish-form :formDatas="item"></publish-form>
      </section>
      <div class="button" @click="preStep()">
        上一步
      </div>
      <div class="button" @click="commit()">
        发布
      </div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPartLine from 'components/common/part-line'
import { LButtonTab, LButtonTabItem } from 'components/button-tab'
import publishForm from 'components/publish/form'
export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    LPartLine,
    LButtonTab,
    LButtonTabItem,
    publishForm
  },
  data () {
    return {
      selected: 0,
      formData: {
        title: ''
      },
      formDatas: {
        step1: [
          this.initFormDatas({
            'title': {
              label: '标题',
              type: 'input',
              required: true
            },
            'name': {
              label: '渔船编码',
              type: 'input',
              required: true
            },
            'shipname': {
              label: '船名号',
              type: 'input',
              required: true
            }
          }),
          this.initFormDatas({
            'catid': {
              label: '作业类型',
              type: 'select',
              required: true,
              selectType: 'SHIP_CATEGORY'
            },
            'address': {
              label: '地区船籍港',
              required: true,
              type: 'select-city'
            },
            'nationality': {
              label: '船舶国籍证',
              required: true,
              type: 'picture'
            },
            'ownership': {
              label: '所有权登记证',
              type: 'picture'
            },
            'license': {
              label: '渔业捕捞许可证',
              type: 'picture'
            },
            'certificate': {
              label: '船舶检验证',
              type: 'picture'
            },
            'material': {
              label: '渔船材质',
              type: 'select',
              required: true,
              selectType: 'SHIP_MATERIAL'
            },
            'price': {
              label: '价格',
              type: 'input-number',
              required: true
            },
            'expirydate': {
              label: '有效期',
              type: 'datetime',
              required: true
            },
            'picture': {
              label: '渔船图片',
              type: 'pictures'
            }
          }),
          this.initFormDatas({
            'linkman': {
              label: '联系人',
              type: 'input',
              required: true
            },
            'tel': {
              label: '联系电话',
              type: 'input-number',
              required: true
            },
            'descrition': {
              label: '详细内容',
              type: 'textarea'
            }
          })
        ],
        step2: [
          this.initFormDatas({
            'buildtime': {
              label: '完工时间',
              type: 'datetime',
              required: true
            },
            'shipord': {
              label: '船龄',
              type: 'input-number',
              required: true
            },
            'power': {
              label: '功率(KW)',
              type: 'input-number',
              required: true
            },
            'doublepower': {
              label: '双控功率(KW)',
              type: 'input-number',
              required: true
            }
          }),
          this.initFormDatas({
            'width': {
              label: '型宽(米)',
              type: 'input-number',
              required: true,
              size: 'small'
            },
            'long': {
              label: '船长(米)',
              type: 'input-number',
              required: true,
              size: 'small'
            },
            'alllong': {
              label: '总长(米)',
              type: 'input-number',
              required: true,
              size: 'small'
            },
            'deep': {
              label: '型深(米)',
              type: 'input-number',
              required: true,
              size: 'small'
            },
            'gtonnage': {
              label: '总吨位(T)',
              type: 'input-number',
              required: true,
              size: 'small'
            },
            'nettonnage': {
              label: '净吨位(T)',
              type: 'input-number',
              required: true,
              size: 'small'
            }
          }),
          this.initFormDatas({
            'shipyard': {
              label: '船厂',
              type: 'input',
              required: true
            },
            'model': {
              label: '主机型号',
              type: 'input',
              required: true
            }
          })
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    initFormDatas (obj) {
      let map = new Map()
      if (!obj) {
        return map
      }

      Object.keys(obj).forEach((key) => {
        map.set(key, obj[key])
      })
      return map
    },
    nextStep () {
      this.$refs['content'].offsetParent.scrollTop = 0
      ++this.selected
      console.log(this.$refs)
    },
    preStep () {
      --this.selected
      this.$refs['content'].offsetParent.scrollTop = 0
    },
    // 把需要提交的数据整合起来
    mergeFormData () {
      // let obj = {}

      let values = Object.values(this.formDatas)
      for (let item of values) {
        for (let mapItem of item) {
          console.log('mapItem: ', mapItem)
        }
      }
      console.log(values, this.formDatas)
    },
    commit () {
      this.mergeFormData()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.publish-ship-container {
  .content {
    position: relative;
    // overflow: scroll;
    // -webkit-overflow-scrolling: touch;
    .section {
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
