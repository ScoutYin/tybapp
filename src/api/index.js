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
export const getGoodsList = (params) => axios('/goods', params)

/**
 * 获取商品详情接口
 * params.type = 0 获取渔船列表接口
 * params.type = 1 获取鱼获列表接口
 * params.id 商品的id
 */
export const getGoodsDetail = (params) => axios('/goods/detail', params)
