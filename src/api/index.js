import axios from './axios'

// 用户IP
export const getUserIP = (params) => axios.get('user_api/get_ip_addr', params)

// 广告资源位
export const getAds = (params) => axios.post('ad_api/findAdLinks', params)

// 获取最新股票排行
export const getList = (params) => axios.post('ipo_api/find_upnew_stocks', params)

// 用户登陆信息
export const getLogin = (params) => axios.post('user_api/user_login', params)

// 用户开户信息
export const getOpen = (params) => axios.post('open_api/processstep', params)

// 发送短信验证码
export const sendCode = (params) => axios.post('user_api/reg_valcode', params)

// 检查手机号
export const checkMobile = (params) => axios.post('user_api/valid_phone', params)

// 注册
export const register = (params) => axios.post('user_api/user_register', params)

// 获取注册人数
export const getOpenCnt = (params) => axios.post('/open_api/get_open_cnt', params)

// 活动奖励
export const getRecordInfoIfengMyself = (params) => axios.post('/activ_api/getRecordInfoIfengMyself', params)

/**
   * 是否需要图形验证码
   *
   * @return JSON { code: integer, message: string, result: true/false}
   */
export const needCaptcha = (params) => axios.post('capt/needCaptcha', params)

/**
   * 登录
   *
   * @param certCode 犇犇号/手机
   * @param pwd 密码
   * @param invUserId int 推荐人id,默认：1
   * @param captcha 验证码
   * @param sourceCode 活动渠道
   * @param certType 类型
   * 0 手机 | 1 邮箱 | 2 微信APP openId
   * 3 微博 | 4 QQ   | 5 微信uniconid
   * 6 微信公众号 |  7 交易账号 | 8 犇犇号
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
export const login = params => axios.post('user_api/user_login', params)

/**
 * 跑马灯信息
 * **/
export const getRecordInfoIfeng = params => axios.post('activ_api/getRecordInfoIfeng', params)
