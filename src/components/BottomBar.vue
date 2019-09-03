<template>
  <div class="bottom-bar" @click="handleLinkClick">
    <div class="left">
      <p class="name">玖富犇犇APP</p>
      <p class="slogan">玖富证券 让金融更简单</p>
    </div>
    <span class="btn">
      打开
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    handleLinkClick() {
      this.$emit('link')
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.bottom-bar
  height 134px
  width 100%
  background #fff
  padding 25px 30px 25px 40px
  box-sizing border-box
  display flex
  justify-content space-between
  align-items center
  .left
    position relative
    line-height 42px
    padding-left 100px
    &:before
      bg-image('app', 84px, 84px)
      position absolute
      left 0
      content ''
    .slogan
      color #666
      font-size 26px
  .btn
    bg-image('bg-btn', 130px, 60px)
    line-height 60px
    text-align center
    font-size 32px
    color #fff
    &:active
      opacity 0.85
</style>
