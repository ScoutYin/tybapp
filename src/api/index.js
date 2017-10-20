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
