<template>
  <div class="unit-button-fav-wrapper" v-permission-click="addFav">
    <l-icon :icon="isFav === 0 ? 'icon-shoucang' : 'icon-shoucang-fill'"></l-icon>
    <div class="title">收藏</div>
  </div>
</template>

<script>
import { addFavorite, getFavorite } from 'api'
export default {
  props: {
    modelId: [Number, String],
    id: [Number, String]
  },
  data () {
    return {
      isFav: 0
    }
  },
  methods: {
    async getFav () {
      try {
        let res = await getFavorite({modelid: this.modelId, id: this.id})
        if (res.data) {
          this.isFav = res.data.status
          console.log(res)
        }
      } catch (err) {
        throw err
      }
    },
    async addFav () {
      try {
        let res = await addFavorite({modelid: this.modelId, id: this.id})
        if (res.data) {
          this.isFav = res.data.status
          this.$vux.toast.text(res.data.msg, 'middle')
        }
        console.log(res)
      } catch (err) {
        throw err
      }
    }
  },
  watch: {
    id (newVal) {
      if (this.$store.getters.isLogin) {
        this.getFav()
      }
    }
  }
}
</script>

<style lang="scss">
.unit-button-fav-wrapper {
  padding: 0 10px;
  margin: auto;
  width: 60px;
  text-align: center;
  vertical-align: middle;
  .title {
    font-size: 12px;
  }
}
</style>
