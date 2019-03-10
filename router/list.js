const express = require("express")
const db = require("./common/db")
const md5 = require("./common/md5")
const time = require("./common/time")
const paginator = require("./common/paginator")
const redis = require("./common/redis_cli")
//用于编写bbs帖子列表模块
module.exports = function(){
    let router = express.Router()

    router.get("/",(req,res)=>{

        let topic_id = req.query.id
        let currentPage = isNaN( parseInt(req.query.page) ) ? 1 : parseInt(req.query.page)
        //参数对象
        let premeters  = {currentPage:currentPage,pageSize:10,rsCount:0}
        //渲染页面并进行分页输出
        function * getBssList(){
            //计算当前主题下共有多少篇帖子
            premeters = yield db.pool.query("select count(*) as totalPosted from bbs_list where topic_id=?",[topic_id],(err,data)=>{
                if( !err && data[0].totalPosted>0 ){
                    //重新构造 premeters对象
                    premeters.rsCount = data[0].totalPosted
                    //求出当前有多少页
                    premeters.paginator = paginator(premeters.currentPage,premeters.pageSize,premeters.rsCount)
                    it.next( premeters )
                }else if(data[0].totalPosted==0){
                    res.render("list.ejs",{rsCount:0})
                }
            })

            premeters = yield (function(){
                //构建redis-hash中的key
                let hashKey = "topic:" + topic_id //topic:1
                //获取redis中hash
                redis.cli.hgetall(hashKey,(err,v)=>{
                    if(!err){
                       
                        premeters.reply = v===null ? {} : v
                        it.next( premeters )
                    }
                })
            })()

            //输出帖子列表
            let strSql = "SELECT title,nickname,username,topic_id,user_id,lst.id,`is_top` FROM bbs_list  AS lst LEFT JOIN bbs_users AS users ON lst.user_id=users.id WHERE topic_id = ? ORDER BY lst.`is_top` DESC,lst.`pub_time` ASC LIMIT ?,?"
            yield db.pool.query(strSql,[topic_id,(premeters.paginator.currentPage-1)*premeters.pageSize,premeters.pageSize],(err,data)=>{
                if(!err){
                    res.render("list.ejs",{rs:data,paginator:premeters.paginator,rsCount:premeters.rsCount,topic_id:topic_id,reply:premeters.reply})
                }
            })


        }

        let it = getBssList()
        it.next()


        
    })



    return router
}