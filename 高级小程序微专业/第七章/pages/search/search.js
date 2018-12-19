// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示提示方案
    showTips: true,
    // 所有课程
    lessons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 向服务器发送搜索请求
    wx.request({
      url: 'https://localhost:3001/action/searchlesson?value=' + options.value,
      // 监听数据返回
      success: ({data}) => {
        // console.log(data)
        if (data.length){
          this.setData({
            lessons: data,
            showTips: false
          })
        }else{
          this.setData({
            showTips: true
          })
        }
        
      }
    })
  },

  // 点击课程卡片，进入详情页
  chooseLesson(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.detail[0],
    })
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