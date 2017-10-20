import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const messages = {
  en: {
    Home: 'Home',
    Message: 'Message',
    'Mine': 'Mine',
    Settings: 'Settings'
  },
  zh: {
    Home: '首页',
    Message: '消息',
    'Mine': '我的',
    Settings: '设置'
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages: messages
})

export default new Vue({ i18n }).$mount('#app')
