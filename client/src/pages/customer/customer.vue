<template>
  <div id="app">
      {{msg}} PHP Working with vendor?
  </div>
</template>

<script>

  export default {
    components: {
    },
    data () {
      return {
        msg: 'Hello Customer!',
      }
    },
    methods: {
      gogogo () {
        location.assign('../customer/home.html')
      },
      tototo () {
        location.assign('../user/login.html')
      }
    }
  }
</script>

<style lang="scss">
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>