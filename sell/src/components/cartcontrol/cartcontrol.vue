<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline"
         v-show="food.count>0"
         @click="decreasecart($event)"></div>
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
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      color: rgb(0, 160, 220)
      font-size: 24px
      line-height: 24px
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
</style>
