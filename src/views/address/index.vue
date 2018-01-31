<template>
  <l-main-layout class="address-list-container" back>
    <div v-for="(item, index) of list" :key="index" class="content" @click="select(index)">
      <div class="head">
        <div class="name">
          {{ item.consignee }}
        </div>
        <div class="tel">
          {{ item.mobile || item.phone }}
        </div>
      </div>
      <div class="address">
        <span v-if="parseInt(item.isdefault)" class="default">
          [默认地址]
        </span>
        <span>{{ item.address }}</span>
      </div>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { getAddressList } from 'api'
export default {
  components: {
    LMainLayout
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      let res = await getAddressList()
      this.list = res.data
      console.log('this.list: ', this.list)
    },
    select (index) {
      this.$store.commit('SET_ADDRESS', this.list[index])
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.address-list-container {
  display: flex;
  // background: #fff;
  margin: 10px 0;
  .content {
    padding: 10px;
    flex: 1;
    line-height: 1.5;
    font-size: 13px;
    background: #fff;
    border-bottom: 1px solid #eee;
    .head {
      display: flex;
      justify-content: space-between;
      .name {
        flex: 1;
      }
      .tel {
        text-align: right;
      }
    }
    .default {
      color: red;
    }
  }
}
</style>
