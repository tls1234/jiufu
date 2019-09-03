<template>
  <div class="login-container" :style="{height: `${height}px`}">
    <login-head></login-head>
    <login-main></login-main>
    <login-foot></login-foot>
  </div>
</template>

<script type="text/ecmascript-6">
import { LoginHead, LoginMain, LoginFoot } from './layout'
const height = window.innerHeight
export default {
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  data () {
    return {
      height
    }
  },
  created() {
  },
  mounted() {
  },
  components: {
    LoginHead,
    LoginMain,
    LoginFoot
  }
}
</script>

<style lang="stylus">
@import './main'
</style>
