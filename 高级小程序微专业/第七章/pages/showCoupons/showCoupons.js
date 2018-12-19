Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 优惠券列表
    coupons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取优惠券列表
    wx.request({
      url: 'https://localhost:3001/action/showcoupons',
      success: ({ data }) => {
        this.setData({
          coupons: data
        })
      }
    })
  }  
})