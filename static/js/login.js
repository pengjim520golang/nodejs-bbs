$(function(){

    $("#btnLogin").on("click",function(){
        //获取用户名和密码
        var user = $("#username").val()
        var pass = $("#password").val()
        //验证用户名和密码是否已经填写
        if(user===''){
            alert("用户名不能为空")
            return false 
        }
        if(pass===''){
            alert("登录密码不能为空")
            return false
        }

        //发出请求给nodjs
        $.ajax({
            url:"/user/login",
            type:"post",
            dataType:"json",
            data:`username=${user}&password=${pass}`,
            success:function(json){
                if(json.status==0){
                    window.location.href="/user/ucenter"
                }else{
                    alert(json.message)
                }
            }
        })

    })
})