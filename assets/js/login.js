// 入口函数
$(function() {
    // layui是全局对象 通过他可以得到form对象
    var form = layui.form;
    // 表单验证
    form.verify({
        username : [
            /^[\S]{5,8}$/,
            "用户名必须6到8位，且不能出现空格"
        ],
        pwd : [
            /^[a-zA-Z0-9]{5}$/,
            "密码必须5位，且不能出现空格"
        ],
        samePwd : function(value) {
            var code = $('#password').val()
            // 判断
            if(value != code) {
                return '两次的密码不一致'
            }
        }
    })
    // 点击去注册账号按钮
    $('#form-reg1 a').click(function(e) {
        // 阻止默认行为
        e.preventDefault()
        $('#form-reg1').hide()
        $('#form-reg2').show()
    })
    // 获取输入框的内容
    // 登陆界面
    $('#form-reg1').submit(function(e) {
        // 事件对象 阻止默认行为
        e.preventDefault()
        // 快速获取输入框内容
        var formData = $(this).serialize()
        // console.log(formData);s
        // 将得到的输入框数据发送到后台
        $.ajax({
            type : 'post',
            url : 'http://ajax.frontend.itheima.net/api/login',
            data : formData,
            success : function(res) {
                if(res.status === 0) {
                    // console.log(res.message);
                    // 将登陆成功的表示缓存起来
                    localStorage.setItem('mytoken',res.token)
                    layer.msg(res.message)
                    // 将token保存到本地
                    localStorage.setItem('mytoken',res.token)
                    setTimeout(function() {
                        // location是BOM对象 location.href可以实现页面跳转
                        location.href = 'index.html'
                    },1000)
                }else {
                    layer.msg(res.message)
                }
            }
        })  
    })

    // 点击立即提交按钮
    // 注册界面
    $('#form-reg2').submit(function(e) {
        // alert('111');
        e.preventDefault();
        // 获取输入框的数据
        // 获取表单数据 (表单输入域必须提供name属性 name的值必须和接口文档要求一致)
        var formData1 = $(this).serialize()  
        // 将输入框的数据提交到后台
        $.ajax({
            type : 'post',
            url : 'http://ajax.frontend.itheima.net/api/reguser',
            data : formData1,
            success : function(res) {
                if(res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link-login').click()
            }
        })
    })
    // 点击去登录按钮
    $('#form-reg2 a').click(function(e) {
        // 阻止默认行为
        e.preventDefault()
        $('#form-reg2').hide()
        $('#form-reg1').show()
    })
})