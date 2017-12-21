<template>
  <l-main-layout
    :handleBack="cancel"
    class="publish-fish-container">
    <div slot="header-right" @click="save">保存</div>
    <div class="content">
      <section v-for="(item, index) in formDatas"
               :key="index"
               class="section">
        <publish-form :formDatas="item"></publish-form>
      </section>
      <l-button-commit class="button"
        type="fish"
        :method="method"
        @success="commitSuccess">发布</l-button-commit>
    </div>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
import PublishForm from 'components/publish/form'
import { createMap } from '@/utils/common'
import { addFish } from 'api'
import LButtonCommit from 'components/unit/button-commit'
import PublishMixin from '@/mixins/publish'
export default {
  name: 'MineMyFav',
  components: {
    LMainLayout,
    PublishForm,
    LButtonCommit
  },
  mixins: [PublishMixin],
  data () {
    return {
      method: addFish,
      formDatas: [
        createMap({
          'title': {
            label: '标题',
            type: 'input',
            reqauired: true
          },
          'catchtime': {
            label: '日期',
            type: 'datetime',
            reqauired: true
          },
          'address': {
            label: '所在地',
            type: 'select-city',
            reqauired: true
          }
        }),
        createMap({
          'stock': {
            label: '库存',
            type: 'input',
            reqauired: true
          },
          'norms': {
            label: '规格',
            type: 'input',
            reqauired: true
          },
          'price': {
            label: '单价',
            type: 'input',
            reqauired: true
          },
          'num': {
            label: '起售量',
            type: 'input',
            reqauired: true
          }
        }),
        createMap({
          'content': {
            label: '详细内容',
            type: 'textarea',
            reqauired: true
          }
        })
      ]
    }
  },
  mounted () {
    this.publishType = 'FISH'
  },
  methods: {
    commitSuccess () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.publish-fish-container {
  .content {
    position: relative;
    .section {
      margin-bottom: 10px;
    }
    .button {
      margin: 10px;
      background-color: $default-color;
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
    }
  }
}
</style>
