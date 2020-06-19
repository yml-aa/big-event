$(function() {
    // 获取layui的form对象
    var form = layui.form
    // 调用接口将用户的信息填充到表单
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function(res) {
            // console.log(res);
            // 用获取到的用户信息填充搭配表单
            // 基于layui方式填充表单
            // basicForm是Form标签的lay-filter属性值，用于表单数据填充
            form.val('basicForm',res.data)
        }
    })

    // 点击提交修改按钮 获取用户输入的信息
    $('.layui-form').submit(function(e) {
        // 事件对象阻止默认行为
        e.preventDefault()
        // var fd = $(this).serialize()
        // id=466&username=yyyyy&nickname=123&email=121
        // console.log(fd);
        // 由于后台接口是需要三个参数 不需要username 所以采用serializeArray()方法
        // 这个方法得到的是一个数组 我们可以利用数组的方法 筛选出需要的
        var fd = $(this).serializeArray()
        // console.log(fd);
        // 用数组filter()筛选
        fa = fd.filter(function(item) {
            // 筛选出属性名不是username的
            return item.name !== 'username'
        })
        // 调用修改信息接口
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: fd,
            success: function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
})