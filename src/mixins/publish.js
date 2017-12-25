import { isEmptyObject } from '@/utils/common'

export default {
  computed: {
    mutationsType () {
      return `SAVE_FORM_${this.publishType.toLocaleUpperCase()}`
    }
  },
  data () {
    return {
      publishType: ''
    }
  },
  mounted () {
    // 读取localStorage里面的数据
    this.$nextTick(() => {
      if (this.checkType()) {
        this.$store.dispatch('getFormObj', this.publishType)
      }
    })
  },
  methods: {
    createMultipleMap (key, obj, index = 0) {
      if (!key || isEmptyObject(obj)) {
        return new Map()
      }

      let map = new Map()
      let mapInner = new Map()
      const newKey = key + index

      Object.keys(obj).forEach((_key) => {
        const _newKey = `${key}[${_key}][${index}]`
        mapInner.set(_newKey, obj[_key])
      })

      map.set(newKey, { type: 'multiple', data: mapInner })
      console.log(map)
      return map
    },
    checkType () {
      return ['FISH', 'SHIP', 'RECRUITING', 'JOBHUNTING'].indexOf(this.publishType.toLocaleUpperCase()) > -1
    },
    save () {
      console.log('save')
      if (!this.checkType()) { return }
      this.$store.dispatch('saveFormObj', this.publishType)
      this.$vux.toast.text('已保存', 'middle')
    },
    back () {
      this.$store.commit('CLEAR_FORMOBJ')
      this.$router.back()
    },
    cancel () {
      console.log('cancel')
      if (!this.checkType()) { return }
      if (isEmptyObject(this.$store.getters.formObj) &&
          isEmptyObject(this.$store.getters.selecObj)) {
        this.back()
        return
      }

      this.$vux.confirm.show({
        title: '确定退出',
        content: '退出是否清空表单？',
        confirmText: '清空并退出',
        cancelText: '直接退出',
        onConfirm: () => {
          this.$store.dispatch('clearFormObj', this.publishType)
          this.$router.back()
        },
        onCancel: () => {
          this.back()
        }
      })
    }
  }
}
