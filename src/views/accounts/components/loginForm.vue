<template>
  <section class="login">
    <div class="login-form">
      <div class="form-item">
        <div class="item-input">
          <template v-if="loginOther">
            <span @click="handleShowCountryList" class="item-country">
              +{{currentCode}}
            </span>
          </template>
          <input v-model.trim="loginForm.certCode" type="text" placeholder="犇犇号/手机号码">
        </div>
        <div class="item-tips error-msg">{{loginRules.certCode.tips}}</div>
      </div>
      <div class="form-item">
        <div class="item-input">
          <input v-model.trim="loginForm.pwd" :type="passwordType" placeholder="请输入登录密码">
          <span class="item-icon" @click="handleTogglePassword">
            <i :class="iconEyeClass"></i>
          </span>
        </div>
        <div class="item-tips error-msg">{{loginRules.pwd.tips}}</div>
      </div>
      <template v-if="showCaptcha">
        <div class="form-item">
          <div class="item-input">
            <input v-model.trim="loginForm.captcha" type="text" placeholder="请输入验证码">
            <img
              class="item-captcha"
              :src="captchaSrc"
              @click="handleCaptchaSrc"/>
          </div>
          <div class="item-tips error-msg">{{loginRules.captcha.tips}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="item-link">
          <template v-if="loginOther">
            <router-link :to="{name: 'login', query }">更多登录方式</router-link>
          </template>
          <template v-else>
            <router-link :to="{name: 'login-other', query }">境外手机号登录</router-link>
          </template>
          <router-link :to="{name: 'password-reset', query}">忘记密码</router-link>
        </div>
      </div>
      <div class="form-item form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">登录</cube-button>
      </div>
    </div>

    <template v-if="loginOther && showCountryList">
      <country-list @selectItem="selectItem" />
    </template>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { HOST } from '@/api/config'
import { param2Obj } from '@/utils/url'
import * as storage from '@/utils/storage'

const defaultSrc = HOST + '/capt/showCaptcha.jpg?v='
const defaultPassword = 'password'
const defaultCountryCode = '86'

export default {
  props: {
    loginOther: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordType: defaultPassword,
      currentCode: defaultCountryCode,
      showCountryList: false,
      captchaSrc: '',
      loginForm: {
        certCode: '',
        pwd: '',
        captcha: ''
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
  created() {
    this.fetchNeedCaptcha()
  },
  computed: {
    ...mapGetters([
      'showCaptcha'
    ]),
    query() {
      return this.$route.query
    },
    isDisabled() {
      const { certCode, pwd, captcha } = this.loginForm
      const nocaptchaReg = certCode.length && pwd.length
      const result = this.showCaptcha ? (nocaptchaReg && captcha.length) : nocaptchaReg
      return result < 1
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
      this.currentCode = value
      this.showCountryList = false
    },
    // 1.检验是否需要图形验证码
    fetchNeedCaptcha() {
      this.$store.dispatch('needCaptcha')
        .then(res => {
          // 1.1成功则执行获取图形验证码
          res && this.handleCaptchaSrc()
        })
    },
    // 2.切换登录密码是否明文
    handleTogglePassword() {
      if (this.passwordType === defaultPassword) {
        this.passwordType = 'text'
      } else {
        this.passwordType = defaultPassword
      }
    },
    // 3.获取验证码
    handleCaptchaSrc() {
      this.captchaSrc = defaultSrc + Date.now()
    },
    // 4.处理登录
    handleSubmit() {
      const isValid = this.chechFormRules()
      // 4.1验证通过
      if (isValid) {
        const { invUserId = 1, sourceCode = '' } = param2Obj()

        // 4.1.1对当前登录账户类型判断
        const currentCode = this.currentCode
        const account = this.loginForm.certCode
        const certCode = currentCode === defaultCountryCode ? account : `${currentCode}-${account}`
        const certType = certCode.indexOf('-') >= 0 ? 0 : (/^1[3-9]\d{9}$/.test(account) ? 0 : 8)

        const params = Object.assign({}, this.loginForm, { certCode, certType, invUserId, sourceCode })
        this.$store.dispatch('login', params)
          .then(res => {
            // 4.2登录成功
            if (res.code === 0) {
              if (res.result && res.result.userSourceChannelId !== '216') {
                this.$createToast({
                  type: 'error',
                  txt: 'hi老司机，登录APP参与其他活动吖',
                  time: 3000,
                  onTimeout: () => {
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sunline.android.sunline'
                  }
                }).show()
                return
              }
              storage.set('user', res)
              this.handleLoginSuccess()
            }
          })
          .catch(() => {
            // 4.3是否需要验证码
            this.fetchNeedCaptcha()
          })
      }
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
    // 6.登录成功后跳转页面
    handleLoginSuccess() {
      this.$router.push({ path: '/finish', query: { login: 'login' } })
    },
    // 7.表单校验
    chechFormRules () {
      const { certCode, pwd, captcha } = this.loginForm

      if (!certCode) {
        this.loginRules.certCode.tips = '请输入犇犇号/手机号码'
        return false
      } else {
        this.loginRules.certCode.tips = ''
      }

      if (!pwd) {
        this.loginRules.pwd.tips = '请输入登录密码'
        return false
      } else {
        this.loginRules.pwd.tips = ''
      }

      if (this.showCaptcha && !captcha) {
        this.loginRules.captcha.tips = '请输入验证码'
        return false
      } else {
        this.loginRules.captcha.tips = ''
      }

      return true
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../main';
</style>
