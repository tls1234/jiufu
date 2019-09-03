<template>
  <section class="login">
    <div class="login-form">
      <div class="form-item">
        <div class="item-input">
          <span @click="handleShowCountryList" class="item-country">
            +{{countryCode}}
          </span>
          <input v-model.trim="loginForm.certCode" type="text" placeholder="请输入手机号码">
        </div>
        <div class="item-tips error-msg">{{loginRules.certCode.tips}}</div>
      </div>
      <div class="form-item">
        <div class="item-input">
          <input v-model.trim="loginForm.captcha" type="text" placeholder="请输入短信验证码">
          <span :class="itemCodeClass" @click="handleSendCode">
            {{captchaTips}}
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.captcha.tips}}</div>
      </div>
      <div class="form-item">
        <div class="item-input">
          <input v-model.trim="loginForm.pwd" :type="passwordType" :placeholder="placeholder">
          <span class="item-icon" @click="handleTogglePassword">
            <i :class="iconEyeClass"></i>
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.pwd.tips}}</div>
      </div>

      <div class="form-item form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">{{submitText}}</cube-button>
      </div>
    </div>
    <template v-if="showCountryList">
      <country-list @selectItem="selectItem" />
    </template>
  </section>
</template>

<script>
import { getParamObjFromUrl } from '@/utils/url'
import validate from '@/utils/validate'
import * as storage from '@/utils/storage'

const defaultPassword = 'password'
const defaultCountryCode = '86'
const defaultCaptchaTips = '获取验证码'

export default {
  props: {
    registerType: {
      type: Number,
      default: 1
    },
    submitText: {
      type: String,
      default: '立即注册'
    },
    placeholder: {
      type: String,
      default: '请设置密码（6-16位字符）'
    }
  },
  data() {
    return {
      passwordType: defaultPassword,
      countryCode: defaultCountryCode,
      captchaTips: defaultCaptchaTips,
      showCountryList: false,
      isSendCode: false,
      timer: null,
      timeout: 60,
      loginForm: {
        certCode: '',
        pwd: '',
        captcha: '',
        eventId: 0
      },
      loginRules: {
        certCode: {
          tips: ''
        },
        pwd: {
          tips: ''
        },
        captcha: {
          tips: ''
        }
      }
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
    isCanSend() {
      return this.loginForm.certCode.length > 1
    },
    isDisabled() {
      const { certCode, pwd, captcha } = this.loginForm
      const result = certCode.length && pwd.length && captcha.length
      return result < 1
    },
    itemCodeClass() {
      return {
        'item-code': true,
        'active': this.isCanSend
      }
    },
    iconEyeClass() {
      const hide = this.passwordType === defaultPassword
      return {
        'icon-eye': true,
        'icon-eye-close': hide,
        'icon-eye-open': !hide
      }
    }
  },
  methods: {
    handleShowCountryList() {
      this.showCountryList = true
    },
    selectItem(item) {
      const { value } = item
      this.countryCode = value
      this.showCountryList = false
    },
    handleSendCode() {
      if (this.isSendCode || !this.isCanSend) return false
      // 发送前 --> 校验手机是否合法
      const countryCode = this.countryCode
      const account = this.loginForm.certCode

      if (countryCode === defaultCountryCode && !validate.isMobile(account)) {
        this.loginRules.certCode.tips = '请输入正确的手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (!account) {
        this.loginRules.certCode.tips = '手机号码不能为空'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      // 发送中
      this.isSendCode = true
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
      const phoneParmas = { phoneNum: certCode }
      switch (this.registerType) {
      case 1:
        // 默认注册
        this.fetchRegister(phoneParmas)
        break
      case 2:
        // 找回密码
        this.fetchPasswordRest(phoneParmas)
        break
      default:
        this.fetchRegister(phoneParmas)
        break
      }
    },
    fetchRegister(phoneParmas) {
      this.$store.dispatch('checkMobile', phoneParmas)
        .then(res => {
          const { isReg } = res.result
          if (isReg === 'Y') {
            this.$createToast({
              type: 'error',
              txt: '手机号已被其他用户注册',
              onTimeout: () => {
                this.isSendCode = false
              }
            }).show()
            return false
          }
          this.fetchPasswordRest(phoneParmas)
        })
    },
    fetchPasswordRest(phoneParmas) {
      const codeParams = Object.assign({}, { certType: 0 }, phoneParmas)
      this.$store.dispatch('sendCode', codeParams)
        .then(code => {
          // 发送完成
          const { eventId } = code.result
          this.loginForm.eventId = eventId
          this.timer = setInterval(() => this.timeClock(), 1000)
        })
    },
    // 倒计时
    timeClock() {
      this.timeout--
      this.captchaTips = this.timeout + 's'
      if (this.timeout < 0) {
        clearTimeout(this.timer)
        this.isSendCode = false
        this.captchaTips = defaultCaptchaTips
      }
    },
    // 2.切换登录密码是否明文
    handleTogglePassword() {
      if (this.passwordType === defaultPassword) {
        this.passwordType = 'text'
      } else {
        this.passwordType = defaultPassword
      }
    },
    // 4.处理提交
    handleSubmit() {
      const isValid = this.chechFormRules()
      // 4.1验证通过
      if (isValid) {
        switch (this.registerType) {
        case 1:
          // 默认注册
          this.submitRegister()
          break
        case 2:
          // 找回密码
          this.submitPasswordReset()
          break
        case 3:
          // 手机号绑定
          this.submitPhoneBind()
          break
        default:
          this.submitRegister()
          break
        }
      }
    },
    submitPhoneBind() {
      const countryCode = this.countryCode
      const account = this.loginForm.certCode
      const phoneNum = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`

      const params = Object.assign({}, this.loginForm, { phoneNum })
      this.$store.dispatch('updateMobile', params)
        .then(() => {
          this.$createToast({
            type: 'correct',
            txt: '绑定成功',
            onTimeout: () => {
              this.handleLoginSuccess()
            }
          }).show()
        })
    },
    submitPasswordReset() {
      const countryCode = this.countryCode
      const newPwd = this.loginForm.pwd
      const account = this.loginForm.certCode
      const phoneNum = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`

      const params = Object.assign({}, this.loginForm, { phoneNum, newPwd })
      this.$store.dispatch('resetPassword', params)
        .then(() => {
          this.$createToast({
            type: 'correct',
            txt: '操作成功，请返回重新登录',
            time: 3000,
            onTimeout: () => {
              this.handlePasswordSuccess()
            }
          }).show()
        })
    },
    submitRegister() {
      const { channelId = 1, invUserId = 1, utm_source = 'Web', utm_medium = 'mobile-pc', sourceCode = '' } = getParamObjFromUrl()

      const countryCode = this.countryCode
      const account = this.loginForm.certCode
      const certCode = countryCode === defaultCountryCode ? account : `${countryCode}-${account}`
      const certType = 0

      const params = Object.assign({}, this.loginForm, { certCode, certType, invUserId, sourceCode, userSourceChannelId: channelId, regSourceType: utm_source, regSource: utm_medium })
      this.$store.dispatch('register', params)
        .then(res => {
          if (res.code === 0) {
            this.$createToast({
              type: 'correct',
              txt: '注册成功',
              onTimeout: () => {
                storage.set('user', res)
                this.handleLoginSuccess()
                // this.getUserType(this.handleLoginSuccess)
              }
            }).show()
          }
        })
    },
    // 5.判断用户类型
    getUserType(callback) {
      this.$store.dispatch('getUserType')
        .then(res => {
          // 5.1判断用户
          if (res && res.type === 2) {
            // 5.1.1登出
            this.$store.dispatch('logout')
            // 5.1.2重定向去玖富股票APP下载
            location.href = 'https://sns.9fstock.com/webstatic/downApp/download_stock.html'
          }
          // 5.2回调登录成功函数
          callback && callback()
        })
    },
    // 6.找回密码成功
    handlePasswordSuccess() {
      // 找回密码后 --> 登出 -> 回登录页 --> 重新登录
      this.$store.dispatch('logout', {})
        .then(() => {
          this.$router.replace({ name: 'login', query: this.query })
        })
    },
    // 7.登录成功后跳转页面
    handleLoginSuccess() {
      this.$router.push({ path: '/finish', query: { register: 'register' } })
      // const { redirect = '/' } = this.query
      // this.$router.replace({ path: redirect })
    },
    // 8.表单校验
    chechFormRules () {
      const { certCode, pwd, eventId, captcha } = this.loginForm

      if (!certCode) {
        this.loginRules.certCode.tips = '请输入正确的手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (eventId === 0) {
        this.loginRules.captcha.tips = '请先获取验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      if (!captcha) {
        this.loginRules.captcha.tips = '请输入验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      if (!pwd || pwd.length < 6 || pwd.length > 16) {
        this.loginRules.pwd.tips = '密码必须为6-16位字符'
        return false
      } else {
        this.loginRules.pwd.tips = ''
      }

      return true
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
