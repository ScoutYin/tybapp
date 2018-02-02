<template>
  <l-main-layout back>
    <input type="file"
    accept="image/*"
    capture="camera"
    data-role="none"
    multiple>
  </l-main-layout>
</template>

<script>
import LMainLayout from 'components/layout/main-layout'
// import Pic from 'components/upload/picture-item'
export default {
  name: 'UserAvatarEdit',
  components: {
    LMainLayout
    // Pic
  }
}
</script>

<style lang="scss">

</style>
