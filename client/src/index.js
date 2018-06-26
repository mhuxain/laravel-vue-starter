import Vue from 'vue'
import App from './app.vue'

console.log("entered")
new Vue({
  el: '#app',
  render: h => h(App)
})
