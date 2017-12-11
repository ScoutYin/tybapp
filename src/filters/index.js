import Vue from 'vue'
import moment from 'moment'

const price = Vue.filter('lPrice', (price) => {
  if (!price) { return '' }
  price = price.toString()
  if (price === '0.00' || price === '0') {
    return '面议'
  } else {
    return `￥${price}`
  }
})

const time2Date = Vue.filter('time2Date', (time) => {
  if (!time) {
    return time
  }
  return moment(time * 1000).format('YYYY-MM-DD HH:MM')
})

const fullThumb = Vue.filter('fullThumb', (thumb) => {
  if (!thumb) {
    return thumb
  }
  // 暂时写死拼接
  return 'http://www.taoyu58.com' + thumb
})

// content里面的img标签是相对路径
const fullImg = Vue.filter('fullImg', (content) => {
  return content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, url) => {
    return 'http://www.taoyu58.com' + url
  })
})

const buytype = Vue.filter('buytype', (type) => {
  let _type = parseInt(type)
  if (_type === 1) {
    return '出售'
  } else if (_type === 2) {
    return '出租'
  }
})

export default {
  price,
  time2Date,
  fullThumb,
  buytype,
  fullImg
}
