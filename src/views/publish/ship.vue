<template>
  <l-main-layout back class="publish-ship-container">
    <l-button-tab v-model="selected">
      <l-button-tab-item>基本信息</l-button-tab-item>
      <l-button-tab-item>渔船参数</l-button-tab-item>
    </l-button-tab>
    <div class="content">
      <section class="section"
               v-for="(item, index) in formDatas"
               :key="index">
        <publish-form :formDatas="item"></publish-form>
      </section>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import LPartLine from 'components/common/part-line'
import { LButtonTab, LButtonTabItem } from 'components/button-tab'
import { Group, Cell, XInput, Selector, PopupPicker,
         Datetime, XAddress, XTextarea } from 'vux'
import publishForm from 'components/publish/form'
export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    LPartLine,
    LButtonTab,
    LButtonTabItem,
    Group,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    Datetime,
    XAddress,
    XTextarea,
    publishForm
  },
  data () {
    return {
      selected: 0,
      formData: {
        title: ''
      },
      formDatas: [
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
            type: 'select-city'
          },
          'material': {
            label: '渔船材质',
            type: 'select',
            required: true,
            selectType: 'SHIP_MATERIAL'
          },
          'price': {
            label: '价格',
            type: 'input',
            required: true
          },
          'expirydate': {
            label: '有效期',
            type: 'datetime',
            required: true
          }
        })
      ]
    }
  },
  mounted () {
    let map = new Map()
    map.set('title', '123')
    map.set('title2', '123')
    map.set('title3', '123')
    map.set('title4', '123')
    console.log(map, map.keys(), ...map.keys())
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
    }
  }
}
</script>

<style lang="scss">
.publish-ship-container {
  .content {
    .section {
      margin-bottom: 10px;
    }
  }
}
</style>
