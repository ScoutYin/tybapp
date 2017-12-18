<template>
  <div class="l-upload-picture">
    <input type="file"
          accept="image/*"
          capture="camera"
          data-role="none"
          @change="pictureChange"
          :multiple="multiple">
    <div class="picture-icon">
      <l-icon icon="icon-zhaoxiangji"></l-icon>
    </div>
    <div class="placeholder">{{ placeholder }}</div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    multiple: Boolean
  },
  methods: {
    pictureChange () {

    }
  }
}
</script>

<style lang="scss">
.l-upload-picture {
  position: relative;
  width: 150px;
  height: 100px;
  border: 1px dashed #ddd;
  text-align: center;
  color: #757575;
  .picture-icon {
    margin-top: 10px;
    font-size: 40px;
    flex: 1;
  }
  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 100px;
    opacity: 0;
  }
}
</style>
