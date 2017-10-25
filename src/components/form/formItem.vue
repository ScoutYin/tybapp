<template>
  <div>
    <label :for="prop" v-if="label || $slots.label">
      <slot name="label">{{ label + form.labelSuffix }}</slot>
    </label>
    <div class="">
      <slot></slot>
      <!-- V 验证提示信息 V -->
      <!-- <transition>
        <div></div>
      </transition> -->
    </div>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
export default {
  name: 'LFormItem',
  componentName: 'LFormItem',
  mixins: [emitter],
  props: {
    prop: String
  },
  computed: {
    form () {
      // 默认只允许 formItem 放在 form 的下一层
      return this.$parent
    }
  },
  data () {

  },
  methods: {
    resetField () {
      // let model = this.form.model
      // let value = this.fieldValue
      // let path = this.prop

    }
  },
  mounted () {
    if (this.prop) {
      this.dispatch('LForm', 'lform.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })
    }
  },
  beforeDestroy() {
    this.dispatch('LForm', 'lform.removeField', [this])
  }
}
</script>

<style lang="scss">

</style>
