<template>
  <div class="l-search">
    <div class="l-search-header">
      <!-- 增加一个slot，来提供返回功能 -->
      <div class="is-left" v-if="canBack">
        <slot name="left">
          <l-icon icon="icon-left"></l-icon>
        </slot>
      </div>
      <div class="l-search-bar">
        <slot name="icon">
          <l-icon icon="icon-sousuo"></l-icon>
        </slot>
        <input
        ref="input"
        type="search"
        v-model="currentValue"
        :placeholder="placeholder"
        class="l-search-input">
        <l-icon
          class="l-search-clear"
          v-if="visible"
          @click.native="clear"
          icon="icon-guanbi1">
        </l-icon>
      </div>
    </div>
    <div class="l-search-list" v-show="showList || currentValue">
      <div class="l-search-list-warp">
        <slot>
          <!-- <x-cell v-for="(item, index) in result" :key="index" :title="item"></x-cell> -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LSearch',
  data () {
    return {
      visible: false,
      currentValue: this.value
    }
  },
  components: {},
  watch: {
    currentValue (val) {
      this.$emit('input', val)

      if (val) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    value (val) {
      this.currentValue = val
    }
  },
  props: {
    value: String,
    autofocus: Boolean,
    showList: Boolean,
    canBack: {
      type: Boolean,
      default: true
    },
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  },
  methods: {
    clear () {
      this.currentValue = ''
      this.visible = false
    }
  },
  mounted () {
    this.autofocus && this.$refs.input.focus()
  }
}
</script>

<style lang="scss">
.l-search {
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  .l-search-header {
    display: flex;
    height: 40px;
    padding: 8px 10px;
    background: #eee;
    .is-left {
      text-align: left;
      width: 30px;
    }
    .l-search-bar {
      display: flex;
      flex: 1;
      background: white;
      margin-right: 10px;
      border-radius: 4px;
      .icon {
        margin: auto 8px;
        font-size: 10px;
      }
      .l-search-input {
        border: none;
        font-size: 13px;
        flex: 1;
        outline: none;
        margin-right: 5px;
      }
    }
  }
  .l-search-list {
    flex: 1;
  }
}
</style>
