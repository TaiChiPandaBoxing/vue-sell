<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
const ERROR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('./api/seller').then((response) => {
      if (response.data.errno === ERROR_OK) {
        this.seller = response.data.data
        // console.log(this.seller)
      }
    })
  },
  components: {
    'v-header': Header,
    'v-tab': Tab
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
