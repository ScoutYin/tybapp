import LIcon from './icon'
import LButton from './button'

export default {
  install: (Vue) => {
    Vue.component('LIcon', LIcon)
    Vue.component('LButton', LButton)
  }
}
