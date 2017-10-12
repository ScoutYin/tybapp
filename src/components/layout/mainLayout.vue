<template>
  <div class="main-layout-container">
    <mt-header :title="headerTitle" fixed>
      <mt-button icon="back" slot="left" @click.native="goBack" v-if="back">返回</mt-button>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <main class="main">
      <slot></slot>
    </main>
  </div>

</template>

<script>
export default {
  name: 'MainLayout',
  props: {
    back: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headerTitle: this.$route.name
    }
  },
  created () {
    if (this.title) {
      this.headerTitle = this.title
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.main-layout-container {
  height: 100%;
  .main {
    position: absolute;
    top: 40px;
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
