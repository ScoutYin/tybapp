<template>
  <div class="l-publish-form">
    <div class="l-form-wrapper"
         :class="{ 'small': item.size === 'small' || item.type === 'picture' }"
         v-for="(item, index) of formDatasValue"
         :key="index">
      <div class="l-input-wrapper">
        <publish-form v-if="item.type === 'multiple'" :formDatas="item.data"></publish-form>
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
          {{ formObj['district'] ?
          `${selectObj[formDataskeys[index]]['province'].value}/
           ${selectObj[formDataskeys[index]]['city'].value}/
           ${selectObj[formDataskeys[index]]['area'].value}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>
        <div class="l-input-core"
             v-if="item.type === 'select'"
             @click="select(item, index)"
             :class="{'placeholder': !formObj[formDataskeys[index]]}"
             v-is-link>
          {{ formObj[formDataskeys[index]] ?
          `${selectObj[formDataskeys[index]].label}` :
          `${item.required ? '*' : ''}${item.label}` }}
        </div>

        <l-upload-picture-item v-if="item.type === 'picture'"
          :placeholder="`${item.required ? '*' : ''}${item.label}`"
          :id="formDataskeys[index]"
          @success="pictureUploadSuccess">
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
      'selectObj'
    ])
  },
  data () {
    return {
      // formObj: {},
      // selectObj: {},
      selectList: [],
      selectTitle: '',
      cityVisible: false,
      selectVisible: false,
      key: ''
    }
  },
  mounted () {
    this.default()
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
      this.$store.commit('SET_SELECTOBJ_ITEM', { key: this.key, value: item })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: this.key, value: item.value })
      this.selectVisible = false
      console.log('selected: ', this.selectObj)
    },
    selectedCity (item) {
      this.$store.commit('SET_SELECTOBJ_ITEM', { key: this.key, value: item })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'province', value: item['province'].code })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'city', value: item['city'].code })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: 'district', value: item['area'].code })
      console.log('selectedCity: ', item, this.key)
      console.log('this.formObj: ', this.formObj)
      this.cityVisible = false
    },
    selectDatetime (index) {
      console.log('selectDatetime.')
      let key = this.formDataskeys[index]
      this.$vux.datetime.show({
        minYear: '1900',
        onShow: (value) => {
          console.log('onshow.')
        },
        onConfirm: (value) => {
          this.$store.commit('SET_FORMOBJ_ITEM', { key: key, value: value })
        }
      })
    },
    pictureUploadSuccess (id, data) {
      this.$store.commit('SET_SELECTOBJ_ITEM', { key: id, value: data })
      this.$store.commit('SET_FORMOBJ_ITEM', { key: id, value: data && data.id })
      console.log('pictureUploadSuccess', this.formObj)
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
