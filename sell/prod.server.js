var express = require('express');
var config = require('./config/index');
var port = process.env.PORT || config.build.port;
var app = express();
var router = express.Router();
router.get('/', function (req, res, next) {
  console.log(req);
  req.url = '/index.html';
  next();
});
app.use(router);
// 定义读取数据的对象
var appData = require('./data.json');
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

app.use(express.static('./dist'));//加载的路径
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
