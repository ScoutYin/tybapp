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

export const createMultipleMap = (key, obj, index = 0) => {
  if (!key || isEmptyObject(obj)) {
    return new Map()
  }

  let mapInner = new Map()

  Object.keys(obj).forEach((_key) => {
    const _newKey = `${key}[${_key}][${index}]`
    mapInner.set(_newKey, obj[_key])
  })

  return mapInner
}

export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}
