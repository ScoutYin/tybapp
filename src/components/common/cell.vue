<template>
  <div class="l-cell">
    <div class="l-cell-wrapper">
      <div class="l-cell-title">
        <span class="l-cell-icon" v-if="$slots.icon">
          <slot name="icon">
          </slot>
        </span>
        <span class="l-cell-text" v-if="title || $slots.title">
          <slot name="title">
            <span class="text" v-text="title"></span>
            <span v-if="label" class="label" v-text="label"></span>
          </slot>
        </span>
      </div>
      <div class="l-cell-value" :class="{'is-link': isLink}">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
    </div>
    <i v-if="isLink" class="l-cell-allow-right"></i>
  </div>
</template>

<script>
export default {
  name: 'LCell',
  componentName: 'LCell',
  props: {
    title: String,
    label: String,
    isLink: Boolean,
    value: String
  }
}
</script>

<style lang="scss">
.l-cell {
  position: relative;
  background-color: white;
  box-sizing: border-box;
  color: inherit;
  overflow: hidden;
  .l-cell-wrapper {
    display: flex;
    padding: 10px 15px;
    line-height: 1;
    width: 100%;
    align-items: center;
    .l-cell-title {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      .l-cell-icon {
        margin-right: 5px;
      }
      .l-cell-text {
        
      }
    }
    .l-cell-value {
      text-align: right;
    }
    .is-link {
      margin-right: 24px;
    }
  }
  .l-cell-allow-right {
    // position: absolute;
    // height: 100%;
    // right: 0;
    // top: 0;
    // transform: translate3d(100%, 0, 0);

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      // 稍微加点补偿
      margin-top: 1px;
      right: 20px;
      border: solid 2px #c8c8cd;
      border-bottom-width: 0;
      border-left-width: 0;
      width: 7px;
      height: 7px;
      transform: translateY(-50%) rotate(45deg);
    }
  }
}
</style>
