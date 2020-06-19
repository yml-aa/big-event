// 适配
(function() {
    // 页面一加载就要知道页面宽度 
    // 封装一个函数
    function setFont() {
        // 获取html元素
        var html = document.documentElement
        // 获取html的宽度
        var width = html.clientWidth;
        // console.log(width);
        // 判断、
        if(width < 1024) width = 1024;
        if(width > 1920) width = 1920
        // 设置html基准值
        var fontSize = width / 80 +'px'
        // 设置给html
        html.style.fontSize = fontSize
    }
    setFont();

    // 页面改变尺寸的时候也需要设置
    // window.onresize = function() {
    //     setFont();
    //     myChart.resize();
    //     myChart1.resize();
    // }
})(); //此处要加分号
// 全局变量
var myChart,myChart1,myChart2
$(function() {
    // 折线图
    (function() {
        mychart = echarts.init($('.line')[0])
        // 数据
        var lineData = [
            { 'count': 36, 'date': '2019-04-13' },
            { 'count': 52, 'date': '2019-04-14' },
            { 'count': 78, 'date': '2019-04-15' },
            { 'count': 85, 'date': '2019-04-16' },
            { 'count': 65, 'date': '2019-04-17' },
            { 'count': 72, 'date': '2019-04-18' },
            { 'count': 88, 'date': '2019-04-19' },
            { 'count': 64, 'date': '2019-04-20' },
            { 'count': 72, 'date': '2019-04-21' },
            { 'count': 90, 'date': '2019-04-22' },
            { 'count': 96, 'date': '2019-04-23' },
            { 'count': 100, 'date': '2019-04-24' },
            { 'count': 102, 'date': '2019-04-25' },
            { 'count': 110, 'date': '2019-04-26' },
            { 'count': 123, 'date': '2019-04-27' },
            { 'count': 100, 'date': '2019-04-28' },
            { 'count': 132, 'date': '2019-04-29' },
            { 'count': 146, 'date': '2019-04-30' },
            { 'count': 200, 'date': '2019-05-01' },
            { 'count': 180, 'date': '2019-05-02' },
            { 'count': 163, 'date': '2019-05-03' },
            { 'count': 110, 'date': '2019-05-04' },
            { 'count': 80, 'date': '2019-05-05' },
            { 'count': 82, 'date': '2019-05-06' },
            { 'count': 70, 'date': '2019-05-07' },
            { 'count': 65, 'date': '2019-05-08' },
            { 'count': 54, 'date': '2019-05-09' },
            { 'count': 40, 'date': '2019-05-10' },
            { 'count': 45, 'date': '2019-05-11' },
            { 'count': 38, 'date': '2019-05-12' },
        ];
        var count = []
        var data = []
        //   循环
        $.each(lineData,function(index,dom) {
            count.push(dom.count)
            data.push(dom.date)
        })
        // console.log(count);
        // 配置
        var option = {
            // 标题文字居中
            title : {
                text : '月新增文章数',
                left : 'center',
                top : 10
            },
            legend : {
                data : ['新增文章'],
                top : 40
            },
            // 网格
            grid : {
                top : 75,
                show : true
            },
            xAxis: {
                // 坐标轴名称
                name: '日',
                // 坐标轴类型 category 类目轴
                type: 'category',
                // x轴数据
                data: data
            },
            yAxis: {
                // 坐标轴名称
                name: '月新增文章数',
                type: 'value'
            },
            // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
            toolbox:{
                // 是否显示工具栏组件
                show: true,
                // 各工具配置项
                feature: {
                    // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                    dataView: {
                        show: true
                    },
                    // 动态切换类型
                    magicType: {
                        type: ['line','bar']
                    },
                    // 配置项还原
                    restore: {
                        show: true
                    },
                    // 保存为图片
                    saveAsImage: {
                        type: 'png'
                    },
                }
            },
            series: [{
                name : '新增文章',
                type: 'line',
                // 平滑曲线显示
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#f80'
                    },
                },
                //区域填充样式 渐变 设置 areaStyle 后可以绘制面积图。
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        }, {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])
                    }
                },
                data: count,
            }],
        };
        mychart.setOption(option)
    })();

    // 饼图
    (function() {
        mychart1 = echarts.init($('.pie')[0])
        var option = {
            // 标题
            title: {
                text: '分类文章数量比',
                // 居中
                left: 'center',
                top: 10
            },
            // 提示组件
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            // 颜色
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
            // 图例组件
            legend: {
                // 图例列表的布局朝向 horizontal 横向 vertical 纵向
                orient: 'horizontal',
                left: 'center',
                top: 65,
                data: ['奇趣事', '会生活', '爱旅行', '趣美味']
            },
                // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                toolbox:{
                    // 是否显示工具栏组件
                    show: true,
                    top: 35,
                    left: 'center',
                    // 各工具配置项
                    feature: {
                        // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                        dataView: {
                            show: true
                        },
                        // 配置项还原
                        restore: {
                            show: true
                        },
                        // 保存为图片
                        saveAsImage: {
                            type: 'png'
                        },
                    }
                },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['45%', '60%'],
                    center: ['50%', '65%'],
                    data: [
                      { value: 300, name: '奇趣事' },
                      { value: 100, name: '会生活' },
                      { value: 260, name: '爱旅行' },
                      { value: 180, name: '趣美味' }
                    ],
                }
            ]
        };
        mychart1.setOption(option) 
    })();

    // 柱状图
    (function() {
        myChart2 = echarts.init($('.bar')[0]);
        var option = {
            // 标题
            title: {
                text: '文章访问量',
                left: 'center',
                top: '10'
              },
            // 网格
            grid: {
                show: true,
                left: 50,
                right: 30,
                top: 80,
                height: 260
            },
            // 提示组件
            tooltip: {
                trigger: 'axis'
            },
            // 图例组件
            legend: {
                data: ['奇趣事', '会生活', '爱旅行', '趣美味'],
                top: '40'
            },
            // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
            toolbox:{
                // 是否显示工具栏组件
                show: true,
                // 各工具配置项
                feature: {
                    // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                    dataView: {
                        show: true
                    },
                    // 动态切换类型
                    magicType: {
                        type: ['line','bar']
                    },
                    // 配置项还原
                    restore: {
                        show: true
                    },
                    // 保存为图片
                    saveAsImage: {
                        type: 'png'
                    },
                }
            },
            // x轴
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月']
            },
            yAxis: {
                name: '访问量',
                type: 'value'
            },
            series: [
                {
                    name: '奇趣事',
                    // 柱状图
                    type: 'bar',
                    // 柱子的宽度
                    barWidth: '10%',
                    // 设置柱子的颜色
                    itemStyle: {
                        color: '#fd956a'
                    },
                    data: [800, 708, 920, 1090, 1200]
                },
                {
                    name: '会生活',
                    // 柱状图
                    type: 'bar',
                    // 柱子的宽度
                    barWidth: '10%',
                    // 设置柱子的颜色
                    itemStyle: {
                        color: '#2bb6db'
                    },
                    data: [400, 468, 520, 690, 800]
                },
                {
                    name: '爱旅行',
                    // 柱状图
                    type: 'bar',
                    // 柱子的宽度
                    barWidth: '10%',
                    // 设置柱子的颜色
                    itemStyle: {
                        color: '#13cfd5'
                    },
                    data: [500, 668, 520, 790, 900]
                },
                {
                    name: '趣美味',
                    // 柱状图
                    type: 'bar',
                    // 柱子的宽度
                    barWidth: '10%',
                    // 设置柱子的颜色
                    itemStyle: {
                        color: '#00ce68'
                    },
                    data: [600, 508, 720, 890, 1000]
                },
            ],
            dataZoom: [{
                
            }]
        };
        myChart2.setOption(option);      
    })()
})