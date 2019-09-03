<template>
  <div class="container"
       :class="{lock:showRule}">
    <!-- 头部内容 -->
    <div class="header">
      <marquee-text :duration="30"
                    :repeat="10"
                    v-if="tips.length"
                    class="marquee">
        <div v-html="tipsText"></div>
      </marquee-text>
      <h1 class="logo">
        <img src="../../common/image/logo_@2x.png"
             width="185"
             height="19"
             alt="玖富证券"></h1>
      <span class="rule-btn"
            @click="onShowRule"></span>
    </div>
    <!-- 表单盒子 -->
    <div class="box">
      <div class="form-wrapper">
        <regist-form @login="handleLoginClick"
                     @regist="handleRegistClick"
                     @getCode="handleGetCodeClick"
                     @deal="handleDealClick"
                     :captchaTips="captchaTips"></regist-form>
      </div>
    </div>
    <!-- 新人特权 -->
    <box :title="staticData.privilege.title"
         class="part-1 part-wrapper">
      <p class="tip">{{staticData.privilege.tip}}</p>
      <ul class="list">
        <li class="item"
            v-for="(item,index) in staticData.privilege.list"
            :key="index">
          <span class="icon"></span>
          <strong class="font-weight font-red">{{item.label}}</strong>
          <p class="desc"
             v-html="item.desc"></p>
        </li>
      </ul>
    </box>
    <!-- 活动流程 -->
    <box :title="staticData.progress.title"
         class="part-2 part-wrapper">
      <ul class="list">
        <li class="item"
            v-for="(item,index) in staticData.progress.list"
            :key="index">
          <span class="icon"></span>
          <strong>{{item.label}}</strong>
        </li>
      </ul>
    </box>
    <!-- 值得信赖 -->
    <box :title="staticData.feature.title"
         class="part-3 part-wrapper">
      <ul class="list">
        <li class="item"
            v-for="(item,index) in staticData.feature.list"
            :key="index">
          <span class="icon"></span>
          <strong class="strong">{{item.label}}</strong>
          <p class="desc"
             v-html="item.desc"></p>
        </li>
      </ul>
    </box>
    <!-- 投资者保障 -->
    <box :title="staticData.safeguard.title"
         class="part-4 part-wrapper">
      <p class="tip">{{staticData.safeguard.tip}}</p>
      <ul class="list">
        <li class="item"
            v-for="(item,index) in staticData.safeguard.list"
            :key="index">
          <header class="card-header">
            <label class="label">{{item.label}}</label>
            <span class="logo"></span>
          </header>
          <p class="desc"
             v-html="item.desc"></p>
        </li>
      </ul>
    </box>

    <!-- 活动规则弹窗 -->
    <transition name="fade">
      <div class="dialog-wrapper"
           v-show="showRule">
        <rule-dialog :show="showRule"
                     :maskEven="false"
                     :isRule="isRule"
                     :data="dialogData"
                     @rewards="onShowRewards('register')"
                     @hide="onHideRule"
                     ref="dialog"
                     class="rule-dialog"></rule-dialog>
      </div>
    </transition>
    <!-- 底部版权-->
    <copyright></copyright>

    <!-- 加载 -->
    <!-- <cube-loading class="loading"
                  v-if="showLoading"
                  :size="24"></cube-loading> -->
  </div>

</template>

<script >
import { dialog } from '@/common/js/mixins'
import { sendCode, checkMobile, register, getRecordInfoIfeng } from '@/api'
import { getParamObjFromUrl } from '@/utils/url'
import { set } from '@/utils/storage'
export default {
  mixins: [dialog],
  data() {
    return {
      lock: false,
      showLoading: true, // 显示加载
      tips: [], // 滚动条,
      timeout: 60,
      timer: null,
      captchaTips: '获取验证码',
      eventId: '' // 验证码
    }
  },
  computed: {
    tipsText() {
      return this.tips.map(item => this._hideNumber(item.phoneNum, item.activItemName)).join('')
    }
  },
  methods: {
    // 协议跳转
    handleDealClick() {
      window.location.href = 'http://121.35.249.12:9003/webstatic/page/user_agreement.html'
    },
    // 点击登录
    handleLoginClick() {
      const query = getParamObjFromUrl()
      this.$router.push({ path: '/accounts/login', query })
    },
    // 点击获取验证码
    handleGetCodeClick(phoneNum) {
      const codeParams = Object.assign({}, { certType: 0, phoneNum })
      checkMobile({ phoneNum }).then(res => {
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
        sendCode(codeParams).then(code => {
          // 发送完成
          const { eventId } = code.result
          this.eventId = eventId
          this.timer = setInterval(() => this._countdown(), 1000)
        })
      })
    },
    _hideNumber(phone, reward) {
      phone = phone + ''
      phone = `${phone.substr(0, 3)}****${phone.substr(7)}`
      return `<span class="tip" style="margin-right:10px;display:inline-block">恭喜${phone}获得${reward}</span>`
    },
    // 倒计时
    _countdown() {
      this.timeout--
      this.captchaTips = this.timeout + 's'
      if (this.timeout < 0) {
        clearTimeout(this.timer)
        this.captchaTips = '获取验证码'
      }
    },
    // 点击注册注册
    async  handleRegistClick(obj) {
   
      // const {
      //   channelId = 1,
      //   invUserId = 1,
      //   utm_source = 'Web',
      //   utm_medium = 'mobile-pc',
      //   sourceCode = ''
      // } = getParamObjFromUrl()
      // const params = {
      //   ...obj,
      //   invUserId,
      //   sourceCode,
      //   certType: 0,
      //   userSourceChannelId: channelId,
      //   regSourceType: utm_source,
      //   regSource: utm_medium,
      //   eventId: this.eventId
      // }
      // try {
      //   const res = await register(params)
      //   if (res.code !== 0) return
      //   this.$createToast({
      //     type: 'correct',
      //     txt: '注册成功',
      //     onTimeout: () => {
      //       set('user', res)
      //       this.$router.push({ path: '/finish', query: { register: 'register' } })
      //     }
      //   }).show()
      // } catch (err) {
      //   console.log('注册错误===', err)
      // } 
    },
    // 跑马灯信息
    async _fetchTips() {
      try {
        const params = {}
        const res = await getRecordInfoIfeng(params)
        const data = res.result
        this.tips = data.reverse()
      } catch (err) {
        console.log('后台原始数据=====', err)
      }
    }
  },
  mounted() {
    this._fetchTips()
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
