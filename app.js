// 引入依赖模块
var koa = require('koa')
var route = require('koa-route')
var parse = require('co-body')
var views = require('co-views')
var serve = require('koa-static-server')

var router = require('./router')

// 实例化app
var app = koa()

// 引入转换数据格式模块
var msgpack = require('./msgpack')

// 指定静态文件夹目录
app.use(serve({rootDir:'public',rootPath:'/static'}))

// 路由中间件
app.use(route.get('/', router.list))
app.use(route.post('/post', router.create))
app.use(route.get('/post/new/:id?', router.add))
app.use(route.get('/post/:id', router.show))
app.use(route.post('/post/update/:id', router.update))
app.use(route.post('/delete/:id', router.del))

// // test data interface route
// app.use(route.get('/test/json/int',getJsonData))

app.listen(3333);
console.log('listening on port 3333')