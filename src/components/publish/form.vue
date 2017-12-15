<template>
  <div class="l-publish-form">
    <div class="l-form-wrapper"
         v-for="(item, index) of formDatasValue"
         :key="index">
      <div class="l-input-wrapper item">
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               v-if="item.type === 'input'">
        <div class="l-input-core"
               :class="{'placeholder': !obj[formDataskeys[index]]}"
               v-if="item.type === 'select-city'"
               @click="selectCity"
               v-is-link>
          {{ obj[formDataskeys[index]] ?
          `${obj[formDataskeys[index]].label}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               :readonly="true"
               :value="obj[formDataskeys[index]]"
               v-if="item.type === 'datetime'"
               @click="selectDatetime(index)">
        <div class="l-input-core"
              v-if="item.type === 'select'"
              @click="select(item)"
              :class="{'placeholder': !obj[formDataskeys[index]]}"
              v-is-link>
          {{ obj[formDataskeys[index]] ?
          `${obj[formDataskeys[index]].label}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>
        <div class="icon">
          <l-icon :icon="`${item.icon}`"></l-icon>
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
import { PopupPicker, Group } from 'vux'
import { getLinkage } from 'api'
export default {
  components: {
    PopupPicker,
    Group
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
      obj: {},
      selectOptions: [],
      showPopupPicker: false,
      arr: [['123', '234']]
    }
  },
  methods: {
    async select (item, key) {
      // this.selectOptions = [['123', '234']]
      this.selectOptions = []
      let res = await getLinkage({name: item.selectType})
      console.log('res: ', res.data)
      this.$store.dispatch('showSelectView', {
        title: `请选择${item.label}`,
        selectList: res.data,
        onComplete: (item) => {
          console.log('成功获取item', item)
        }
      })
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
      border-bottom: 1px solid #ddd;
      overflow: hidden;
    }
    .l-input-wrapper {
      position: relative;
      .l-input-core {
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
      .icon {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #777;
      }
      .placeholder {
        color: #757575;
      }
    }
  }
}
</style>
