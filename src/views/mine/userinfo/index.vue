<template>
  <l-main-layout class="myinfo-wrapper" back>
    <span slot="left">我的</span>
    <cell-list class="myinfo-list">
      <cell title="头像" v-is-link >
        <img class="avatar" :src="avatarThumb || ''">
      </cell>
      <cell title="会员类型"
      :value="userType"></cell>
      <cell v-for="(item, index) of fieldsKeys"
        :key="index"
        :title="fields.get(item)"
        :value="userinfo[item]"
        @click.native="toEdit(item, fields.get(item), userinfo[item])"
        v-is-link="isEdittable(item)">
      </cell>
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
    fields () {
      if (this.userinfo.modelid === '3') {
        return this.personFields
      }
      if (this.userinfo.modelid === '4') {
        return this.companyFields
      }
    },
    fieldsValues () {
      return [...this.fields.values()]
    },
    fieldsKeys () {
      return [...this.fields.keys()]
    },
    avatarThumb () {
      return this.userinfo.avatar_thumb
    },
    userType () {
      let type
      switch (this.userinfo.modelid) {
        case '3': type = '个人会员'
          break
        case '4': type = '企业会员'
          break
        default:
          break
      }
      return type
    },
    ...mapGetters([
      'userinfo'
    ])
  },
  data () {
    return {
      personFields: createMap({
        nickname: '昵称',
        realname: '真实姓名',
        mobile: '手机',
        address: '详细地址'
      }),
      companyFields: createMap({
        company: '企业名称',
        phone: '电话',
        email: '邮箱',
        introduce: '企业介绍',
        address: '详细地址'
      }),
      // 不可点击进行编辑的字段
      notEdittableFields: ['email']
    }
  },
  mounted () {
    console.log('userinfo: ', this.userinfo)
  },
  methods: {
    isEdittable (item) {
      return this.notEdittableFields.indexOf(item) < 0
    },
    toEdit (fieldKey, fieldToEdit, nowValue) {
      if (!this.isEdittable(fieldKey)) {
        return
      }
      this.$router.push({name: 'UserinfoEdit', query: {key: fieldKey, field: fieldToEdit, value: nowValue}})
    }
  }
}
</script>

<style lang="scss">
@import '../../../common/style/var.scss';
.myinfo-wrapper {
  .avatar {
    margin-right: 15px;
    border: none;
    border-radius: 8px;
    width: 60px;
    height: 60px;
  }
  .myinfo-list {
    margin-top: 14px;
    border-top: 1px solid $line-color;
    border-bottom: 1px solid $line-color;
  }
}
</style>
