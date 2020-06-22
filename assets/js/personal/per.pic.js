$(function() {
    // 实现裁剪区域的基本效果
    // 将类名赋值给一个变量 方便多次使用
    var $image = $('.cropper-box #image')
    // $image.cropper( {
    //     // 纵横比
    //     aspectRatio: 1,
    //     // 指定预览区域
    //     preview: '.img-preview'
    // });

    // 将内容也赋值给options变量
    var options = ( {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    });
    $image.cropper(options)

    // 给上传按钮添加点击事件
    $('#upload').click(function() {
        // console.log(111);
        // 点击上传按钮 自动触发 file标签的点击行为
        $('#selectImg').click()
    })

    // 获取到选中的文件信息
    // change事件 是表单输入域内容发生变化的时候触发
    $('#selectImg').change(function(e) {
    // 选中文件后触发事件函数
    // e.target事件源 不冒泡 指向事件触发的dom对象 
    // 拿到用户选中的文件
    var file = e.target.files[0]
    // console.log(file);
    // 获取到文件后需要显示到左侧的图片区域
    // 根据选中的文件 创建一个对应的URL地址
    var newImgURL = URL.createObjectURL(file)
    // 将获得到的地址更新到src的属性上 更新之前先将之前的裁剪区域销毁
    $image.cropper('destroy')  //销毁之前的剪裁区域
          .attr('src',newImgURL)  //更新图片的路径
          .cropper(options) //更新新的预览区域
    })

    // 点击确认按钮 得到选框中的图片 将剪裁好的图片上传到服务器 更新用户头像
    // 给确定按钮绑定点击事件
    $('#okBtn').click(function() {
        // 点击确定 获得到剪裁好的图片信息
      var dataURL =  $image.cropper('getCroppedCanvas',{
            width: 100,
            hight: 100,
        })
        // console.log(dataURL);
        // <canvas width="100" height="100"></canvas>
        
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        .toDataURL('image/png')  
        // console.log(dataURL);
        
        // 调用接口 将图片上传到服务器
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if(res.status === 0) {
                    // 更新成功 提示一下
                    layer.msg(res.message)
                    // 把左侧和顶部的按钮更新
                    // parent 表示iframe的父窗口 就是主页面
                    window.parent.$.loadUserInfo()
                }else {
                    layer.msg(res.message)
                }
            }
        })
    })
})