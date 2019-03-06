const express = require("express")
const db = require("./common/db")
const md5 = require("./common/md5")
const logs = require("./common/log")
//用于编写bbs论坛的用户模块
module.exports = function(){
    let router = express.Router()


    //渲染用户中心页面
    router.get('/ucenter',(req,res)=>{
       
        console.log(req.session)
        res.send("用户中心").end() 
    })


    //渲染登录页面
    router.get('/login',(req,res)=>{
       
        res.render('login.ejs',{})
    })

    //完成登录逻辑
    router.post('/login',(req,res)=>{
        //获取用户名
        let username = req.body.username 
        //获取密码
        let password = req.body.password 
        //编写登录逻辑
        let promise = new Promise( (resolve,reject)=>{
            //查询用户名是否存在
            db.pool.query("select * from bbs_users where username=? limit 1",[username],(err,data)=>{
                if(!err && data.length>0){
                    //找到用户名
                    if(data[0].password === md5(password)){
                        delete data[0].password 
                        resolve(data[0])
                    }else{
                        reject({code:203,message:"登录密码错误,请重新输入"})
                    }
                }else if( data.length==0 ){
                    //找不到用户
                    reject({code:204,message:"用户名不存在"})
                }else{
                    //发生数据库查询错误
                    reject({code:500,message:"查询失败"})
                }
            })
        } )


        promise.then( (data)=>{
            //设置登录成功后的session信息
            req.session["userInfo"] = data
            //写入登录日志
            let loginTime = new Date().getTime() / 1000
            logs.writeLoginLogs( data.username,parseInt( loginTime ) )
            res.send({status:0,message:"登录成功"}).end()
        },(err)=>{
            res.send({status:err.code,message:err.message}).end() 
        })




    })



    //渲染注册页面
    router.get('/register',(req,res)=>{
        res.render('register.ejs',{})
    })  

    return router
}