$(function() {
    var form = layui.form
    // 获取下拉列表数据
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            // console.log(res);
            // 通过模板引擎将数据填充到模板
            var result = template('cate-tpl',res)
            // 将数据渲染到相应的位置
            $('#category').html(result)
            // 使用layui的下拉菜单，需要更新渲染  render
            // layui不支持动态渲染数据 render是规定的 
            form.render('select')
        }
    })
    // 获取后台的数据 渲染到页面上
    function articleTableData() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: {
                // 页面 必须从1开始
                pagenum: 1,
                // 每页显示多少条数据
                pagesize: 10,
            },
            success: function(res) {
                // console.log(res);
                // 通过模板引擎将数据填充到模板
                var result = template('table-tpl',res)
                // 将数据渲染到相应的位置
                $('.layui-table tbody').html(result)
            }
        })
    }
    articleTableData()

    // 点击筛选按钮
    $('#search-form').submit(function(e) {
        e.preventDefault();
        console.log('click');
    })
})