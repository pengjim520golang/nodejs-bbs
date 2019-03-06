const express = require("express")
const db = require("./common/db")
const time = require("./common/time")

//用于编写bbs论坛的主题
module.exports = function(){
    let router = express.Router()

    
    router.get("/",(req,res)=>{
       res.render("index.ejs",{})
    })

    return router
}