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
