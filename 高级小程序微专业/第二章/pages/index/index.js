//index.js
//获取应用实例
const app = getApp()
let observer = require('../../utils/observer.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // 搜索内容
    searchText: '',
    searchChangeText: '',
    // 模式弹窗状态
    isOpen: false,
    msg: '',
    teacher: ''
  },

  initOther(){
    wx.navigateToMiniProgram({
      appId: '',
      path:'',
      extraData:{
        num:100
      },
      envVersion:'devlop',
      success(res){
        console.log(res)
      }

    })

    wx.navigateBackMiniProgram({
      success(res){
        console.log(res)
      }
    })
  },

  // 搜索按扭事件
  searchValue(e){
    this.setData({
      searchText: e.detail,
      isOpen: true,
      searchChangeText: ''
    });
  },
  // 搜索文本框输入事件
  changeValue(e){
    this.setData({
      searchChangeText: e.detail
    });
  },

  // 模态框点击确定
  confirmHandler(e) {
    console.log('click confirm', e);
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 处理消息的方法
  dealmsg(type,teacher){
    // console.log(arguments)
    // 存储接收的数据
    this.setData({teacher});
  },
  onLoad: function () {
    // 注册消息
    observer.on('hello',this.dealmsg);
    // 注销消息
    // observer.off('hello',this.dealmsg);
    // 发布消息
    // observer.emit('hello', 1,2,3);
    // observer.emit('hello', '网易');

    // 将数据种在本地存储中
    wx.setStorage({
      key: 'color',
      data: 'red',
    })

    // 修改全局数据
    app.globalData.msg = 'zzzz';

    // 页面加载完成，更新数据
    this.setData({
      msg: app.globalData.msg
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
