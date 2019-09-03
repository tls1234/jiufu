<template>
  <div class="rule-dialog"
       v-show="show">
    <transition name="fade">
      <div class="dialog">
        <header class="header">
          {{data.title}}
        </header>
        <div class="content">
          <scroll-view :data="data.list"
                       :refreshDelay="30"
                       ref="scroll"
                       class="list-wrapper"
                       v-if="isRule">
            <ul class="list">
              <li v-for="(item, index) in data.list"
                  :key="index"
                  class="item">
                <span class="index">
                  {{index+1}}
                </span>
                <div v-html="item.text"
                     class="desc"
                     @click="onLinkShow"></div>
              </li>
            </ul>
          </scroll-view>
          <div v-else>
            <div class="table rewards-table">
              <div v-if="record"
                   class="noPrize">
                暂无内容
              </div>
              <div v-else>
                <div v-for="(item, index) in data.record"
                     :key="index"
                     :class="{thead: index === 0, tbody: index !== 0}">
                  <span class="item">{{item.activItemName}}</span>
                  <span class="item">{{index === 0 ? '类型' : formartPrizeType(item.activeType)}}</span>
                  <span class="item">{{formartGetDate(index,item.confirmDate)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <span class="color-strong btn"
                @click="onHideRule">我知道了</span>
        </div>
      </div>
    </transition>
    <div class="mask"
         @click="onMaskHide"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    isRule: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    maskEven: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    record() {
      return this.data.record.length <= 1
    }
  },
  methods: {
    // 奖品类型:1 开户 2 入金 3 转仓
    formartPrizeType(type) {
      switch (type) {
      case 1:
        return '开户送'
      case 2:
        return '入金送'
      case 3:
        return '转仓送'
      }
    },
    // 转换领取时间
    formartGetDate(index, text) {
      return index === 0 ? text : text.substring(0, 10)
    },
    // 隐藏
    onHideRule() {
      this.$emit('hide', this.show)
    },
    // 触发遮罩
    onMaskHide() {
      if (this.maskEven) {
        this.$emit('hide', this.show)
      }
    },
    // 触发查看奖励
    onLinkShow(event) {
      if (event.target.id === 'rewards') {
        this.onHideRule()
        this.$emit('rewards')
      }
    },
    // 刷新
    onRefresh() {
      this.$refs.scroll.refresh()
    },
    // 返回顶部
    onBackTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.fade-enter-active, .fade-leave-active
  transition opacity 0.4s
.fade-enter, .fade-leave-to
  opacity 0
.color-strong
  color #f95a29
.rule-dialog
  position fixed
  z-index 10000
  left 0
  right 0
  top 0
  bottom 0
  .dialog
    pos-center()
    z-index 999
    width 640px
    background #fff
    border-radius 10px
    overflow hidden
    padding-bottom 90px
    .header
      font-size 32px
      background-size cover
      height 104px
      line-height 104px
      text-align center
    .content
      color #333
      padding 10px 30px 5px
      line-height 1.4
      .table
        border-collapse collapse
        border-spacing 0
        margin-bottom 15px
        td, th
          border 1.5px solid #d7d7d7
          padding 10px
          text-align center
          font-size 26px
      .table
        margin 20px auto
        .noPrize
          font-size 26px
          text-align center
        .thead
          display flex
          background #f1f1f1
          span
            display block
            flex 1
            padding 10px
            text-align center
        .tbody
          display flex
          font-size $font-size-medium
          .item
            display block
            flex 1
            padding 10px
            text-align center
    .list-wrapper
      height 500px
      overflow hidden
    .list
      margin-bottom 15px
      padding 0
      .item
        display flex
        margin-bottom 15px
        justify-content space-between
        vertical-align top
        font-size 28px
        color #555
      .index
        position relative
        background-color #e17547
        width 34px
        flex 0 0 34px
        height 34px
        line-height 36px
        box-sizing border-box
        border-radius 50%
        margin 5px 20px 0 5px
        color #fff
        text-align center
      .desc, .text
        text-align justify
      .label
        display block
        margin-bottom 15px
      .text
        margin-bottom 15px
      .link
        extend-click()
      .rewards
        text-decoration underline
  .mask
    fixed-full(1)
    background-color rgba(0, 0, 0, 0.85)
  .bottom
    position absolute
    bottom 0
    left 0
    right 0
    text-align center
    line-height 90px
    .btn
      display block
      background #e8634c
      color #fff
</style>
