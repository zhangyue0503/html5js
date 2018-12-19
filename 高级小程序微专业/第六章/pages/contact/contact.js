// pages/contact/contact.js
Page({

  // 通知用户
  sendMessage(){
    // 获取登录code
    wx.login({
      success(res){
        console.log(res)
        // 获取openid
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx5dd579583ada76e1&secret=d8238bb8336e5e3f15525cc3217e1033&js_code=${res.code}&grant_type=authorizaction_code`,
          success(res){
            var openid = res.data.openid;
            // 获取token
            wx.request({
              url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5dd579583ada76e1&secret=d8238bb8336e5e3f15525cc3217e1033`,
              success(res) {
                // 发送消息
                wx.request({
                  url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + res.data.access_token,
                  method: 'post',
                  data: {
                    touser: openid,
                    msgtype: 'text',
                    text: {
                      content: 'hello world'
                    }
                  },
                  success(res){
                    console.log(res)
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

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