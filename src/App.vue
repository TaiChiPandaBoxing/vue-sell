<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import {urlParse} from '@/common/js/util'
const ERROR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('./api/seller?id' + this.seller.id).then((response) => {
      if (response.data.errno === ERROR_OK) {
        // this.seller = response.data.data
        // console.log(this.seller)
        this.seller = Object.assign({}, this.seller, response.data.data)
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
