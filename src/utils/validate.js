/***************************
 * 处理表单验证相关的一些常规方法
 ***************************/

export default {
  // 判断是否是手机号码
  isMobile: (str) => {
    const reg = /^1[3-9]\d{9}$/
    return reg.test(str)
  }
}
