<template>
  <button
    :type="nativeType"
    class="l-button"
    :class="['l-button-' + type, 'l-button-' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]"
    @click="handleClick"
    :disabled="disabled">
    <span class="l-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <i v-if="icon" class="iconfont" :class="'icon-' + icon"></i>
      </slot>
    </span>
    <label class="l-button-text"><slot></slot></label>
  </button>
</template>

<script>
export default {
  name: 'LButton',
  componentName: 'LButton',
  props: {
    disabled: Boolean,
    plain: Boolean,
    nativeType: String,
    icon: String,
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'primary',
          'danger',
          'default'
        ].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'large',
          'normal',
          'small'
        ].indexOf(value) > -1
      }
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/var.scss';

.l-button {
  appearance: none;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  display: block;
  font-size: 18px;
  height: 41px;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  &::after {
    background-color: #000;
    content: "";
    opacity: 0;
    position: absolute 0 0 0 0;
  }
  &:not(.is-disabled):active::after {
    opacity: .4;
  }
  .l-button-icon {
    vertical-align: middle;
    display: inline-block;
  }
}

.l-button-default {
  color: $button-default-color;
  background-color: $button-default-background-color;
  box-shadow: $button-default-box-shadow;
}

.l-button-primary {
  color: $button-primary-color;
  background-color: $button-primary-background-color;
}

.l-button-danger {
  color: $button-danger-color;
  background-color: $button-danger-background-color;
}

.l-button-normal {
  display: inline-block;
  padding: 0 12px;
}

.l-button-large {
  display: block;
  width: 100%;
}

.l-button-small {
  display: inline-block;
  font-size: 14px;
  padding: 0 12px;
  height: 33px;
}

.is-plain {
  border: 1px solid $button-default-plain-color;
  background-color: transparent;
  box-shadow: none;
  color: $button-default-plain-color;
}
.is-disabled {
  opacity: .6;
}
</style>
