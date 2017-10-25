<template>
  
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
    }
  },
  data () {
    return {
      field: []
    }
  },
  created () {
    this.$on('lform.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })

    this.$on('lform.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field.prop), 1)
      }
    })
  },
  method: {
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    }
  }
}
</script>

<style class="scss">

</style>
