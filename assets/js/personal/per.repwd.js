$(function() {
    var form = layui.form
    // 表单验证
    // 自定义表单验证
    form.verify({
        diff: function(value) {
            // 获取原来的密码
            // 新密码和原来的密码不能一样
            var oldPwd = $('input[name=oldPwd]').val()
            if(oldPwd === value) {
                return '新密码不能喝原密码相同'
            }
        },
        same: function(value) {
            var newPwd = $('input[name=newPwd]').val()
            if(newPwd !== value) {
                return '两次输入的密码不相同'
            }
        }
    })

    // 给修改按钮设置点击事件
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        // 获取表单的数据
        var fd = $(this).serialize()
        // 调用修改密码接口
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: fd,
            success: function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }else {
                    layer.msg(res.message)
                }
            }
        })
    })
})