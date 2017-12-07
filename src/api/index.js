import axios from './axios'

/**
 * 登录接口
 */
export const login = (params) => axios('/admin/login', params)

/**
 * 登出接口
 */
export const logout = () => axios('/admin/logout')

/**
 * 获取商品列表接口
 * params.type = 0 获取渔船列表接口
 * params.type = 1 获取鱼获列表接口
 */
export const getGoodsList = (params) => axios('/store/goods', params)

/**
 * 获取商品详情接口
 * params.type = 0 获取渔船列表接口
 * params.type = 1 获取鱼获列表接口
 * params.id 商品的id
 */
export const getGoodsDetail = (params) => axios('/store/goods/detail', params)

/**
 * 获取商铺信息
 * params.shopid为商铺id
 */
export const getStoreShop = (params) => axios('/store/shop', params)

/**
 * 获取访问令牌
 */
export const getAccessToken = (params) => axios.get('/59f15190b135b', params)
export const userLogin = (params) => axios.post('/59ffc75e7b127', params)

// Artile
export const getArticleList = (params) => axios.get('/59f175b082680', params)
export const getArticleDetail = (params) => axios.get('/5a28fa9b24c3f', params)

// Crew
export const getCrewJobList = (params) => axios.get('/5a0270ed98967', params)
export const getCrewJobDetail = (params) => axios.get('/5a041c46a9d2b', params)
export const getCrewServiceOrg = (params) => axios.get('/5a041c60ec69c', params)
export const getCrewResumeList = (params) => axios.get('/5a041c8e31c67', params)
export const getCrewResume = (params) => axios.get('/5a05168975b7b', params)

// Common
export const getCommonThumb = (params) => axios.get('/5a0a425baa1e5', params)
export const getCommonAvatar = (params) => axios.get('/5a0a43915a839', params)
export const getCommonRegion = (params) => axios.get('/5a0bcd1c68972', params)

// Ship
export const getShipList = (params) => axios.get('/5a0e467b1df82', params)
export const getShipDetail = (params) => axios.get('/5a0e737f0f3a1', params)
export const getShipBuyList = (params) => axios.get('/5a0e755fbfbd1', params)
export const getShipBuyDetail = (params) => axios.get('/5a0e822176bd3', params)

export const getFishList = (params) => axios.get('/5a0e9b0c5b922', params)
export const getProductList = (params) => axios.get('/5a0e9e1478595', params)

export const getShopFishDetail = (params) => axios.get('/5a0e9d2bda581', params)
export const getShopProductDetail = (params) => axios.get('/5a0ea01aad1a0', params)
export const getShopList = (params) => axios.get('/5a0ea08042a2f', params)
export const getShopIndex = (params) => axios.get('/5a0ea3181e57a', params)
export const getShopProductsList = (params) => axios.get('/5a0ea485cb348', params)
export const getShopFishList = (params) => axios.get('/5a0ea8086819c', params)

// Fish
export const getFishExponent = (params) => axios.get('/5a166ad896554', params)

// Order
export const getUserOrderList = (params) => axios.get('/5a122fe1677cc', params)

export const getList = (cb, params = { max_id: -1, limit: 20 }) => {
  if (typeof cb === 'function') {
    return cb(params)
  }

  let error = new Error('cb不是一个function')
  return Promise.reject(error)
}
