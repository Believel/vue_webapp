
# 1、vue-cli安装
由于vue-cli 现在默认安装的2.0版本 (1)`npm install -g vue-cli`,如果需要使用vue.1.0的，那么接下来就要
(1) `npm init webpack#1.0 projectName`
(2) `cd projectName`
(3) `npm install`
(4) `npm run dev`
# webpack配置
1. https://github.com/standard/standard/blob/master/RULES.md#javascript-standard-style
2. https://www.npmjs.com/package/html-webpack-plugin

# 制作图标字体
1.设备像素比devicePixelRatio简单介绍
http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/
## 制作图标字体官网  https://icomoon.io/
### 如何使用
1. 点击官网中右上角 `IcoMoon App`图标，进入页面
2. 点击左上角`Import Icons`图标，将所有的`.svg`导入进来，生成图标
3. 一下子选中生成的所有图标，在右下角点击`Generate Font`图标
4. 点击左上角`Preferences`图标，可以修改要保存的文件的名字`Font Name`
5. 点击右下角的`Download`,然后就生成字体库了。

# 项目目录设计
主要开发项目代码主要在`src`目录结构下进行开发
1、使用css处理器是：stylus
2、组件化开发模式
# 如何mock数据(模拟后台数据)

```js
// 定义读取数据的对象
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 定义路由
var apiRoutes = express.Router(); //创建模块化、可挂载的路由句柄
// 商家路由
apiRoutes.get('/seller', function (req, res) {
  // 发送一个JSON格式的响应
  res.json({
    errno : 0,
    data : seller
  });
});
// 商品路由
apiRoutes.get('/goods', function (req, res){
  res.json({
    errno : 0,
    data : goods
  })
})
// 评价路由
apiRoutes.get('/ratings', function (req, res){
  res.json({
    errno : 0,
    data : ratings
  })
});
// 在应用中加载模块
app.use('/api', apiRoutes);
```
# vue中拿到mock的数据
```js
created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
        }
      });
    }
```
# 组件拆分
1. 编写vue file 代码块
2. 安装stylus-loader
  发现有错误：`Cannot find module 'stylus'`,所以
  要先安装：`npm install stylus-loader stylus --save-dev`，就能解决了
3. flex布局
   `display: block`
   `flex: 1`
   flex可以接收三个参数：第一个：数字，第二个：数字，第三个：长度(带单位)
   在iphone6中物理像素是设备上的两倍，所以针对设置1px的边框大小要单独处理
   3.1 如何处理(利用伪类+缩放实现1px下边框)
```js
//伪类设置
border-1px(@color)
  position: relative
  &::after
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-bottom: 1px solid @color
    content: ' '
 // 缩放比设置
 @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
  .border-1px
    &::after
      -webkit-transform: scaleY(0.7)
      transform: scaleY(0.7)
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
  .border-1px
    &::after
      -webkit-transform: scaleY(0.5)
      transform: scaleY(0.5)
}

```
3.2 flex布局的属性
3.2.1 flex-direction属性决定主轴的方向，取值分别有：
              ：row(默认值);主轴为水平方向，起点在左端。
              ：row-reverse;主轴为水平方向，起点在右端。
              ：column;主轴为垂直方向，起点在上沿。
              ：column-reverse;主轴为垂直方向，起点在下沿。
3.2.2 flex-wrap属性
      默认情况下，项目都排在一条线上，flex-wrap属性定义，如果一条轴线排不下，如何换行。
      取值如下：
      ：nowrap(默认);不换行。
      ：wrap; 换行，第一行在上方。
      ：wrap-reverse;换行，第一行在下方。
3.2.3 flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap.
3.2.4 justify-content属性定义了项目在主轴上的对齐方式。
     取值如下：flex-start | flex-end | center | space-between | space-around
3.2.5 align-items属性
      定义项目在交叉轴上如何对齐。
      取值：flex-start | flex-end | center | baseline | stretch;



4. css布局——背景图片铺满整个盒子
 ```js
   .parent
     position: relative
     .child_bg
       position: absolute
       left:0
       bottom: 0
       z-index: -1
       filter: blur(10px) //设置模糊程度
       //兼容性比较好，不仅仅作用于当前元素，后代元素也会继承这个属性，作用于一个空背景元素没有效果
       //使用场景：效果其实还是通过作用于具体的img元素才实现模糊效果，如果单单作用于一个空元素背景，则没有效果
 ```
 示例：![filter](https://raw.githubusercontent.com/Believel/MarkdownPhotos/master/imgs/vue-sell/filter.png)

5.全屏遮罩层设置
```js
  .detail
      position: fixed
      z-index: 100
      left: 0
      top: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(10px)//用于只对元素的背景做filter效果
      //运用backdrop-filter元素的背景应该使用半透明，不然永远看不到效果
      //当backdrop-filter属性和裁剪属性(如border-radius、mask、clip-path)结合一起使用，会有bug产生
      //backdrop-filter可以创建一个堆栈文本(Stacking Context)，类似于opacity属性一样著作权归作者所有。
      //可以配合动画属性animation一起使用
      //到目前为止，仅有Safari浏览器支持，而且还需要添加前缀：-webkit-backdrop-filter著作权归作者所有。
      //使用场景：为背景添加模糊效果；如果目标元素内包裹着其他内容，则应用filter属性(不支持安卓，效果不明显)
```
示例：![bacdrop-fiter](https://raw.githubusercontent.com/Believel/MarkdownPhotos/master/imgs/vue-sell/backdrop-filter.png)

6. css sticky footer 布局
  概括如下：如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
```html
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
```
```js
      .detail-wrapper
        width: 100%
        min-height:100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px /*最重要的一步，为了给footer盒子留位置*/
      .detail-close
        position: relative
        margin: -64px auto 0 auto
        clear: both
        width: 32px
        height: 32px
        font-size: 32px
```

示例：![sticky footer ](https://raw.githubusercontent.com/Believel/MarkdownPhotos/master/imgs/vue-sell/sticky-footer.png)

7. CSS3的calc()使用
  calculate是css3的一个新增的功能，用来指定元素的长度。
  最大的好处是用在流体布局上，可以通过calc()计算得到元素的宽度。

```js
//calc()语法
.elm {
  wifth: calc(expression);
}
```

8. 用手机访问webApp页面，把localhost地址换成本地的地址(通过ipconfig查看本机的地址)，例如地址`localhost:8080/#!/seller`就换成`http://192.168.1.105:8080/#!/seller`
  ,然后访问`http://cli.im/url`，生成一个二维码，通过扫在iphone6手机上查看效果


9. es6中Module语法

```js
// ES6模块
// import命令用于输入其他模块提供的功能
import {stat, exits, readFile} from 'fs';//实质是fs模块加载3个方法，其他方法不加载
// export命令用于规定模块的对外接口
//写法一
export var m =1;
//写法二
var m =1;
export {m};
//写法三
var n =1;
export {n as m};
// export default命令，为模块指定默认输出,但是一个模块只能有一个默认输出，一次export default命令只能使用一次
// export default命令用在非匿名函数前，也是可以的 。
export default function foo(){
  console.log('foo');
}

```
# vue1.0项目练习中的遇到的需要注意的点
1. vue更新DOM的时候是异步操作，所以要使用

```js
this.$nextTick( () => {
  //更新dom的操作(方法)

})
```
2. vue中通过在html标签中添加v-el指定获得dom

```js
注意：v-el:menu-wrapper冒号前后不要有空格
<p v-el:menu-wrapper></p>
this.$els.menuWrapper // 得到的就是p元素
```

3. vue中对未知对象添加属性，并更新dom
```js
Vue.set(target, key, value)
第一个参数是：对象
第二个参数是：要添加的对象的属性的名字
第三个参数是： 添加对象属性的值
```

4.当给dom元素注册点击事件的时候，在PC端的时候回触发两次
所以要禁止一下
```js
if(!event._constructed){
  return;
}
```
5. vue里面访问子组件方式
```js
//html 在子组件上定义一个子组件变量
 <shopcart v-ref:shopcart></shopcart>
// js调用
// 调用子组件中的drop方法
this.$refs.shopcart.drop(target);
```
6. vue子组件向父组件传参(通信)

通常通过点击事件触发向父组件传参等等
```js
// 1.派发事件，通过冒泡的方式传递事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止。
 //第一个参数是：事件名称
 //第二个参数是：事件的参数值
this.$dispatch('cart.add', event.target);

//在父组件中可以在events事件中拿到子组件的传参
events: {
      'cart.add'(target) {
        this._drop(target);
      }
    }
// 2.$broadcast-通过广播的方式向子孙组件传递事件
```
7.引入模块注意的地方

通过`export default {}`定义的使用的时候直接 `import modelName from` '文件位置'引入使用;

通过`export function 方法名` 定义的时候需要`import {方法名} from '文件位置'`引入使用

#  better-scroll插件的使用(移动端滚动的插件)
1. npm install better-scroll
2. 初始化需要滚动的DOM元素
```js
// 内层宽度超过外层宽度
//第一个参数是：dom对象，第二个参数是对象(传值)
    this.menuScroll = new BScroll(this.$els.menuWrapper, {
      click: true,//可以触发点击
      //......
    });
    this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
    });
```
3. 商品滚动案例功能需求

(1)计算每个区块的高度，然后根据索引值在左边的菜单项中显示高亮的效果，每个区块的高度是一次联动增加的。

(2)左侧菜单项点击的时候，右侧也显示相应的区块
    根据点击对应的菜单项获得索引值，然后根据当前索引找右侧元素的索引，最后滚动到那个索引元素下面。




问题：如何跟每个v-for遍历的元素添加v-ref指令，手动添加得到的是undefined?





# vuex认识

Vuex是类似与Redux的状态管理器，用来管理vue的所有组件状态。
Vuex会让你的Vue代码足够灵活可控，把数据统一存入state,只允许通过Actions触发Mutations修改

