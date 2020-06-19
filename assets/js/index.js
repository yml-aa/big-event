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
    })    // 加载时需要获取调用后台接口和用户信息
    function loadUserInfo() {
        $.ajax({
            type : 'get',
            // 请求地址
            url : '/my/userinfo',
            success : function(res) {
                // console.log(res);
                if(res.status === 0) {
                    // 获得用户的信息
                    var userData = res.data
                    // 将获得得信息填充到相对于的位置
                    // 填充用户名
                    $('#wel-username').html(userData.username)
                    $('#nav-username').html(userData.username)
                    // 填充头像
                    // userData.user_pic = 'http://t.cn/RCzsdCq'
                    // 如果存在头像 显示一张照片
                    if(userData.user_pic){
                        $('#wel-username').parent().prev('div').remove()
                        $('#wel-username').parent().prepend('<img src="'+userData.user_pic+'" alt="" />')
                        $('#nav-username').parent().prev('div').remove()
                        $('#nav-username').parent().prepend('<img src="'+userData.user_pic+'" alt="" />')
                    }
                }
            }
        })
    }
    loadUserInfo()
})