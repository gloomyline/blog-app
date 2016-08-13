// 引入依赖模块
var koa = require('koa')
var route = require('koa-route')
var parse = require('co-body')
var views = require('co-views')

// 实例化app
var app = koa()

// 指定渲染模板路径和模板引擎
var render = views(__dirname + '/views', {
    map: { html: 'swig' }
})

// 连接数据库
var db = require('./db')

// 路由中间件
// app.use(route.get('/', list))

app.listen(3333);
console.log('listening on port 3333')