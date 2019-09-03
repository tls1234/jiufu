import staticData from '@/common/js/staticData'
import { getRecordInfoIfengMyself } from '@/api'
// import {} f

//  页面分享
export const dialog = {
  data() {
    return {
      staticData,
      isRule: true, // 规则或奖励
      showRule: false, // 显示规则
      record: {}
    }
  },
  computed: {
    dialogData() {
      return this.isRule ? staticData.rule : this.record
    }
  },
  methods: {
    // 显示规则弹窗
    onShowRule() {
      this.isRule = true
      this.showRule = true
      this.$nextTick(() => {
        this.$refs.dialog.onRefresh()
        this.$refs.dialog.onBackTop()
      })
    },
    // 隐藏规则弹窗
    onHideRule() {
      this.showRule = false
    },
    // 显示活动奖励
    onShowRewards(record) {
      if (record === 'register') {
        this.record = { record: [] }
        this.isRule = false
        this.$createToast({ type: 'warn', txt: '您尚未登录' }).show()
      } else {
        let arr = [{
          activItemName: '奖品',
          activeType: '类型',
          confirmDate: '领取时间'
        }]
        getRecordInfoIfengMyself({ requestSrc: 'h5' }).then(res => {
          this.record = { record: arr.concat(res.result || []), title: '查看活动奖励' }
          this.isRule = false
          this.showRule = true
        })
      }
    },
    // 获取活动奖励
    async getRecordInfoIfengMyself() {
      const record = await getRecordInfoIfengMyself({ requestSrc: 'h5' })
      this.record = { record: (record.result || []) }
    }
  }
}
