const mongoose = require("mongoose")
//连接mongodb数据库
mongoose.connect("mongodb://localhost:27017/bbs")
//声明Schema对象
const Schema  = mongoose.Schema; 
//创建一个Schema约束
const logsSchema = new Schema({
    username:String, 
    login_time:String
})

//创建model
const logsModel = mongoose.model("Loginlogs",logsSchema)
//创建写入登录日志函数
function writeLoginLogs(username,login_time){
    logsModel.create({username:username,login_time:login_time},(err)=>{
        if(!err){
            console.log(`write ${username} in mongodb logs \n`) 
        }
    })    
}



exports.writeLoginLogs = writeLoginLogs
