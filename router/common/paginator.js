/**
 * 
 * @param {当前页} currentPage 
 * @param {每页展示多少条记录} pageSize 
 * @param {总共有多少条记录} recordCount 
 */
module.exports = function(currentPage,pageSize,recordCount){
    //计算总页数
    let pageTotal = Math.ceil( recordCount/pageSize )
    //初始化当前页
    if(currentPage>pageTotal){
        currentPage = pageTotal
    }
    if(currentPage<=0){
        currentPage = 1
    }
    //页码数组
    let pages = []
    let prevPage = 0
    let nextPage = 0 
    if( currentPage > pageTotal-5 && pageTotal>5){
        let start = pageTotal - 5 + 1
        prevPage = currentPage - 1
        nextPage = Math.min(pageTotal,currentPage+1)
        for(let i=0;i<5;i++){
            pages[i] = start + i
        }
    }else if(currentPage>=3 && pageTotal>5){
        let start = currentPage - 3 + 1
        //console.log("start=",start)
        prevPage = currentPage - 1
        nextPage = currentPage + 1
        for(let i=0;i<5;i++){

            pages[i] = start + i
        }
    }else{
        let loopInt = Math.min(5,pageTotal)
        for(let i=0;i<loopInt;i++){
            pages[i] = i + 1
        }
        prevPage = Math.max(1,currentPage-1)
        nextPage = currentPage + 1
    }
    return {
        pages:pages,
        pageTotal:pageTotal,
        prevPage:prevPage,
        nextPage:nextPage,
        currentPage:currentPage
    }
}

// let res = p(4,2,15)

// console.log(res)