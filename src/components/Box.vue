<template>
  <div class="main-box">
    <h3 class="title"
        v-if="title">{{title}}</h3>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
$radius = 10px
.main-box
  position relative
  border 10px solid #f57858
  border-radius $radius
  background-color #f57858
  box-sizing border-box
  width 710px
  box-shadow 0 10px 0 0 #d84f2e, 0 20px 10px 0 rgba(159, 55, 29, 0.35)
  .title
    bg-image('title_bg')
    pos-x()
    margin-top -44px
    position absolute
    width 472px
    height 88px
    line-height 76px
    text-shadow 0 2px 0 rgba(0, 0, 0, 0.35)
    text-align center
    color #fff
    font-size 36px
    font-weight 700
  .main
    background #fff
    width 100%
    height auto
    padding 40px 50px 30px
    text-align center
    box-sizing border-box
    border-radius $radius
</style>
