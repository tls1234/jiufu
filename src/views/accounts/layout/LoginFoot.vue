<template>
  <div class="login-foot">
    <p>版权所有@玖富证券有限公司 | 粤ICP备17038015号</p>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
    }
  },
  components: {
  },
  created() {
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.login-foot
  width 100%
  font-size 28px
  line-height 1em
  color $color-foot
  text-align center
  margin 38px auto
  position absolute
  left 0
  bottom 0
  z-index 1
</style>
