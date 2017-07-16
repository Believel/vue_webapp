<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'current':totalCount>0 }">
            <span class="icon-shopping_cart" :class="{'current': totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'current': totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{delivery}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      delivery: {
        type: Number,
        default: 0
      },
      minprice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minprice}起送`;
        } else if (this.totalPrice < this.minprice) {
          let diff = this.minprice - this.totalPrice;
          return `另需配送费￥${diff}元`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minprice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      font-size: 0
      display: flex
      background: #141d27
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          top: -10px
          display: inline-block
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.current
              background: #009FDB
            .icon-shopping_cart
              font-size: 24px
              color: #4B535A
              line-height: 44px
              &.current
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            background: #EF1313
            color: #fff
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          line-height: 24px
          &.current
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          padding: 0 12px
          margin-top: 12px
          font-size: 14px
          line-height: 24px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          font-size: 14px
          line-height: 48px
          font-weight: 700
          height: 48px
          text-align: center
          color: rgba(255, 255, 255, 0.4)
          &.not-enough
            background: #2A323A
          &.enough
            background: #00B33B
            color: #ffffff


</style>
