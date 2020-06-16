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
            /^[\d]{5}$/,
            "密码必须6到8位，且不能出现空格"
        ]
    })
    // 获取输入框的内容
    $('.layui-form').submit(function(e) {
        // 事件对象 阻止默认行为
        e.preventDefault()
        // 快速获取输入框内容
        var formData = $(this).serialize()
        // 将得到的输入框数据发送到后台
        $.ajax({
            type : 'post',
            url : 'http://ajax.frontend.itheima.net/api/login',
            data : formData,
            success : function(res) {
                if(res.status === 0) {
                    // console.log(res.message);
                    location.href = 'index.html'
                }
            }
        })  
    })
})