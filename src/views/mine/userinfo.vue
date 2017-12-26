<template>
  <l-main-layout back>
    <cell-list>
      <cell v-for="(item, index) of fieldsKeys"
        :key="index"
        :title="fields.get(item)"
        :value="userinfo[item]"></cell>
    </cell-list>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import { mapGetters } from 'vuex'
import Cell from 'components/common/cell'
import CellList from 'components/common/cell-list'
import { createMap } from '@/utils/common'
export default {
  components: {
    LMainLayout,
    Cell,
    CellList
  },
  computed: {
    fieldsValues () {
      return [...this.fields.values()]
    },
    fieldsKeys () {
      return [...this.fields.keys()]
    },
    ...mapGetters([
      'userinfo'
    ])
  },
  data () {
    return {
      fields: createMap({
        username: '昵称',
        mobile: '手机',
        email: '邮箱',
        company: '公司',
        address: '地址'
      })
    }
  },
  mounted () {
    console.log('userinfo: ', this.userinfo)
  }
}
</script>

<style lang="scss">

</style>
