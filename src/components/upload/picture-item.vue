<template>
  <div class="l-upload-picture-item">
    <template v-if="!path">
      <div class="picture-icon">
        <l-icon icon="icon-zhaoxiangji"></l-icon>
      </div>
      <div class="placeholder">{{ placeholder }}</div>
    </template>
    <template v-else>
      <img :src="path" class="picture-img">
      <div class="icon-guanbi" @click="deletePicture">
        <l-icon icon="icon-guanbi"></l-icon>
      </div>
    </template>
    <input type="file"
          accept="image/*"
          capture="camera"
          data-role="none"
          @change="pictureChange"
          :multiple="multiple">
  </div>
</template>

<script>
import { uploadPictures } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'LUploadPictureItem',
  props: {
    placeholder: String,
    multiple: Boolean,
    id: String,
    path: String
  },
  computed: {
    ...mapGetters([
      'uploadPictureCache'
    ])
  },
  data () {
    return {
      file: {}
    }
  },
  methods: {
    async pictureChange (event) {
      console.log('pictureChange', event)
      let files = event.target.files
      this.file = files && files.length > 0 && files[0]
      try {
        let res = await uploadPictures({file: this.file})
        this.$emit('upload', this.id, res.data)
      } catch (err) {
        throw err
      }
    },
    deletePicture () {
      this.$emit('delete', this.id)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/style/var.scss';

.l-upload-picture-item {
  position: relative;
  width: 150px;
  height: 100px;
  border: 1px dashed #ddd;
  text-align: center;
  color: $placeholder-color;
  border-radius: 5px;
  .picture-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .picture-icon {
    margin-top: 10px;
    font-size: 40px;
    flex: 1;
  }
  .icon-guanbi {
    position: absolute;
    right: 0;
    top: 0;
    padding: 2px;
    margin: 5px;
    font-size: 12px;
    z-index: 10;
    background: rgba(7, 17, 27, 0.2);
    border-radius: 4px;
    color: #fff;
  }
  &>input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 100px;
    opacity: 0;
  }
}
</style>
