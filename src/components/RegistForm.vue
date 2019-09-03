<template>
  <div class="form">
    <div class="phone-wrapper wrapper">
      <cube-input v-model="phone"
                  placeholder="请输入手机号"
                  :maxlength="11"
                  class="input"></cube-input>
    </div>
    <div class="code-wrapper wrapper">
      <cube-input v-model="code"
                  class="input"
                  :maxlength="4"
                  placeholder="请输入4位短信验证码"></cube-input>
      <button class="code-btn"
              @click="handleGetCodeClick">{{captchaTips}}</button>
    </div>
    <div class="pwd-wrapper wrapper">
      <cube-input v-model="password"
                  class="input"
                  type="password"
                  :maxlength="16"
                  placeholder="请设置密码(6-16位字母、数字或字符)"
                  :eye="eye"></cube-input>
    </div>
    <cube-button class="submit-btn"
                 :class="{disabled}"
                 @click="handleRegistClick">
      <span class="text">立即领取福利</span>
    </cube-button>
    <div class="agreen-wrapper">
      <div class="agreen">
        <cube-checkbox v-model="checked"
                       class="checkbox font-red">
          我同意
        </cube-checkbox>
        <span class="font-red"
              @click.stop="handleDealClick">《用户协议》</span>
      </div>
      <div class="login">
        已有账号？<span class="font-red"
              @click="handleLoginClick">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
const REG_PHONE = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ // 手机号码
const PASSWORD_REG = /^[a-zA-Z0-9]{6,16}$/ // 6-16位任意字符
export default {
  data() {
    return {
      disabled: true,
      code: '', // 验证码
      password: '', // 密码
      phone: '', // 手机号
      checked: true // 用户协议
    }
  },
  computed: {
    eye() {
      return {
        open: false,
        reverse: false
      }
    }
  },
  props: {
    captchaTips: {
      type: String,
      default: '发送验证码'
    }
  },
  methods: {
    // 点击验证码
    handleGetCodeClick() {
      if (this.phone === '') {
        this._showWarning('请输入手机号')
        return
      } else if (!REG_PHONE.test(this.phone)) {
        this._showWarning('手机号码不正确')
        return
      }
      this.$emit('getCode', this.phone)
    },

    // 点击协议
    handleDealClick() {
      this.$emit('deal')
    },

    // 点击登录
    handleLoginClick() {
      this.$emit('login')
    },

    // 点击注册
    handleRegistClick() {
      this.$router.push({ path: '/finish'})
      // if (this.phone === '') {
      //   this._showWarning('请输入手机号')
      //   return
      // } else if (this.code === '') {
      //   this._showWarning('请输入验证码')
      //   return
      // } else if (this.password === '') {
      //   this._showWarning('请输入密码')
      //   return
      // } else if (!REG_PHONE.test(this.phone)) {
      //   this._showWarning('手机号码不正确')
      //   return
      // } else if (this.code.length !== 4) {
      //   this._showWarning('验证码不正确')
      //   return
      // } else if (!PASSWORD_REG.test(this.password)) {
      //   this._showWarning('密码有误')
      //   return
      // } else if (!this.checked) {
      //   // this._showWarning('请阅读并同意用户协议')
      //   // return
      //   this.checked = true
      // }
      // const { phone, password, code } = this
      // this.$emit('regist', { certCode: phone, pwd: password, captcha: code })
    },
    // 封装错误Tost
    _showWarning(txt) {
      this.$createToast({ txt, type: 'warn' }).show()
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.form
  position relative
  .wrapper
    display flex
    margin-bottom 20px
    .input
      flex 1
      height 80px
      overflow hidden
      font-size 26px
      border 1.5px solid #f1a481
      border-radius 40px
      &:after
        border none
    &>>> .cube-input-field
      background-color transparent
      overflow hidden
    .code-btn
      width 210px
      height 80px
      flex 0 0 210px
      margin-left 12px
      background-color #e8634c
      color #fff
      border none
      border-radius 50px
      &:focus, &:active
        outline none
        background-color #e3412c
  .submit-btn
    submit-btn()
    margin-bottom 30px
  .agreen-wrapper
    display flex
    justify-content space-between
    align-items center
    .checkbox
      display inline-block
    & >>> .cube-checkbox
      padding-left 0
      padding-right 0
</style>
