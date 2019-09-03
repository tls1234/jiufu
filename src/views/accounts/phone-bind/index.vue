<template>
  <register-form :register-type="type" :submit-text="text"></register-form>
</template>

<script>
import registerForm from '../components/registerForm'

export default {
  name: 'phone-bind',
  data() {
    return {
      type: 3,
      text: '下一步'
    }
  },
  components: {
    registerForm
  }
}
</script>