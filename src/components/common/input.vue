<template>
  <div class="y-input">
    <input type="text" class="input"
      v-model.trim="inputValue"
      ref="inputEle"
      @focus="handleFocus"
      @blur="handleBlur">
    <span class="close-btn"
      @click="clickClear"
      v-show="getFocus">
      <i>x</i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'YInput',
  props: {
    initValue: String,
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: this.initValue,
      getFocus: this.autofocus
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getFocus && this.$refs.inputEle.focus()
    })
  },
  methods: {
    handleFocus () {
      this.getFocus = true
    },
    handleBlur () {
      this.getFocus = false
    },
    clickClear () {
      this.inputValue = ''
    }
  },
  watch: {
    inputValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.y-input { 
  position: relative;
  width: 100%;
  .input {
    outline: none;
    padding: 5px 35px 5px 5px;
    width: 100%;
    height: 38px;
    border: none;
    // border-radius: 8px;
    background-color: #fff;
  }
  .close-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate3d(0, -50%, 0);
    width: 20px;
    height: 20px;
    text-align: center;
  }
}
</style>
