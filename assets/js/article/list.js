$(function() {
    var form = layui.form
    // 当前页码
    var pagenum = 1
    // 每页显示的条数
    var pagesize = 10

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
            $('#category').html(result)
            // 使用layui的下拉菜单 需要更新渲染
            form.render('select')
        }
    })

    // 模板引擎过滤器
    // 过滤器就是把需要处理的值传入过滤器函数中 过滤器函数进行处理后返回给我们一个新的值
    // 过滤器定义位置一定要放在template前面
    template.defaults.imports.formDate = function(time) {
        // 实现日期的格式化：把参数data日期字符串转换为日期对象
        var d = new Date(time)
        var year = d.getFullYear()
        var month = addZero(d.getMonth() + 1)
        var day = addZero(d.getDate())
        var hour = addZero(d.getHours())
        var minutes = addZero(d.getMinutes())
        var seconds = addZero(d.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
      // 补零函数
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }
    // 调用文章的列表数据接口
    function listData(param) {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: param,
            success: function(res) {
                // 将获得到的数据填充到模板中
                var result = template('table-tpl',res)
                // 将数据渲染到页面上
                $('.layui-table tbody').html(result)
            }
        })
    }
    listData({
        // 将这两个参数作为实参传入
        // 页码：必须从1开始
        pagenum: pagenum,
        // 每页显示多少条数据
        pagesize: pagesize
    })

    // 给筛选按钮绑定点击事件
    $('#search-form').on('submit',function(e) {
        // 阻止事件的默认行为
        e.preventDefault()
        // console.log('click');
        // 获得到筛选条件的索引参数
        var fd = $(this).serializeArray()
        // console.log(fd);
        var params = {
            // 页码：必须从1开始
            pagenum: pagenum,
            // 每页显示多少条数据
            pagesize: pagesize
        }
        // 把筛选得到的数据添加到params对象中
        fd.forEach(function(item) {
            params[item.name] = item.value
        })
        // 刷新列表
        listData(params)
    })

    // 给删除按绑定点击事件
    $('body').on('click','.delete',function() {
        // console.log(111);
        // 获得到点击删除的id
        var id = $(this).data('id')
        var index = layer.confirm('确认要删除吗？',function() {
            // 调用删除文章数据接口
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                data: {
                    id: id
                },
                success: function(res) {
                    if(res.status === 0) {
                        layer.msg(res.message)
                        // 关闭弹窗
                        layer.close(index)
                        // 刷新列表
                        listData()
                    }else {
                        layer.msg(res.message)
                    }
                }
            })
        })
    })
})