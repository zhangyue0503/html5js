// pages/pay/pay.js
Page({
  // 生成A类码
  createAQrcode(){
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=',
    })
  },


  /**
   * 页面的初始数据
   */
  data: {

  },

  // 购买课程方法
  buyLesson(){
    // 登录
    wx.login({
      // 登录成功
      success(res){
        // console.log(res)
        // 开始购买
        wx.request({
          url: `https://localhost:3001/action/pay?code=${res.code}&fee=1&title=小程序`,
          // 监听返回
          success(res){
            
            res.data.success = res => console.log(res)
            wx.requestPayment(res.data)
          }
        })
      }
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