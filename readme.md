## 使用koa开发框架
1. 学习koa框架

    - [koa官网地址](http://koajs.com/)
    - [examples on github](https://github.com/koajs/examples)
    
2. 学习心得

    - 首先大概看一下官方文档，了解这个框架的工作原理
    - 其次看官方文档中的实例，了解这个框架的组织结构
    - 按照实例，尝试写一个简单的app
    - 在编程的过程中，难免会遇到困难，一些无法解决的报错信息等
    - 遇到问题不可怕，在解决问题的过程中成长才是最有效的学习方法

3. 错误解决办法
    
    - 尝试自己解决，可以在stackoverflow这样的技术论坛上搜寻答案
    - 向其他人请教

### blog-app
1. blog数据结构

    ```
    {
        title:{type:String,default:''},
        content:{type:String,default:''},
        create_time:{type:String,default:''},
        update_time:{type:String,default:''}
    }
    ```

2. koa&mongoose

    由于koa基本抛弃了回调函数，所以以下方式在koa会报'syntaxError':
    ```
    // 保存数据
    blog.save((err) => {
        if (err) {
            console.log(err)
        }
    })

    // 获取数据
    blog.find({},(err,data) => {
        if(err){
            console.log(err)
        }else{
            var data = ToObject(data);
            this.body = yield render('show',{data:data})//render => uncaught identifier
        }
    })
    ```

    应采用以下写法，在外层套try{...}catch(e){}来处理错误
    ```
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
    ```

3. 使用方法

    - 安装依赖项
    ```
    npm install
    ```
    - 运行服务器
    ```
    node app --harmony
    ```
    note:koa采用ES6的语法，不加'--harmony'参数，ES6的语法可能会出错
