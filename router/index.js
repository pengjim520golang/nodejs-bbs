const express = require("express")
const db = require("./common/db")
const time = require("./common/time")
const password = require("./common/password")
const icon = require("./common/icons")
const md5 = require("./common/md5")
//用于编写bbs论坛的主题
module.exports = function(){
    let router = express.Router()

    router.get("/",(req,res)=>{
       let rsCount = 0
       let lasttime = ""
       //获取今天的总数
       let today = time.getAllDayTimeStamp()

       let promise = new Promise( (resolve,reject)=>{
            db.pool.query("select count(*) as rsCount from bbs_list where pub_time between ? and ?",[today.start,today.end-1],(err,data)=>{
                if(!err){
                    rsCount = data[0].rsCount
                    resolve(rsCount)
                }
            })
       } )

       promise
            .then( (count)=>{
                return new Promise( (resolve,reject)=>{
                        //如果今天已经有人发帖子了就获取最后一个发帖子的时间
                        if(count>0){
                            db.pool.query("select pub_time from bbs_list where pub_time between ? and ? order by pub_time desc limit 1",[today.start,today.end-1],(err,data)=>{
                                if(!err){
                                    lasttime = data[0].pub_time
                                    resolve({rsCount:rsCount,lasttime:lasttime})
                                }
                            }) 
                        }else{
                            resolve({rsCount:rsCount,lasttime:lasttime})  
                        }
                } )
            } )
            .then( (result)=>{
                db.pool.query("select * from bbs_topic where hidden=1 order by topic_time asc",(err,data)=>{
                    if(!err && data.length>0){
                        res.render("index.ejs",{rs:data,rsCount:result.rsCount,lasttime:time.date( result.lasttime )})
                    }else if(data.length===0){
                        res.render("index.ejs",{rs:null,rsCount:0,lasttime:""})
                    }
                })
            })
    })

    //渲染发表主题页
    router.get("/addtopic",(req,res)=>{
        res.render("add_topic.ejs",{icons:icon.icons})
    })
    //编写发表主题的逻辑
    router.post("/addtopic",(req,res)=>{
        let title = req.body.txtTitle 
        let descr = req.body.txtDescr
        let icon = req.body.txtIcon
        let pass = md5( req.body.txtPass )
        let isHidden = req.body.isHidden
        let postPass =  md5( req.body.postPass ) 
        //console.log(pass)

        if( postPass === password.postTopicPassword )
        {
            db.pool.query("insert into bbs_topic(title,descr,icon,password,hidden,topic_time)values(?,?,?,?,?,?)",[title,descr,icon,pass,isHidden,time.now()],(err)=>{
                if(!err){
                    res.redirect("/")
                }else{
                    console.log(err)
                }
            })
        }else{
            res.send("发表密码不正确").end() 
        }


    })

    //渲染当前隐藏密码页面
    router.get("/hidden",(req,res)=>{
        res.render("hidden.ejs",{topicId:req.query.id})
    })
    //设置隐藏
    router.post("/hidden",(req,res)=>{
       let id = req.body.ids 
       let txtPassword = md5( req.body.txtPassword ) 
       db.pool.query("update bbs_topic set hidden=0 where id=? and password=?",[id,txtPassword],(err)=>{
           if(!err){
               res.redirect("/")
           }
       })
    })

    return router
}