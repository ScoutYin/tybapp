export const createMap = (obj) => {
  let map = new Map()
  if (!obj) {
    return map
  }

  Object.keys(obj).forEach((key) => {
    map.set(key, obj[key])
  })
  return map
}

export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}
