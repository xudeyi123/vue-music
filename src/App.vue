<template>
  <div id="app">
    hello world
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
  @import "./common/less/variable.less";

  #app {
    color: @color-theme
  }
</style>
