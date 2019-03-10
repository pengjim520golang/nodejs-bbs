const redis = require("redis")
//  redis://123456@localhost:6379 
//  redis.createClient("redis://123456@localhost:6379")
let cli = redis.createClient("63791","localhost")

cli.on("error",(err)=>{
    console.log("redis发生了错误，异步执行的方法,错误对象:",err)
})


cli.set() 