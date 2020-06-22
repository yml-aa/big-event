$(function() {
    // 给提交按钮添加点击事件
    $('#add-form').submit(function(e) {
        // 阻止事件的默认行为
        e.preventDefault()
        // console.log(111);
        // 获取表单的数据
        var fd = new FormData(this)
        // var formData = $(this).serialize()
        // console.log(fd);
        // 调用接口
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            // 防止把请求参数转换为字符串
            processData: false,
            // 禁止使用默认的提交参数类型
            contentType: false,
            success: function(res) {
                if(res.status === 0) {
                    layer.msg(res.message)
                }
            }
        })
    })
})