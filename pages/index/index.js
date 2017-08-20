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
    consumerProjArray: ['三餐', '零食', '生活用品', '旅游','房租水电','网购'],
    cons:[]  
  },
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e){
    var value = e.detail.value;
    var time = util.formatToday(new Date()); 
    //要增加的数组
    var newarray = [{
      consProj : value.consProj,
      consMoney : value.consMoney,
      consDate: time
    }];
    var newobj={
      consProj: value.consProj,
      consMoney: value.consMoney,
      consDate: time
    };
    this.data.cons = newarray.concat(this.data.cons);
    this.setData({
      'cons': this.data.cons
    });
    wx.request({
      url: 'http://localhost:3003/daycons',
      method: 'POST',
      data: newobj,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})