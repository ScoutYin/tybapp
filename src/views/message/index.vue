<template>
  <l-main-layout class="message-container">
    <div class="list">
      <l-cell :title="item.title"
        :value="item.value"
        v-for="(item, index) in list"
        :key="index"
        @click.native="toPath(item.path)"
        class="message-cell">
        <l-icon slot="icon" :icon="item.icon"></l-icon>
      </l-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/mainLayout'
import LCell from 'components/common/cell'

export default {
  name: 'Message',
  components: {
    LMainLayout,
    LCell
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
    .iconfont {
      font-size: 22px;
    }
  }
}
</style>
