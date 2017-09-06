var order = ['red', 'yellow', 'blue', 'green', 'red']
var app = getApp()
var util = require('../../utils/util.js')
Page({
    data: {
        toView: 'red',
        chosen: '',
        scrollTop: 100,
        motto: '欢迎进入懒球记账！',
        userInfo: {},
        primarySize: 'default',
        noteTitle: '每日记账',
        consumerProjArray: ['三餐', '零食', '生活用品', '旅游', '房租水电', '网购'],
        cons: [],
        startDate: util.formatToday(new Date()),
        endDate: util.getNextMonth(new Date()),
        allCons: [],
        today: util.formatToday(new Date()),
    },
    upper: function(e) {},
    lower: function(e) {},
    scroll: function(e) {},
    tap: function(e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove: function(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    formSubmit: function(e) {
        var self = this;
        var value = e.detail.value;
        if (value.consProj === null || value.consMoney === "") {
            wx.showModal({
                title: '错误提示',
                content: '请选择项目和消费金额',
            })
            return;
        }
        var timedetail = util.formatDetail(new Date());
        //要增加的数组
        var newarray = [{
            consProj: value.consProj,
            consMoney: value.consMoney,
            consDate: self.data.today,
        }];
        var newobj = {
            consProj: value.consProj,
            consMoney: value.consMoney,
            consDate: self.data.today,
            consDateDetail: timedetail,
        };
        wx.request({
            url: 'https://accnotes.kchen.cn/daycons',
            method: 'POST',
            data: newobj,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                self.data.cons = newarray.concat(self.data.cons);
                self.setData({
                    cons: self.data.cons,
                    dayConsMoney: '',
                    index: -1,
                })
            }
        })
    },
    bindKeyInput: function(e) {
        this.setData({
            userInput: e.detail.value
        });
    },
    bindDateChangeStart: function(e) {
        this.setData({
            startDate: e.detail.value
        })
    },
    bindDateChangeEnd: function(e) {
        this.setData({
            endDate: e.detail.value
        })
    },
    seeWeekConsume: function() {
        console.log("查看周消费")
    },
    viewSelectDaate: function() {
        console.log("查看当前选择日期的消费")
        let startDate = this.data.startDate
        let endDate = this.data.endDate
        if (startDate > endDate) {
            console.log("开始日期不能大于结束日期");
        }
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
        let today = that.data.today
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
            })
        })
        wx.request({
            url: 'https://accnotes.kchen.cn/daycons?consDate=' + today,
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    cons: res.data.reverse()
                })
            }
        })
    }
})