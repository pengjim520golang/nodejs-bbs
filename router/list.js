const express = require("express")
const db = require("./common/db")
const md5 = require("./common/md5")
const time = require("./common/time")
const paginator = require("./common/paginator")
//用于编写bbs帖子列表模块
module.exports = function(){
    let router = express.Router()

    router.get("/",(req,res)=>{

        let topic_id = req.query.id
        let currentPage = isNaN( parseInt(req.query.page) ) ? 1 : parseInt(req.query.page)
        //参数对象
        let premeters  = {currentPage:currentPage,pageSize:2,rsCount:0}
        //计算当前主题下共有多少篇帖子->输出帖子列表->渲染页面并进行分页输出
        function * getBssList(){
            premeters = yield db.pool.query("select count(*) as totalPosted from bbs_list where topic_id=?",[topic_id],(err,data)=>{
                if( !err && data[0].totalPosted>0 ){
                    //重新构造 premeters对象
                    premeters.rsCount = data[0].totalPosted
                    it.next( premeters )
                }else if(data[0].totalPosted==0){
                    res.render("list.ejs",{rsCount:0})
                }
            })
        }

        let it = getBssList()
        it.next()


        
    })



    return router
}