<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/goods">
      <span class="tab-link">商品</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/ratings">
      <span class="tab-link">评论</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/seller">
      <span class="tab-link">商家</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
    &.active
      .tab-link
        color: rgb(240, 20, 20)
</style>
