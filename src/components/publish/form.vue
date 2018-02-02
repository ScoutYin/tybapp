<template>
  <div class="l-publish-form">
    <div class="l-form-wrapper"
         :class="{ 'small': item.size === 'small' || item.type === 'picture' }"
         v-for="(item, index) of formDatasValue"
         :key="index">
      <div class="l-input-wrapper">
        <template v-if="item.type === 'multiple' && multipleObj[formDataskeys[index]]">
          <publish-form v-for="(multipleItem, multipleIndex) in multipleObj[formDataskeys[index]]"
            :key="multipleIndex"
            :formDatas="multipleItem">
          </publish-form>
          <div class="multiple-button-group">
            <div class="add-button" @click="multipleAddOne(item, formDataskeys[index])">
              {{`添加${item.label}`}}</div>
            <div class="delete-button" @click="multipleDeleteOne(item, formDataskeys[index])">
              删除最后一项
            </div>
          </div>
        </template>
       
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               v-if="item.type === 'input'"
               v-model="formObj[formDataskeys[index]]">
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               v-if="item.type === 'input-number'"
               type="number"
               v-model.number="formObj[formDataskeys[index]]">
        <textarea class="l-input-core textarea"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               v-if="item.type === 'textarea'"
               rows="3"
               v-model="formObj[formDataskeys[index]]"></textarea>
        <input class="l-input-core"
               :placeholder="`${item.required ? '*' : ''}${item.label}`"
               :readonly="true"
               :value="formObj[formDataskeys[index]]"
               v-if="item.type === 'datetime'"
               @click="selectDatetime(index)">
        <div class="l-input-core"
             :class="{'placeholder': !formObj['district']}"
             v-if="item.type === 'select-city'"
             @click="selectCity(item, index)"
             v-is-link>
          {{ formObj['district'] !== undefined ?
          `${formObj['province'].value}/
           ${formObj['city'].value}/
           ${formObj['district'].value}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>
        <div class="l-input-core"
             v-if="item.type === 'select'"
             @click="select(item, index)"
             :class="{'placeholder': !formObj[formDataskeys[index]]}"
             v-is-link>
          {{ formObj[formDataskeys[index]] ?
          `${formObj[formDataskeys[index]].value}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>

        <l-upload-picture-item v-if="item.type === 'picture'"
          :placeholder="`${item.required ? '*' : ''}${item.label}`"
          :id="formDataskeys[index]"
          :path="formObj[formDataskeys[index]] && formObj[formDataskeys[index]].path"
          @upload="pictureUploadSuccess"
          @delete="pictureDelete">
        </l-upload-picture-item>

        <div class="icon" v-if="item.icon">
          <l-icon :icon="`${item.icon}`"></l-icon>
        </div>
        <div class="icon"
             v-if="item.type === 'datetime'">
          <l-icon icon="icon-rili"></l-icon>
        </div>
      </div>
    </div>
    <popup
      v-model="selectVisible"
      height="100%"
      class="popup-container">
      <l-header :title="selectTitle" fixed>
        <l-button slot="left" @click.native="selectVisible = false">
          取消
        </l-button>
      </l-header>
      <div class="main">
        <select-list :list="selectList" @selected="selected"></select-list>
      </div>
    </popup>

    <popup
      v-model="cityVisible"
      height="100%"
      class="popup-container">
      <l-header title="选择地区" fixed>
        <l-button slot="left" @click.native="cityVisible = false">
          取消
        </l-button>
      </l-header>
      <v-distpicker type="mobile"
                    @selected="selectedCity"
                    class="distpicker-container">
      </v-distpicker>
    </popup>
  </div>
</template>

<script>
import { PopupPicker, Group, Popup } from 'vux'
import { mapGetters } from 'vuex'
import { getLinkage } from 'api'
import LHeader from 'components/header'
import SelectList from 'components/lists/select-list'
import VDistpicker from 'v-distpicker'
import LUploadPictureItem from 'components/upload/picture-item'
import { createMultipleMap } from '@/utils/common'
export default {
  name: 'PublishForm',
  components: {
    PopupPicker,
    Group,
    Popup,
    LHeader,
    SelectList,
    VDistpicker,
    LUploadPictureItem
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
    },
    ...mapGetters([
      'formObj',
      'multipleObj'
    ])
  },
  data () {
    return {
      // formObj: {},
      selectList: [],
      selectTitle: '',
      cityVisible: false,
      selectVisible: false,
      key: ''
    }
  },
  mounted () {
    this.default()
    this.initMultipleData()
  },
  methods: {
    default () {
      for (const [key, value] of this.formDatas) {
        if (this.formDatas.get(key).default) {
          this.$store.commit('SET_FORM_DEFAULT_ITEM', {key: key, value: value.default})
        }
      }
    },
    async select (item, index) {
      if (!item.selectType) {
        if (item.options) {
          this.selectTitle = `请选择${item.label}`
          this.key = this.formDataskeys[index]
          this.selectVisible = true
          this.selectList = item.options
          return
        }
        console.error('selectType is required.')
        return
      }

      try {
        // 最好可以对selectType的范围进行验证
        this.selectTitle = `请选择${item.label}`
        this.key = this.formDataskeys[index]
        this.selectVisible = true
        this.selectList = []
        let res = await getLinkage({name: item.selectType})
        this.selectList = res.data
      } catch (err) {
        throw err
      }
    },
    selectCity (item, index) {
      this.key = this.formDataskeys[index]
      this.cityVisible = true
    },
    selected (item) {
      this.$store.commit('SET_FORMOBJ_ITEM', { key: this.key, value: item })
      this.selectVisible = false
    },
    selectedCity (item, index) {
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'province', value: item['province'] })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'city', value: item['city'] })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'district', value: item['area'] })
      console.log('this.formObj: ', this.formObj)
      this.cityVisible = false
    },
    selectDatetime (index) {
      console.log('selectDatetime.')
      let key = this.formDataskeys[index]
      this.$vux.datetime.show({
        minYear: '1900',
        confirmText: '确定',
        cancelText: '取消',
        onShow: (value) => {
          console.log('onshow.')
        },
        onConfirm: (value) => {
          this.$store.commit('SET_FORMOBJ_ITEM', { key: key, value: value })
        }
      })
    },
    pictureUploadSuccess (id, data) {
      this.$store.commit('SET_FORMOBJ_ITEM', { key: id, value: data })
      console.log('pictureUploadSuccess', this.formObj)
    },
    pictureDelete (id) {
      this.$store.commit('SET_FORMOBJ_ITEM', { key: id, value: undefined })
    },
    initMultipleData () {
      this.formDatas.forEach((value, key) => {
        if (value.type === 'multiple' && !this.multipleObj[key]) {
          this.$store.commit('SET_MULTIPLEOBJ_ITEM', {
            key: key,
            value: [createMultipleMap(key, value.obj, 0)]
          })
        }
      })
    },
    multipleAddOne (item, type) {
      let length = this.multipleObj[type].length
      this.multipleObj[type].push(createMultipleMap(type, item.obj, length))
      console.log('add: ', item, type)
    },
    multipleDeleteOne (item, type) {
      if (this.multipleObj[type].length > 1) {
        let lastOne = this.multipleObj[type].pop()
        this.$store.commit('DELETE_FORMOBJ_KEYS', lastOne.keys())
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.l-publish-form {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .l-form-wrapper {
    width: 100%;
    &.small {
      width: 170px;
    }
    .l-input-wrapper {
      margin-bottom: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      position: relative;
      color: #333;
      .l-input-core {
        outline: none;
        border: 1px solid #ddd;
        width: 100%;
        height: 40px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        border-radius: 5px;
      }
      &>.icon {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
      .placeholder {
        color: $placeholder-color;
      }
      .textarea {
        padding: 10px;
        height: auto;
      }
      .picture {
        position: relative;
        width: 150px;
        height: 100px;
        border: 1px dashed #ddd;
        text-align: center;
        color: $placeholder-color;
        .picture-icon {
          margin-top: 10px;
          font-size: 40px;
          flex: 1;
        }
        input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          width: 150px;
          height: 100px;
          opacity: 0;
        }
      }
    }
    .multiple-button-group {
      display: flex;
      text-align: center;
      .add-button {
        flex: 1;
        background: $default-color;
        padding: 10px;
        margin-right: 10px;
        color: #fff;
      }
      .delete-button {
        flex: 1;
        padding: 10px;
        background: #dfdfdf;
        color: $default-color;
      }
    }
  }
  .main {
    background: #fff;
  }
  // 修改地区选择层叠样式
  .popup-container {
    .distpicker-container {
      margin-top: 44px;
    }
    .distpicker-close-btn {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .distpicker-address-wrapper {
      color: #333;
      .address-header ul li.active {
        color: $default-color;
        border-color: $default-color;
      }
      .address-container ul li.active {
        color: $default-color;
      }
    }
  }
}
</style>
