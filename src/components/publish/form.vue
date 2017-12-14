<template>
  <div class="l-publish-form">
    <div class="l-form-wrapper"
         v-for="(item, index) of formDatasValue"
         :key="index">
      <div class="l-input-wrapper item">
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               v-if="item.type === 'input'">
        <!-- <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               :readonly="true"
               v-if="item.type === 'select'"
               @click="select(item.selectType)"> -->
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               :readonly="true"
               v-if="item.type === 'select-city'"
               @click="selectCity">
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               :readonly="true"
               :value="obj[formDataskeys[index]]"
               v-if="item.type === 'datetime'"
               @click="selectDatetime(index)">
        <popup-picker class="l-input-core"
              valueTextAlign="left"
              v-if="item.type === 'select'"
              :placeholder="`${item.required ? '*' : ''}${item.label}`"></popup-picker>
        <div class="icon">
          <l-icon :icon="`${item.icon}`"></l-icon>
        </div>
        <div class="icon"
             v-if="item.type === 'select' || item.type === 'select-city'">
          <l-icon icon="icon-xiangxia"></l-icon>
        </div>
        <div class="icon"
             v-if="item.type === 'datetime'">
          <l-icon icon="icon-rili"></l-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PopupPicker } from 'vux'
import { getLinkage } from 'api'
export default {
  components: {
    PopupPicker
  },
  props: {
    formDatas: {
      type: Map,
      default: () => {
        return new Map()
      }
    }
  },
  computed: {
    formDataskeys () {
      // vue 不支持迭代器的遍历
      return [...this.formDatas.keys()]
    },
    formDatasValue () {
      console.log([...this.formDatas.values()])
      return [...this.formDatas.values()]
    }
  },
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    async select (selectType) {
      let res = await getLinkage({name: selectType})
      console.log('select.', res.data)
    },
    selectCity () {
      console.log('selectCity.')
    },
    selectDatetime (index) {
      console.log('selectDatetime.')
      let key = this.formDataskeys[index]
      this.$vux.datetime.show({
        onShow: (value) => {
          console.log('onshow.')
        },
        onConfirm: (value) => {
          this.$set(this.obj, key, value)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.l-publish-form {
  background: #fff;
  padding: 1px 0;
  .l-form-wrapper {
    .item {
      margin: 10px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;
    }
    .l-input-wrapper {
      position: relative;
      .l-input-core {
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        .weui-cell {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          .vux-popup-picker-placeholder {
            margin: auto 0;
            color: #757575;
          }
        }
      }
      .icon {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #777;
      }
    }
  }
}
</style>
