
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
