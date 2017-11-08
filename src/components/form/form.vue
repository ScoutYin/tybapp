<template>
  <form class="l-form">
    <slot></slot>
  </form>
</template>

<script>

export default {
  name: 'LForm',
  componentName: 'LForm',
  props: {
    model: Object,
    labelSuffix: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '80'
    }
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    console.log('child: ', this)
  },
  methods: {
    resetFields () {
      console.log('fields: ', this.fields)
      this.fields.forEach(field => {
        field.resetField()
      })
    }
  }
}
</script>

<style class="scss">
.l-form {

}
</style>
