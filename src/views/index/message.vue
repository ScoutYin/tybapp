<template>
  <l-main-layout class="message-container">
    <div class="list">
      <mt-cell :title="item.title"
        :value="item.value"
        v-for="(item, index) in list"
        :key="index"
        @click.native="toPath(item.path)"
        class="message-cell">
        <i slot="icon" :class="['iconfont', item.icon]"></i>
      </mt-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
export default {
  name: 'Message',
  components: {
    LMainLayout
  },
  data () {
    return {
      list: [
        { title: '我的私信', icon: 'icon-liuyan', path: '' },
        { title: '评论', icon: 'icon-fankui', path: '' },
        { title: '回复', icon: 'icon-fankui', path: '' },
        { title: '系统消息', icon: 'icon-tongzhi', path: '' }
      ]
    }
  },
  methods: {
    toPath (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<style lang="scss">
.message-container {
  .message-cell {
    .mint-cell-text {
      vertical-align: text-top;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}
</style>
