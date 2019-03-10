const redis = require("redis")

const cli = redis.createClient("6379","localhost") 

console.log(cli)

cli.on("error",(err)=>{
    console.log("发生了错误！")
})


cli.rpush("quee",["111","222","333"],redis.print)

//使用lrange获取的数据将是要给数组
cli.lrange("quee",0,-1,(err,v)=>{
    console.log(v)
})