// pages/pagemsg/pagemsg.js

let observer = require('../../utils/observer.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    color:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看页面传递的数据
    console.log(options);

    // 读取本地存储中的数据
    wx.getStorage({
      key: 'color',
      success: (res) => {
        this.setData({
          color: res.data
        });
      },
    });
    // 发布消息
    observer.emit('hello','张老师');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})