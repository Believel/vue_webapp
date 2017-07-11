<template>
  <div class="header">
  <!-- 头部内部 -->
      <div class="content-wrapper">
         <div class="avatar">
          <img :src="seller.avatar" height="64" width="64">
         </div>
         <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
         </div>
         <!-- 广告个数 -->
         <div class="support-count" v-if="seller.supports" @click="detailShow">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
         </div>
      </div>
  <!-- 头部公告 -->
      <div class="bulletin-wrapper" @click="detailShow">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
<!-- 头部背景布局 -->
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
<!-- 弹出层布局 -->
      <div class="detail" v-show="detailIsShow">
        <!--sticky footer布局-->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <p>{{seller.bulletin}}</p>
            <p>{{seller.bulletin}}</p>
            <p>{{seller.bulletin}}</p>
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailIsShow: false
      };
    },
    methods: {
      detailShow() {
          this.detailIsShow = true;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        vertical-align: top
        display: inline-block
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            vertical-align: top
            display:inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            background-size:30px 18px
            background-repeat: no-repeat
          .name
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          font-size: 12px
          margin-bottom: 10px
        .support
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        height: 24px
        padding: 0 8px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        border-radius: 14px
        .count
          font-size: 10px
          border: none
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      background: rgba(7, 17, 27, 0.2)
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        vertical-align: top
        margin-top: 8px
        display: inline-block
        margin-right: 4px
        width: 22px
        height: 12px
        bg-image ('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        line-height: 28px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        font-size: 10px
        margin-left: 4px
    .background
      position: absolute
      left: 0
      top: 0
      width:100%
      height:100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      left: 0
      top: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)
      .detail-wrapper
        width: 100%
        min-height:100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
      .detail-close
        position: relative
        margin: -64px auto 0 auto
        clear: both
        width: 32px
        height: 32px
        font-size: 32px










</style>

