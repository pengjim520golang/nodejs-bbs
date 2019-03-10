const redis = require("redis")

const cli = redis.createClient("6379","localhost") 

cli.on("error",(err)=>{
    console.log("发生了错误！")
})

cli.hset("user:100","name","pengjin",redis.print)

cli.hget("user:100","name",(err,v)=>{
    console.log("name=",v);
})


cli.hmset("user:300",["name","zhangsan","age",13,"gender","male"],redis.print)

//使用hgetall获取回来的数据将是一个object
cli.hgetall("user:300",(err,v)=>{
    console.log(  v )
})