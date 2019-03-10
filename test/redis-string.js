const redis = require("redis")

const cli = redis.createClient("6379","localhost") 

cli.on("error",(err)=>{
    console.log("发生了错误！")
})

/**
console.log(typeof redis.print)

 redis.print的回调函数中是开发者帮我们实现了两个参数的传入
 参数1： err 
 参数2:  reply对象（负责获取redis中的value，默认如果无法获取value又没有产生err对象则返回ok）

 redis.prototype.print = function(err,reply){
     if(!err){
         if(reply === undefined){
             return "OK"
         }else{
             return reply  //可能是string , array , object
         }
     }
 }



cli.set("name","sasa",redis.print)

cli.set("name2","zhangsan",(err,reply)=>{
    if(!err){
        console.log("name2' reply:",reply)
    }
})


//获取name2的值 --> zhangsan
let name2Val = cli.get("name2") //无法获取成功，因为get是异步代码
console.log(name2Val) //false  , 异步执行

let name2Value = null  
cli.get("name2",(err,reply)=>{
    if(!err){
        name2Value = reply
        console.log(name2Value);
    }
})
 */


//一次性设置多个值str1  str2  str3  str4
//cli.mset(["str1","中国人","str2","日本人","str3","韩国人"],redis.print)


//一次性获取多个值
cli.mget(["str1","str2","str3"],redis.print)  //某一种版本，这种写法会错误
cli.mget("str1","str2","str3",redis.print) //兼容版本性最高


//一次获取多个值，并返回数组
cli.mget("str1","str2","str3",(err,v)=>{
    if(!err){
        console.log(v)
    }
})

