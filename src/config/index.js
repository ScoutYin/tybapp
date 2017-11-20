import prodEnv from './prod.env'
import devEnv from './dev.env'

export default {
  build: {
    env: prodEnv
  },
  dev: {
    env: devEnv,
    port: process.env.PORT || 3000,
    baseUrl: 'http://www.taoyu58.com/api'
    // baseUrl: 'http://192.168.12.140:3000/api'
  }
}
