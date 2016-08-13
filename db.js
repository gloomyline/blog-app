var db = require('mongoose')
db.connect('mongodb://localhost/koa_example_db')

var Blog = db.model('blog', {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    create_time: { type: String, default: '' },
    update_time: { type: String, default: '' }
})

module.exports = Blog