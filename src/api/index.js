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
export const getAccessToken = (params) => axios('/59f15190b135b', params)
export const userLogin = (params) => axios('/59ffc75e7b127', params, 'post')

// Artile
export const getArticleIndex = (params) => axios('/59f175b082680', params)

// Crew
export const getCrewJobList = (params) => axios('/5a0270ed98967', params)
export const getCrewJobDetail = (params) => axios('/5a041c46a9d2b', params)
export const getCrewServiceOrg = (params) => axios('/5a041c60ec69c', params)
export const getCrewResumeList = (params) => axios('/5a041c8e31c67', params)
export const getCrewResume = (params) => axios('/5a05168975b7b', params)

// Common
export const getCommonThumb = (params) => axios('/5a0a425baa1e5', params)
export const getCommonAvatar = (params) => axios('/5a0a43915a839', params)
export const getCommonRegion = (params) => axios('/5a0bcd1c68972', params)

// Ship
export const getShipList = (params) => axios('/5a0e467b1df82', params)
export const getShipDetail = (params) => axios('/5a0e737f0f3a1', params)
export const getShipBuyList = (params) => axios('/5a0e755fbfbd1', params)
export const getShipBuyDetail = (params) => axios('/5a0e822176bd3', params)

export const getFishList = (params) => axios('/5a0e9b0c5b922', params)
export const getProductList = (params) => axios('/5a0e9e1478595', params)

export const getShopFishDetail = (params) => axios('/5a0e9d2bda581', params)
export const getShopProductDetail = (params) => axios('/5a0ea01aad1a0', params)
export const getShopList = (params) => axios('/5a0ea08042a2f', params)
export const getShopIndex = (params) => axios('/5a0ea3181e57a', params)
export const getShopProductsList = (params) => axios('/5a0ea485cb348', params)
export const getShopFishList = (params) => axios('/5a0ea8086819c', params)
