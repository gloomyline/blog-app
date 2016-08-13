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
app.use(route.get('/', list))
app.use(route.post('/post', create))
app.use(route.get('/post/new/:id?', add))
app.use(route.get('/post/:id', show))
app.use(route.post('/post/update/:id',update))
app.use(route.post('/delete/:id',del))

function* list() {
    try{
        this.data = yield Blog.find({})
        // console.log(this.data)
        var data = ToArrObject(this.data)
        var count = yield Blog.find({}).count()
        this.body = yield render('list',{data:data,count:count})
    }
    catch(e){
        console.log(e)
    }
}

function* add(id) {
    if(id){
        try{
            this.data = yield Blog.findById(id)
            var data = ToObject(this.data)
            console.log(data)
            this.body = yield render('new',{data:data})
        }
        catch(e){
            console.log(e)
        }
    }else{
        var data = new Blog({})
        this.body = yield render('new',{data:data})
    }
}

function* show(id) {
    // console.log(id)
    try {
        this.data = yield Blog.findById(id);
        // console.log(this.data)
        var data = ToObject(this.data)
        this.body = yield render('show', { data: data })
    } catch (e) {
        console.log(e)
    }
}

function* create() {
    // blog.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })
    // koa中回调已经基本被抛弃了,采用以下写法较好
    try {
        var post = yield parse(this)
        post.create_time = new Date()
        var blog = new Blog(post);
        yield blog.save()
        this.redirect('/')
    } catch (e) {
        console.log(e)
    }
}

function* update(id){
    try{
        var updateData = yield parse(this)
        updateData.update_time = new Date()
        yield Blog.findByIdAndUpdate(id,updateData)
        this.redirect('/post/' + id)
    }
    catch(e){
        console.log(e)
    }
}

function* del(id){
    try{
        yield Blog.findByIdAndRemove(id)
        this.redirect('/')
    }
    catch(e){
        console.log(e)
    }
}


/**
 * 
 * 
 * @param {any} data
 * @returns
 */
function ToObject(data){
    var data = data.toObject()
    data.id = data._id
    delete data._id
    delete data.__v
    // console.log(data)
    return data
}


/**
 * 
 * 
 * @param {any} dataArr
 * @returns
 */
function ToArrObject(dataArr){
    var arr = dataArr.map(function(item){
        item = ToObject(item)
        return item
    })
    // console.log(arr)
    return arr
}

app.listen(3333);
console.log('listening on port 3333')