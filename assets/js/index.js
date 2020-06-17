$(function() {
    // 获取本地储存的token
   var mytoken =  localStorage.getItem('mytoken')
    // 判断是否存在mytoken
    if(!mytoken){
        // 如果mytoken不存在 那么就跳转到登陆页面
        location.href = './login.html'
    }
    // 点击退出功能
    // 清除token 跳转到登陆页面
    $('#logout').click(function() {
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            // 如果为true 就删除token 并且跳转
            // console.log(123);
            // 删除token
            localStorage.removeItem('mytoken')
            // 关闭弹窗
            layer.close(index);
            // 跳转到登陆页面
            location.href = './login.html'
        });
    })
})