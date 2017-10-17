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
 * params.type = 0 获取渔船列表接口
 * params.type = 1 获取鱼获列表接口
 */
export const getGoodsList = (params) => axios('/goods', params)
