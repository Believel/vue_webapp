<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .star
    font-size:0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
     .star-item
      width:20px
      height: 20px
      margin--right:22px
      background-size:20px 20px
      &:last-child
        margin-right:0
      &.on
        bg-image('star48_on')
      &.off
        bg-image('star48_off')
      &.half
        bg-image('star48_half')
    &.star-36
      .star-item
        width:20px
        height: 20px
        margin--right:22px
        background-size:20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width:20px
        height: 20px
        margin--right:22px
        background-size:20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')




</style>
