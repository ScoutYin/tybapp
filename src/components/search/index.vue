<template lang="html">
  <div class="mint-search">
    <div class="mint-searchbar">
      <!-- 增加一个slot，来提供返回功能 -->
      <div class="is-left">
        <slot name="left"></slot>
      </div>
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        ref="input"
        @click="visible = true"
        type="search"
        v-model="currentValue"
        :placeholder="placeholder"
        class="mint-searchbar-core">
      </div>
      <a
        class="mint-searchbar-cancel"
        @click="onCancel"
        v-show="visible"
        v-text="cancelText">
      </a>
    </div>
    <div class="mint-search-list" v-show="show || currentValue">
      <div class="mint-search-list-warp">
        <slot>
          <x-cell v-for="(item, index) in result" :key="index" :title="item"></x-cell>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import XCell from 'mint-ui/packages/cell/index.js'
export default {
  name: 'LSearch',
  data () {
    return {
      visible: false,
      currentValue: this.value
    }
  },
  components: { XCell },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  },
  props: {
    value: String,
    autofocus: Boolean,
    show: Boolean,
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  },
  methods: {
    // 上抛一个cancel事件
    onCancel () {
      this.visible = false
      this.currentValue = ''
      this.$emit('cancel')
    }
  },
  mounted () {
    this.autofocus && this.$refs.input.focus()
  }
}
</script>

<style lang="scss">
// css直接采用mint-ui的
.mint-search {
  .mint-searchbar {
    .mint-searchbar-inner {
      height: 20px;
      .mint-searchbar-core {
        margin-left: 5px;
      }
    }
  }
}
</style>
