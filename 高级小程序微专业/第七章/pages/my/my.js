// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { img: '/images/shopping.png', title: '已购课程', callback: 'showBuyLessonPage' },
      { img: '/images/share-prize.png', title: '分享有奖', callback: 'showSharePrizePage' },
      { img: '/images/save.png', title: '我的收藏', callback: 'showSaveLessonPage' },
      { img: '/images/coupon.jpg', title: '我的卡券', callback: 'showCoupons' }
    ]
  },
  // 已购课程
  showBuyLessonPage(){
    wx.navigateTo({
      url: '/pages/buyLesson/buyLesson'
    })
  },
  // 分享有奖
  showSharePrizePage(){
    wx.navigateTo({
      url: '/pages/sharePrize/sharePrize'
    })
  },
  // 我的收藏
  showSaveLessonPage(){
    wx.navigateTo({
      url: '/pages/saveLesson/saveLesson'
    })
  },
  // 我的卡券 zy
  showCoupons() {
    wx.navigateTo({
      url: '/pages/showCoupons/showCoupons'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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