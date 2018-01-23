import LIcon from './icon'
import LButton from './button'
import LCheckbox from './checkbox'

export default {
  install: (Vue) => {
    Vue.component('LIcon', LIcon)
    Vue.component('LButton', LButton)
    Vue.component('LCheckbox', LCheckbox)
  }
}
