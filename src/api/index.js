import axios from './axios'

/**
 * 登录接口
 */
export const login = (params) => axios('/admin/login', params)

/**
 * 登出接口
 */
export const logout = () => axios('/admin/logout')

export const register = () => axios.post()
export const mobileCode = (params) => axios.post('/5a5efc712841b', params)

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
export const userRegister = (params) => axios.post('/5a5efc9358971', params)

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
export const getTaglib = (params) => axios.get('/5a28e13e3a312', params)
export const getLinkage = (params) => axios.get('/5a1631062ee22', params)

// Ship
export const getShipList = (params) => axios.get('/5a0e467b1df82', params)
export const getShipDetail = (params) => axios.get('/5a0e737f0f3a1', params)
export const getShipBuyList = (params) => axios.get('/5a0e755fbfbd1', params)
export const getShipBuyDetail = (params) => axios.get('/5a0e822176bd3', params)
export const getShipRecommend = (params = {pos: 22}) => axios.get('/5a28e4b830af0', params)

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

export const getAdvert = (params) => axios.get('/5a2a4cecb607d', params)
export const getDynamicData = () => axios.get('/59f175b082680', { catid: 11, limit: 2 })

// Order
export const getUserOrderList = (params) => axios.get('/5a122fe1677cc', params)
export const getShopOrderList = (params) => axios.get('/5a45ac614a4c1', params)

export const getUserIndex = (params) => axios.get('/59ffcc65b3e15', params)

// 收藏
export const getFavorite = (params) => axios.get('/5a2f8fa052742', params)
export const getFavoriteList = (params) => axios.get('/5a122c5a4bc74', params)
export const addFavorite = (params) => axios.get('/5a2a41269811a', params)
export const delFavorite = (params) => axios.get('/5a2f905bbfac9', params)

export const uploadPictures = (params) => axios.upload('/5a03fbdbe2829', params)
export const addShip = (params) => axios.post('/5a14cab13e993', params)
export const addFish = (params) => axios.post('/5a150c5513514', params)
export const addRecruiting = (params) => axios.post('/5a12930c732b2', params)
export const addJobHunting = (params) => axios.post('/5a1292c57b971', params)

// 购物车
export const addCartItem = (params) => axios.post('/5a6543c6ea24a', params)
export const deleteCartItems = (params) => axios.post('/5a66fbb9667f1', params)
export const getCartList = (params) => axios.get('/5a6559cd72c9d', params)

export const confirmCart = (params) => axios.post('/5a684150b51c6', params)
export const createCart = (params) => axios.post('/5a74079e0b681', params)
// 地址
export const getDefaultAddress = (params) => axios.get('/5a6e7fbe7d9dd', params)
export const getAddressList = (params) => axios.get('/5a6e7f9cad09f', params)

// 开店
export const getOpenShopStatus = (params) => axios.get('/5a70371ea5f16', params)
export const applyOpenShop = (params) => axios.post('/5a702ce24b728', params)
export const getOpenShopInfo = (params) => axios.get('/5a7037541a728', params)
