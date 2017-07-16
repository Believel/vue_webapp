<template>
  <div class="cartcontrol">
    <!--添加动画效果：内层负责滚动，-->
    <div class="cart-decrease "
         v-show="food.count>0"
         @click="decreasecart($event)"
         transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addcart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addcart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
//          语法：Vue.set(target, key, value)
//          设置一个对象不存在的属性，如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新
//          这个方法主要用于避开Vue不能检测属性被添加的限制。
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
//        派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止。
        this.$dispatch('cart.add', event.target);
      },
      decreasecart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      /*动画结束之后的样式*/
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          display: inline-block
          color: rgb(0, 160, 220)
          font-size: 24px
          line-height: 24px
          transition: all 0.4s linear
          transform: rotate(0)
      /*动画进入和离开的样式*/
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3D(24, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 220)
      font-size: 24px
      line-height: 24px
</style>
