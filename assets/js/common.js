// 通用的配置
// 通过地址
var baseURL = 'http://ajax.frontend.itheima.net'
// ajaxPrefilter()函数用于指定预先处理Ajax参数选项的回调函数
$.ajaxPrefilter(function(option) {
    // 形参option是jq请求方法的配置信息
    // console.log(option);
    // 发送请求之前会触发beforeSend
    option.beforeSend = function() {
        // 发送请求之前开始进度条(添加window防止报错)
        window.NProgress && window.NProgress.start()
    }
    // 1、配置通用的URL地址
    option.url = baseURL + option.url

    // 2、设置接口的通用请求头信息
    // 只有/my 开头的请求路径 需要请求头
    // 判断请求路径是否有my  == -1 就是里面没有此字符 取反
    if(option.url.lastIndexOf('/my/') !== -1) {
        option.headers = {
            Authorization:localStorage.getItem('mytoken')
        }
    }

    // 处理通用的异常情况
    // 服务器响应结束时触发
    option.complete = function(res) {
        console.log(res); 
        // 完成请求后，结束进度条
        window.NProgress && window.NProgress.done()
        // 处理失败的情况
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            // 清除token值
            localStorage.removeItem('mytoken')
            // 跳转到登录页
            location.href = './login.html'
        }
    }
})