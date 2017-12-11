<template>
  <l-main-layout class="message-container">
    <div class="list">
      <l-cell :title="item.title"
        :value="item.value"
        v-for="(item, index) in list"
        :key="index"
        @click.native="toPath(item.routerName)"
        class="message-cell">
        <l-icon slot="icon" :icon="item.icon"></l-icon>
      </l-cell>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
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
        { title: '我的私信', icon: 'icon-ketaiyesixin', routerName: 'MessagePersonalLetter' },
        { title: '评论', icon: 'icon-pinglun', routerName: 'MessageComment' },
        { title: '回复', icon: 'icon-liuyan', routerName: 'MessageReply' },
        { title: '系统消息', icon: 'icon-xitongxiaoxi', routerName: 'MessageSystem' }
      ]
    }
  },
  methods: {
    toPath (name) {
      if (this.$store.getters.isLogin) {
        this.$router.push({ name: name })
      } else {
        this.$store.dispatch('showLogin')
      }
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
