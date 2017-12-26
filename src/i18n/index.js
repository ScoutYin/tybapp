import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const messages = {
  en: {
    headerTitle: {
      Home: 'Home',
      Message: 'Message',
      Mine: 'Mine',
      Settings: 'Settings'
    }
  },
  zh: {
    headerTitle: {
      Home: '首页',
      Message: '消息',
      Mine: '我的',
      Settings: '设置'
    }
  }
}

// const i18n = new VueI18n({
//   locale: 'zh',
//   messages: messages
// })

// export default i18n

const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages // set locale messages
})

// Create a Vue instance with `i18n` option
export default new Vue({ i18n }).$mount('#app')
