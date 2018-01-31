<template>
  <div class="checkbox-container">
    <label>
      <input type="checkbox" name="checkbox-name" v-model="value" :id="`checkbox-${id}`" hidden/>
      <label :for="`checkbox-${id}`" class="checkbox-beauty">123</label>
      <span class="checkbox-name">
        <slot name="right-text"></slot>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    checked: {
      type: Boolean,
      default: false
    },
    label: String
  },
  data () {
    return {
      value: this.checked
    }
  },
  mounted () {
    console.log('id: ', this.id)
  },
  methods: {
  },
  watch: {
    checked (newVal) {
      this.value = newVal
    },
    value (newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.checkbox-container {
  font-size: 0;
  display: inline;
  overflow: hidden;
  %common {
    content: '✓';
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    // background: $default-color;
  }
  .checkbox-beauty {
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid #bbb;
    display: inline-block;
    margin: auto 10px auto 3px;
    vertical-align: middle;
  }

  .checkbox-name {
    vertical-align: middle;
    font-size: 14px;
  }

  input[type="checkbox"]:checked+.checkbox-beauty::after {
    @extend %common;
  }

  input[type="checkbox"]:checked+.checkbox-beauty {
    background: $default-color;
    border: 1px solid $default-color;
  }
}

</style>
