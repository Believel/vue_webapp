<template>
    <div class="line"></div>
    <div class="text">{{cap}}</div>
    <div class="line"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      cap: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .line
    flex: 1
    position: relative
    top: -6px
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)
  .text
    padding: 0 12px
    font-weight:700
    font-size:14px
</style>
