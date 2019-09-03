import ua from '@/utils/ua-parser'
import { getUserInfoAPP } from '@/utils/native-api'
import { getParamObjFromUrl } from '@/utils/url'
import * as storage from '@/utils/storage'

const promise = () => new Promise(resolve => {
  if (!ua.isApp()) {
    resolve({})
    return
  }
  getUserInfoAPP(
    {
      success: (res) => {
        resolve(res.data)
      }
    })
})

/**
 * 获取用户的信息
 * @return object
*/

export const getUserInfo = async () => { 
  const userInfoAPP = await promise()
  const userInfo = typeof userInfoAPP === 'string' ? JSON.parse(userInfoAPP) : userInfoAPP
  storage.set('userInfo', userInfo)
  return userInfo
}

class Auth {
  /** 
   * 获取设备的信息
   * @return string
  */
  
  static getDevice = () => {
    if (ua.isApp()) {
      if (ua.isAndroid()) {
        return 'android'
      } else if (ua.isIOS()) {
        return 'ios'
      } else {
        return ''
      }
    }
    return 'h5'
  }

  /*
  * 获取userId
  * @return string
  */
  
  static getUserId = async () => {
    const { userId } = getParamObjFromUrl()
    if (userId && userId !== '') {
      return Promise.resolve(userId) 
    }
    const userInfo = await getUserInfo() || {}
    return userInfo.UserCode || ''
  }

  /*
  * 获取sessionId
  * @return string
  */

  static getSessionId = async () => {
    const { sessionId } = getParamObjFromUrl()
    if (sessionId && sessionId !== '') {
      return Promise.resolve(sessionId)
    }
    const userInfo = await getUserInfo() || {}
    return userInfo.sessionId || ''
  }

  /*
  * 获取设备的皮肤
  * @return string
  * */
  
  static getSkin = async () => {
    const { skin } = getParamObjFromUrl()
    if (skin && skin !== '') {
      return Promise.resolve(skin || 'white')
    }
    const userInfo = await getUserInfo() || {}
    return userInfo.skin || 'white'
  }
}

export default Auth
