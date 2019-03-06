const crypto = require('crypto');

module.exports = function(str){
    const hash = crypto.createHash("md5")
    hash.update( str ) //使用了md5修改了明文
    const md5Str = hash.digest("hex") // hex表示16进制的方式返回，返回32位的长度
    return md5Str
}

