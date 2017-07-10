
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
# 组件拆分
1. 编写vue file 代码块
2. 安装stylus-loader
  发现有错误：`Cannot find module 'stylus'`,所以
  要先安装：`npm install stylus-loader stylus --save-dev`，就能解决了
3. flex布局
   `display: block`
   `flex: 1`
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
 ```
5. css sticky footer 布局
6.
4. 用手机访问webApp页面，把localhost地址换成本地的地址(通过ipconfig查看本机的地址)，例如地址`localhost:8080/#!/seller`就换成`http://192.168.1.105:8080/#!/seller`
  ,然后访问`http://cli.im/url`，生成一个二维码，通过扫在iphone6手机上查看效果


5. es6中Module语法

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







# vuex认识
Vuex是类似与Redux的状态管理器，用来管理vue的所有组件状态。

