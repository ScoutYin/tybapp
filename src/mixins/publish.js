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
    checkType () {
      return ['FISH', 'SHIP'].indexOf(this.publishType.toLocaleUpperCase()) > -1
    },
    save () {
      console.log('save')
      if (!this.checkType()) { return }
      this.$store.dispatch('saveFormObj', this.publishType)
      this.$vux.toast.text('已保存', 'middle')
    },
    cancel () {
      console.log('cancel')
      if (!this.checkType()) { return }
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
          this.$store.commit('CLEAR_FORMOBJ')
          this.$router.back()
        }
      })
    }
  }
}
