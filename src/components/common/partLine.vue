<template>
  <div class="l-part-line">
    <div class="text">
      <span v-text="text" v-if="text"></span>
      <span v-if="$slots.middle">
        <slot name="middle"></slot>
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
  .text {
    text-align: center;
    font-size: 13px;
    display: flex;

    &>span {
      flex-grow: 1;
    }

    &::after, &::before {
      content: "";
      margin-top: 8px;
      display: inline-block;
      height: 0;
      border-top: 1px solid #cfcfcf;
      flex-grow: 5;
    }
  }
}
</style>
