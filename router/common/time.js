//传入时间戳进行格式化Y-m-d H:i:s
function date(unix_time){
    let dateObj = new Date( unix_time*1000 )
    let Y = dateObj.getFullYear()
    let m = dateObj.getMonth()+1 < 10 ? `0${dateObj.getMonth()+1}` : dateObj.getMonth()+1
    let d = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
    let H = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
    let i = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()
    let s = dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : dateObj.getSeconds()

    return `${Y}-${m}-${d} ${H}:${i}:${s}`
}

//传入固定格式的时间字符串变为时间戳
function strtotime(format_time){
    let dateObj = new Date(format_time)
    return parseInt( dateObj/1000 )
}

//获取一个当前的短时间:Y-m-d 
function getShortTime(){
    let dateObj = new Date()
    let Y = dateObj.getFullYear()
    let m = dateObj.getMonth()+1 < 10 ? `0${dateObj.getMonth()+1}` : dateObj.getMonth()+1
    let d = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()

    return `${Y}-${m}-${d}`
}

//获取一个当前的短时间:Y-m-d 
function getDatetime(){
    let dateObj = new Date()
    let Y = dateObj.getFullYear()
    let m = dateObj.getMonth()+1 < 10 ? `0${dateObj.getMonth()+1}` : dateObj.getMonth()+1
    let d = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
    let H = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours()
    let i = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes()
    let s = dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : dateObj.getSeconds()

    return `${Y}-${m}-${d} ${H}:${i}:${s}`
}



//获取1天中的开始和结束的uninx时间戳
function getAllDayTimeStamp(){
    let now = getShortTime()
    let start = strtotime(`${now} 00:00:00`)
    let end = start + 86400;

    return {
        start,
        end
    }
}
//获取当前时间的时间戳
function now(){
    let date = new Date();
    return parseInt(date.getTime()/1000)
}


module.exports = {
    date:date,
    strtotime:strtotime,
    getShortTime:getShortTime,
    getAllDayTimeStamp:getAllDayTimeStamp,
    now:now,
    getDatetime:getDatetime
}


