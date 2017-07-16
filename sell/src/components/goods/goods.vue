<template>
  <!--商品列表-->
  <div class="goods">
    <!--商品列表左侧菜单-->
    <!--ref如果在普通的dom元素上，引用指向的就是dom元素，如果用在子组件上，指向的是组件的实例-->
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods"
            class="menu-item"
            :class="{'current': currentIndex===$index}"
            @click="selectMenu($index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--商品列表右侧食物内容-->
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <!--右侧内容标题-->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
//  引入购物车组件
  import shopcart from 'components/shopcart/shopcart';
//  引入购物按钮组件
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      };
    },
    computed: {
//      计算滚动时当前的索引，为了让菜单项对应的索引显示高亮
      currentIndex() {
        for (var i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
//      计算属性：实现联动添加food,然后添加到shopcart组件中实现
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
//          更新dom操作
          this.$nextTick(() => {
//            初始化滚动的dom对象方法
            this._initScroll();
//            计算每次滚动的区块高度方法
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
//      点击左侧菜单项，显示对应的区块内容方法
      selectMenu(index, event) {
//        console.log(index);
//        console.log(event);
//        在PC页面上是没有这个属性的,click事件就不要再触发一次了
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
//        滚动到什么哪个元素下面
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
//          点击事件生效
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
//          3除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
          probeType: 3
        });
//        监视滚动事件
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
//    注册相应的组件
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    display: flex
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        font-size: 12px
        line-height: 14px
        width: 56px
        padding: 0 12px
        &.current
          background-color: #fff
          font-weight: 700
          position: relative
          z-index: 10
          margin-top: -1px
          .text
            border-none()
        .text
          display: table-cell
          width: 56px;
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          fonte-size: 12px
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')

    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 149)
        background: #f3f5f7
        border-left: 2px solid #d9dde1
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &.last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            font-size: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
            margin: 2px 0 8px
          .desc, .extra
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)


          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
