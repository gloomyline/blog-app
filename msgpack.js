/**
 * 以下是测试msgpack
 * 将json.object数据转换成二进制提高数据在网络中传输速率
 */
var msgpack = require('msgpack5')() // namespace our extensions
  , a       = new MyType(2, 'a')
  , encode  = msgpack.encode
  , decode  = msgpack.decode
// msgpack注册
msgpack.register(0x42, MyType, mytipeEncode, mytipeDecode)

// console.log(encode({ 'hello': 'world' }).toString('hex'))

function MyType(size, value) {
  this.value = value
  this.size  = size
}

function mytipeEncode(obj) {
  var buf = new Buffer(obj.size)
  buf.fill(obj.value)
  return buf
}

function mytipeDecode(data) {
  var result = new MyType(data.length, data.toString('utf8', 0, 1))
  var i

  for (i = 0; i < data.length; i++) {
    if (data.readUInt8(0) != data.readUInt8(i)) {
      throw new Error('should all be the same')
    }
  }

  return result
}
/***
 * 测试msgpack结束
 */
module.exports = {
    encode:encode,
    decode:decode
}