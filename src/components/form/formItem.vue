<template>
  <div class="l-form-item">
    <label :for="prop"
           v-if="label || $slots.label"
           :style="`width: ${$parent.labelWidth}px;`"
           class="l-form-label">
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

export default {
  name: 'LFormItem',
  componentName: 'LFormItem',
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
      console.log('this.prop: ', this.prop)
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss">
.l-form-item {
  display: flex;
  align-items: center;
  .l-form-label {
    text-align: right;
    margin-right: 8px;
  }
  .l-form-item-content {
    flex-grow: 1;
    &>input {
      border: none;
      outline: none;
    }
  }
}
</style>
