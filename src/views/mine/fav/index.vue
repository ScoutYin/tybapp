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
        { title: '商铺', componentName: 'MineFavShop' },
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
.mine-fav-container {

}
</style>
