const crypto = require('crypto');
const str = "123456"

const hash = crypto.createHash("md5")

hash.update( str ) //使用了md5修改了明文

const md5Str = hash.digest("hex") // hex表示16进制的方式返回，返回32位的长度

console.log(md5Str) //e10adc3949ba59abbe56e057f20f883e

