import axios from './axios'

/**
 * 登录接口
 */
export const login = (params) => axios('/admin/login', params)

/**
 * 登出接口
 */
export const logout = () => axios('/admin/logout')
