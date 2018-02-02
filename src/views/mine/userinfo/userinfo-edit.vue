<template>
  <l-main-layout class="userinfo-edit-wrapper"
    :title="title"
    back>
    <span slot="left">取消</span>
    <span slot="header-right" v-permission-click="saveEdit">保存</span>
    <y-input
      :initValue="fieldValue"
      v-model="nowValue"
      autofocus></y-input>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import YInput from 'components/common/input'
import LButton from 'components/common/button'
import { mapGetters, mapMutations } from 'vuex'
import { editUserInfo } from 'api'

export default {
  name: 'UserinfoEdit',
  components: {
    LMainLayout,
    YInput,
    LButton
  },
  data () {
    return {
      nowValue: ''
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
    title () {
      return `${this.$route.query.field}`
    },
    fieldValue () {
      return this.$route.query.value
    },
    fieldKey () {
      return this.$route.query.key
    }
  },
  methods: {
    ...mapMutations(['USER_INFO']),
    async saveEdit () {
      let editedInfo = {}
      editedInfo[this.fieldKey] = this.nowValue
      let editedUserinfo = Object.assign({}, this.userinfo, editedInfo)
      let res = await editUserInfo(editedUserinfo)
      this.$store.dispatch('getUserInfo')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.userinfo-edit-wrapper {
  .y-input {
    margin: 12px auto;
  }
}

</style>
