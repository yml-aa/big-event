$(function() {
    // 获取本地储存的token
   var mytoken =  localStorage.getItem('mytoken')
    // 判断是否存在mytoken
    if(!mytoken){
        // 如果mytoken不存在 那么就跳转到登陆页面
        location.href = './login.html'
    }
})