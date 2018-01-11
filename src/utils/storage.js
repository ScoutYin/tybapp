export const USER_TOKEN = 'tybUserToken'
export const FORM_FISH = 'tybFormFish'
export const FORM_SHIP = 'tybFormShip'
export const FORM_RECRUITING = 'tybFormRecruiting'
export const USER_NAME_DEFAULT = 'tybUserNameDefault'

export const storage = {
  set (key, value) {
    if (window.localStorage && value) {
      // value = JSON.stringify(value)
      window.localStorage.setItem(key, value)
    }
  },
  get (key) {
    if (window.localStorage) {
      let value = window.localStorage.getItem(key)
      return value
    }
  },
  remove (key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    }
  },
  setObj (key, obj) {
    if (window.localStorage && obj && typeof obj === 'object') {
      obj = JSON.stringify(obj)
      window.localStorage.setItem(key, obj)
    }
  },
  getObj (key) {
    if (window.localStorage) {
      let value = JSON.parse(window.localStorage.getItem(key))
      console.log('value: ', value)
      return value
    }
  }
}
