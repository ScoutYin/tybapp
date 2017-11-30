export const USER_TOKEN = 'tybUserToken'

export const storage = {
  set (key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key, value)
    }
  },
  get (key) {
    if (window.localStorage) {
      let value = window.localStorage.getItem(key)
      console.log('value', value)
      return value
    }
  },
  remove (key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    }
  }
}
