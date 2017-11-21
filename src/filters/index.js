import Vue from 'vue'

const lPrice = Vue.filter('lPrice', (price) => {
  if (!price) return ''
  price = price.toString()
  if (price === '0.00' || price === '0') {
    return '面议'
  } else {
    return `￥${price}`
  }
})

export default {
  lPrice
}
