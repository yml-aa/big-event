$(function() {
    var form = layui.form
    // 封装获得列表函数
   function loadListData() {
        // 获取后台数据
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                // 基于模板引擎渲染列表
                var result = template('list-tpl',res)
                // 将获得到的数据渲染到tbody中
                $('.layui-table tbody').html(result)
            }
        })
   }
   loadListData()

   //点击添加分类按钮 弹出层
   // 给添加分类按钮添加点击事件
   //弹出层的唯一标识
   //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。 
   var addIndex = null
   var editIndex = null
   $('#add-form').click(function() {
       //console.log(123);
       //创建任何弹出层都会返回一个当前索引
        addIndex = layer.open({
        type: 1,
        title: '添加分类',
        content: $('#add-tpl').html(),
        area: ['500px','300px'],
      }); 
    //点击确认添加按钮 将表单数据提交到服务器  关闭弹出层 重新渲染数据列表
    // 要写在弹出层里面 因为是动态的
    $('.layui-form').submit(function(e) {
        // 阻止事件的默认行为
        e.preventDefault()
        // console.log(111);
        // 获取用户输入的内容
        var fd = $(this).serialize()
        // 调用接口 将获得到的数据发送到服务器
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: fd,
            success: function(res) {
                if(res.status === 0) {
                    // 添加成功 提示消息
                    layer.msg(res.message)
                    // 关闭弹出层 根据创建弹出层时的索引
                    layer.close(addIndex)
                    // 重新调用列表
                    loadListData()
                }else {
                    layer.msg(res.message)
                }
            }
        })
      }) 
   })  

   //监听删除按钮事件
   //用委派 因为列表的数据都是动态添加上的
   $('body').on('click','#del',function() {
   //获取到点击删除按钮的id 要知道点击是删除的哪一行
   var id = $(this).data('id')
   //console.log(id);
   //调用删除按钮接口
   $.ajax({
       type: 'get',
       url: '/my/article/deletecate/' + id,
       data: {
           id: id
       },
       success: function(res) {
           if(res.status === 0) {
               layer.msg(res.message)
               loadListData()
           }else {
                layer.msg(res.message)
           }
       }
     })
   })

   //监听编辑按钮事件
   $('body').on('click','#edit',function() {
       //根据id编辑
       var id = $(this).data('id')
    //    console.log(id);
       
        //创建任何弹出层都会返回一个当前索引
        editIndex = layer.open({
            type: 1,
            title: '编辑分类',
            content: $('#edit-tpl').html(),
            area: ['500px','300px'],
            }); 
       //调用接口
       //将分类数据显示到表单
       $.ajax({
           type: 'get',
           url: '/my/article/cates/' + id,
           data: {
               id: id
           },
           success: function(res) {
                //显示编辑弹出层 并将数据填充
                //将获得得数据填充到表单
                form.val('editForm',res.data)
            }
       })
        //监听确认添加按钮
        $('.layui-form').submit(function(e) {
            // 阻止事件的默认行为
            e.preventDefault()
            // 获得表单的内容
            var fd = $(this).serialize()
            // console.log(fd);
            
            // 调用接口 将数据发送到服务端
            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',
                data: fd,
                success: function(res) {
                    if(res.status === 0) {
                        layer.msg(res.message)
                        layer.close(editIndex)
                        loadListData()
                    }else {
                        layer.msg(res.message)
                    }
                }
            })
        })
   })
})