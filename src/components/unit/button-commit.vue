<template>
  <div class="button-commit" @click="commit">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    method: Function
  },
  data () {
    return {
      disable: false
    }
  },
  methods: {
    commit () {
      if (this.disable) {
        return
      }
      console.log('formObj: ', this.$store.getters.formObj)
      console.log('defaultObj: ', this.$store.getters.defaultObj)
      this.$vux.confirm.show({
        title: '提交表单',
        content: '是否编辑完成，确定提交？',
        onCancel () {
          this.disable = false
        },
        onConfirm: async () => {
          this.disable = true
          let params = Object.assign(
            {},
            this.$store.getters.defaultObj,
            this.$store.getters.formObj
          )
          try {
            let res = await this.method(params)
            console.log('res: ', res.data)
            this.$vux.toast.text('提交成功', 'middle')
            this.disable = false
            this.$store.commit('CLEAR_FORMOBJ')
            this.$emit('success')
          } catch (err) {
            this.disable = false
            throw err
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
