/**
 * Created by Tiny on 2017/6/9.
 */

import JsToNative from './message-app'
import UserAge from './ua-parser'

// 获取用户全量信息
export function getUserInfoAPP(res) {
  JsToNative('getUserInfo', res)
}

// 使用相机接口
export function userSysCamera(res) {
  JsToNative('useSysCamera', res)
}

// 打开webview并打开链接
export function jumpUrl(res) {
  JsToNative('jumpUrl', res)
}

// 跳到APP指定页面
export function jumpPage(res) {
  JsToNative('jumpPage', res)
}

// 跳到APP指定页面
export function shareApp(res) {
  JsToNative('shareApp', res)
}

// 调用系统通讯录
export function getAddressList(res) {
  JsToNative('getAddressList', res)
}

// 关闭浏览器
export function closeWebView(res) {
  JsToNative('closeWebView', res)
}

// 自定义连拍相机接口
export function userTakePhotos(res) {
  JsToNative('userTakePhotos', res)
}

// 打电话接口
export function userMakePhone(res) {
  if (UserAge.isAndroid() && UserAge.isApp()) {
    JsToNative('userMakePhone', res)
  } else {
    window.open(`tel:${res.phone}`, '_self')
  }
}

// ST身份证识别
export function getSTIDCardModule(res) {
  JsToNative('getSTIDCardModule', res, true)
}

// ST银行卡识别
export function getSTBankCardModule(res) {
  JsToNative('getSTBankCardModule', res, true)
}

// ST活体检测
export function getSTLivenessModule(res) {
  JsToNative('getSTLivenessModule', res, true)
}

// 获取手机相关数据
/*
 * 返回 JSON数据 {}, 包含:
 * model: "手机型号"，// HUAWEI、 SUMSUNG。。。等（应该是直接手机可以读到的，未知的统一：UNKNOW）
 * version: "版本", // 系统版本，如： 10.1.2
 * system: "系统类型"， // iOS || Android || iPad || iPod 等   iOS 首字母小写，Android 首字母大写
 * screenResolution： “分辨率”， // 1280x720
 * screenSize: "屏幕实际尺寸", // 320x568 (宽x高)
 * uid: "手机唯一标识"， // 如ios的uuid，和Android的imei
 * appVersion：“返回当前app版本”， // 如1.3.1
 * carrier: "运营商"， // 手机当前运营商（可不返回）
 * */
// export function getMobileInfo(res) {
//   AppAPIList.jsBridgeToApp('getMobileInfo', res)
// }

export function openInBrowser(res) {
  // if (UserAge.isAndroid() && UserAge.isApp()) {
  JsToNative('openInBrowser', res)
  // } else {
  //   console.log(res.url)
  //   window.location.href = res.url
  // }
}

// 是否展示分享角标按钮
export function shareAppBtn(res) {
  JsToNative('shareAppBtn', res)
}

// 唤起分享底部导航栏
export function shareAppAction(res) {
  JsToNative('shareAppAction', res)
}

// 唤起分享底部导航栏
export function openPDF(res) {
  if (UserAge.isAndroid() && UserAge.isApp()) {
    JsToNative('openPDF', res)
  } else {
    window.open(res.url, '_self')
  }
}
