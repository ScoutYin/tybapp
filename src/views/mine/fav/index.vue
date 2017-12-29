<template>
  <slider-tabview-layout :items="tabItems"></slider-tabview-layout>
</template>

<script>
import SliderTabviewLayout from 'components/layout/slider-tabview-layout'
export default {
  name: 'MineMyFav',
  components: {
    SliderTabviewLayout
  },
  data () {
    return {
      selected: -1,
      tabItems: [
        { title: '产品', componentName: 'MineFavProduct' },
        // { title: '商铺', componentName: 'MineFavShop' },
        { title: '渔船', componentName: 'MineFavShip' },
        { title: '渔获', componentName: 'MineFavFish' }
        // { title: '职位', componentName: 'MineFavJob' },
        // { title: '简历', componentName: 'MineFavResume' }
      ]
    }
  }
}
</script>

<style lang="scss">
.mine-fav-layout-container {
  .fav-list {
    display: flex;
    width: 375px;
    flex-wrap: wrap;
    padding: 0 5px;
    margin: 0 auto;
    justify-content: flex-start;
    .item {
      margin: 10px 5px;
      width: 170px;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      .image {
        width: 100%;
        height: 100px;
      }
      .content {
        margin: 5px;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}
</style>
