const express = require("express")
const redis = require("./common/redis_cli")



module.exports = function(){

    const router = express.Router();

    router.get("/sickers",(req , res)=>{
        res.render("guahao.ejs",{})
    })


    router.post("/sickers",(req , res)=>{
       let sickerName = req.body.sickerName //获取要挂号的病人姓名
       //console.log(RedisCli)
       redis.cli.rpush("sickers",sickerName,(err)=>{
           if(!err){
               res.send(`${sickerName}挂号成功！`).end()
           }
       })
    })
    //医生叫号
    router.get("/doctor",(req,res)=>{
        redis.cli.lpop("sickers",(err,v)=>{
            if(!err){
                if(v){
                    res.render("doctor.ejs",{sicker:v})
                }else{
                    res.render("doctor.ejs",{sicker:""})
                }
                
            }
        })  
    })



    return router;
}