<template>
  <div class="l-part-line">
    <div class="text">
      <span v-if="$slots.left" class="left">
        <slot name="left"></slot>
      </span>
      <span v-text="text" v-if="text"></span>
      <span v-if="$slots.right" class="right">
        <slot name="right"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LPartLine',
  componentName: 'LPartLine',
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.l-part-line {
  padding: 10px;
  .text {
    text-align: center;
    font-size: 13px;
    display: flex;

    &>span {
      flex-grow: 2;
    }

    // 因为改变text-align 把左右的间距合并，所以flex-grow是中间的一半
    .left {
      text-align: right;
      flex-grow: 1;
    }

    .right {
      text-align: left;
      flex-grow: 1;
    }

    &:after, &:before {
      content: "";
      margin-top: 8px;
      display: inline-block;
      height: 0;
      border-top: 1px solid #cfcfcf;
      flex-grow: 10;
    }
  }
}
</style>
