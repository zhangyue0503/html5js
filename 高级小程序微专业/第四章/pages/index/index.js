//index.js
//获取应用实例
const app = getApp()

// 引入方法
var util  = require('../../utils/util.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(util.compareVersion(wx.getSystemInfoSync().SDKVersion, '1.9.9'))
    console.log(util.compareVersion(wx.getSystemInfoSync().SDKVersion, '2.8'))

    // 判断API的使用
    console.log(wx.canIUse('getSystemInfoSync.return.windowWidth'))
    console.log(wx.canIUse('getSystemInfo.success.screenWidth'))
    // 判断组件
    console.log(wx.canIUse('text.selectable'))
    // 不能使用
    console.log(wx.canIUse('getSystemInfoSync.return.abc'))

    // 兼容方法使用
    if(wx.getSystemInfoSync){
      console.log(wx.getSystemInfoSync().SDKVersion)
    }

  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
