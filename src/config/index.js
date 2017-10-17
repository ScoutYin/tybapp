import prodEnv from './prod.env'
import devEnv from './dev.env'

export default {
  build: {
    env: prodEnv
  },
  dev: {
    env: devEnv,
    port: process.env.PORT || 3000,
    baseUrl: 'http://localhost:3000/api'
    // baseUrl: 'https://jsonplaceholder.typicode.com'
  }
}
