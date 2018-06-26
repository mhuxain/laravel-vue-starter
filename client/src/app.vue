<template>
  <div id="app">
      {{msg}} test
      <customer></customer>
  </div>
</template>

<script>
import customer from './pages/customer/customer.vue'
  export default {
    components: {
        customer
    },
    data () {
      return {
        msg: 'Use Vue 2.0 Today!',
      }
    },
    methods: {
      gogogo () {
        location.assign('../customer/home.html')
      },
      tototo () {
        location.assign('../user/login.html')
      }
    },
    created() {
        console.log("hello")
    }
  }
</script>

<style lang="scss">
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
