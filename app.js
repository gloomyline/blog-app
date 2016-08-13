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
var Blog = require('./db')

// 路由中间件
// app.use(route.get('/', list))
app.use(route.post('/post', create))
app.use(route.get('/post/new', add))
app.use(route.get('/post/:id', show))

// function* list() {
//     var that = this
//     Blog.find({}).exec((err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             data = data.toObject()
//             data.id = data._id
//             delete data._id
//             console.log(data)
//             if (!data) that.throw(404, 'invalid data');
//             // that.body = yield render('list', { data: data })
//         }
//     })
// }

function* add() {
    this.body = yield render('new')
}

function* show(id) {
    // console.log(id)
    var _data = {}
    Blog.findById(id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data = data.toObject();
            data.id = data._id;
            delete data._id;
            // console.log(data)
            if (!data) this.throw(404, 'invalid data id');
            // console.log(this)
            // this.body = render('show', { data: data })
            _data = data
        }
    });
    console.log(_data)
    this.body = yield render('show', { data: _data })
}

function* create() {
    var post = yield parse(this)
    post.create_time = new Date()
    var blog = new Blog(post)
    blog.save((err) => {
        if (err) {
            console.log(err)
        }
    })
}

app.listen(3333);
console.log('listening on port 3333')