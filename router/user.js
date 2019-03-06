const express = require("express")
const db = require("./common/db")
const md5 = require("./common/md5")
const logs = require("./common/log")
const time = require("./common/time")
const path = require("path")
const fs = require("fs")
//用于编写bbs论坛的用户模块
module.exports = function(){
    let router = express.Router()



    //渲染用户中心页面
    router.get('/ucenter',(req,res)=>{
       //获取session
       let userInfo = req.session["userInfo"]
       
       res.render("ucenter.ejs",{avatar:userInfo.thumbnail,errMsg:""})
    })

    //上传头像的逻辑
    router.post('/upload',(req,res)=>{
        //获取session
        let userInfo = req.session["userInfo"]
        //获取文件域对象
        let uploaded = req.files[0]
        //只能上传.jpg、.jpeg、.png、.gif的文件
        let exts = [".jpg",".jpeg",".png",".gif"]
        //默认通过了验证
        let flag = false 
        //获取用户上传文件的后缀名称
        let ext = path.extname(uploaded.originalname)
        //变量后缀名数组
        for(let item of exts){
            if(item===ext){
                flag = true;
                break;
            }
        }
        if(flag === false ){
            res.render("ucenter.ejs",{avatar:userInfo.thumbnail,errMsg:"您上传的后缀名必须是"+exts.toString()})
            res.end() 
        }else{
            //改名->更新数据库->更新session->跳转页面回/ucenter
            function * updateAvatar(){
                //改文件名
                let fileName = yield (function(){
                    //创建一个新的名字
                    let newName = uploaded.destination + userInfo.username + ext
                    //获取旧名字
                    let oldName = uploaded.path
                    //改名
                    fs.rename(oldName,newName,(err)=>{
                        it.next( userInfo.username + ext ) //改名成功就进入下一个yield操作
                    })
                })()
                //修改数据库的头像字段
                yield db.pool.query("update bbs_users set thumbnail=? where id=?",[fileName,userInfo.id],(err)=>{
                    if(!err){
                       //更新session
                       req.session["userInfo"].thumbnail = fileName
                       res.redirect("/user/ucenter")
                       it.next()
                    }
                })

            }

            let it = updateAvatar()
            it.next()
        }

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
            logs.writeLoginLogs( data.username, time.now() )
            res.send({status:0,message:"登录成功"}).end()
        },(err)=>{
            res.send({status:err.code,message:err.message}).end() 
        })




    })


    //渲染注册页面
    router.get('/register',(req,res)=>{
        res.render('register.ejs',{})
    })  


    //注册逻辑
    router.post('/register',(req,res)=>{

            //获取用户名
            let username = req.body.username 
            //获取密码
            let password = req.body.password      
            //获取昵称
            let nickname = req.body.nickname  
            let promise = new Promise( (resovle,reject)=>{
                //判断当前用户名是否已经存在
                db.pool.query("select count(*) as total from bbs_users where username=?",[username],(err,data)=>{
                        if(!err && data[0].total>0){
                            reject( {code:202,message:`论坛账号${username}已经被注册了~！`} )
                        }else if(data[0].total===0){
                            resovle({code:0,data:[username,md5(password),nickname,time.now()]})
                        }
                })
            } )

            promise.then( (result)=>{
                
                db.pool.query("insert into bbs_users(username,password,nickname,register_time)values(?,?,?,?)",result.data,(err)=>{
                    if(!err){
                        res.send({status:0,message:"注册成功~！"}).end() 
                    }
                })
            },(err)=>{
                res.send({status:err.code,message:err.message}).end() 
            })



    })  




    return router
}