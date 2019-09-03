<template>
  <transition name="fade">
    <div class="finish">
      <div class="header">
        <span class="rule-btn"
              @click="onShowRule"></span>
      </div>
      <box class="box">
        <template v-if="isFirst">
          <p class="text success font-red">注册成功</p>
          <p class="text">
            <label>您的犇[bēn]犇号:</label>
            <span class=" font-red">{{code}}</span>
          </p>
          <p class="text">您可通过犇犇号或手机号登录玖富犇犇APP</p>
        </template>

        <div class="submit-btn-wrapper"
             :class="{second:!isFirst}">
          <cube-button class="submit-btn"
                       @click="handleOpenClick">
            <span class="text">我要开户奖励</span>
          </cube-button>
          <p class="tip">下载玖富犇犇APP，开户成功即享永久免佣特权</p>
          <div class="img">
            <span class="num">仅剩&nbsp;{{openPeople}}&nbsp;名额</span>
          </div>
        </div>
      </box>
      <!-- 底部 -->
      <copyright></copyright>
      <bottom-bar class="bar"
                  @link="handleLinkClick"></bottom-bar>
      <!-- 活动规则弹窗 -->
      <div class="dialog-wrapper"
           v-show="showRule">
        <rule-dialog :show="showRule"
                     :maskEven="false"
                     :isRule="isRule"
                     :data="dialogData"
                     @rewards="onShowRewards('finsh')"
                     @hide="onHideRule"
                     ref="dialog"
                     class="rule-dialog"></rule-dialog>
      </div>
    </div>
  </transition>
</template>

<script>
import { dialog } from '@/common/js/mixins'
import { jumpUrl } from '@/utils/native-api'
import { getOpenCnt, getRecordInfoIfengMyself } from '@/api/index'
import ua from '@/utils/ua-parser'
import Auth from '@/api/auth'
import { get } from '@/utils/storage'

let env = window.location.href.match('10.1.2.54')

export default {
  mixins: [dialog],
  data() {
    return {
      isFirst: true, // 是否是第一次登入，默认为是
      code: '255303', // 犇犇号
      openCnt: 0, // 注册人数
      record: {}, // 活动奖励文案
      userSourceChannelId: '', // 渠道 216 凤凰渠道
      skin: ''
    }
  },
  computed: {
    openPeople() {
      if (Number(this.openCnt) > 3000) return 0
      return 3000 - Number(this.openCnt)
    }
  },
  methods: {

    // 获取app皮肤
    async getSkin() {
      this.skin = await Auth.getSkin()
    },

    // 开户
    handleOpenClick() {
      let kaihu = `${env ? 'http://121.35.249.14:9003' : 'https://sns.9fstock.com:9003'}/sunline/main/index.html?skin=${this.skin}#/open-account/`
      if (ua.isApp()) {
        jumpUrl({
          url: kaihu,
          isNewPage: true,
          backHeader: true,
          isCloseBtn: true,
          isNeedHeader: true
        })
        return
      }
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sunline.android.sunline'
    },
    // 打开链接
    handleLinkClick() {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sunline.android.sunline'
    },
    // 注册人数
    async getOpenCnt() {
      const openCnt = await getOpenCnt({ params: { channelId: 216 } })
      this.openCnt = (openCnt.result || {}).openAccountCnt || 0
    },
    // 注册,登录过来的
    source() {
      const { register = '' } = this.$route.query
      if (register) {
        this.isFirst = true
        return
      }
      this.isFirst = false
    },
    // 获取活动奖励
    async getRecordInfoIfengMyself() {
      const record = await getRecordInfoIfengMyself({ requestSrc: 'h5' })
      this.record = { record: (record.result || []) }
    },
    // 获取登录人的信息
    getUserInfo() {
      const userInfo = get('user').result
      const { uId = '', userSourceChannelId = '' } = userInfo
      this.code = uId
      this.userSourceChannelId = userSourceChannelId
    },
    // 非凤凰渠道
    inPage() {
      if (this.userSourceChannelId !== '216') {
        this.$createToast({
          type: 'error',
          txt: 'hi老司机，登录APP参与其他活动吖',
          time: 5000,
          onTimeout: () => {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sunline.android.sunline'
          }
        }).show()
      }
    }
  },
  mounted() {
    document.body.style.backgroundColor = '#cc4f30'
    this.getOpenCnt()
    this.source()
    // this.getRecordInfoIfengMyself()
    this.getUserInfo()
    // this.inPage()
    if (ua.isApp()) {
      this.getSkin()
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
