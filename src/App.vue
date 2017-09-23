<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
export default {
  name: 'app',
  components: {
    'v-header': Header,
    'v-tab': Tab
  }
}
</script>

<style <style lang="stylus">

</style>
