$(function() {
    // 导入表单对象
    var form = layui.form
    // 初始化下拉选框
    form.render('select')

    // 调用获取文章分类列表接口
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            // console.log(res);
            // 将获得到的数据填充到模板中
            var result = template('cate-tpl',res)
            // console.log(result);
            // 将数据渲染到页面上
            $('#cate-list').html(result)
            // 使用layui的下拉菜单 需要更新渲染
            form.render('select')
        }
    })

    // 初始化富文本
    initEditor()

    // 实现剪裁的基本效果
    // 把选中的id 赋值给变量 方便后面的使用
    var $img = $('#image')
    var options = {
        // 纵横比
        aspectRatio: 400 / 280,
        // 预览的区域
        preview: '.img-preview'
    }
    $img.cropper(options)

    // 给选择封面按钮绑定点击事件
    // 使用change事件
    $('#select-btn').click(function() {
        // console.log(111);
        $('#file-img').click()
        //获取选择的文件内容
        $('#file-img').change(function(e) {
            // 得到用户选中的文件
            // e.target事件源 不冒泡 指向事件触发的dom对象 
            var file = e.target.files[0]
            // console.log(file);
            // 将拿到的文件显示在左侧的图片区域
            // 根据选中的图片 创建一个URL地址
            var imgURL = URL.createObjectURL(file)
            // console.log(imgURL);
            // 将得到的地址更新到src的属性上 销毁之前的剪裁区域
            $img
               .cropper('destroy') //销毁之前的剪裁区域
               .attr('src',imgURL) //更新图片的路径
               .cropper(options)  //更新剪裁区域
        })
    })

    // 处理按钮的点击事件
    var state = ''
    $('.layui-btn').click(function() {
        var type = $(this).data('type')
        if(type === 'publish') {
            state = '已发布'
        }else if(type === 'temp') {
            state = '草稿'
        }
    })
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