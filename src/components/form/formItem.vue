<template>
  <div class="l-form-item">
    <label :for="prop" v-if="label || $slots.label">
      <slot name="label">{{ label + form.labelSuffix }}</slot>
    </label>
    <div class="l-form-item-content">
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
    prop: String,
    label: String
  },
  computed: {
    form () {
      // 默认只允许 formItem 放在 form 的下一层
      return this.$parent
    }
  },
  data () {
    return {}
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
  beforeDestroy () {
    this.dispatch('LForm', 'lform.removeField', [this])
  }
}
</script>

<style lang="scss">
.l-form-item {
  .l-form-item-content {
    &>input {
      border: none;
      border-bottom: 1px solid #aaa;
    }
  }
}
</style>
