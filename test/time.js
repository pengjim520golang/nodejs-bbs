let loginTime = new Date().getTime() / 1000

//获取当前时间的unix时间戳
console.log(loginTime, parseInt( loginTime ) )


// 把1551837592转为Y-m-d H:i:s的格式

let date2 = new Date((1551837592+86400*3)*1000) //把时间戳作为构造函数的参数传入就以时间戳为主导，如果没有参数则以当前时间为主导


let now = `${date2.getFullYear()}-${date2.getMonth()+1}-${date2.getDate()} ${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()}`
console.log(now) 


// 把固定时间2019-03-06 00:00:00 到 2019-03-06 23:59:59
let date3 = new Date("2019-03-06 23:59:59") //把固定格式的字符串变成时间戳

console.log( date3.getTime() / 1000 )


console.log( 1551887999 - 1551801600 + 1 )