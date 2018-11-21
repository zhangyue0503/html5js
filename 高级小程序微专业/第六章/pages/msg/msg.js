// 引入配置信息
var conf = require('../../utils/conf.js');
// 解构APPID及SECRET
var {APPID, SECRET} = conf;


// pages/msg/msg.js
Page({

  // 提交表单事件
  submitData(e) {
    var me = this;
    wx.login({
      success(res){
        // 获取openid
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${res.code}&grant_type=authorizaction_code`,
          success(res){
            me.getToken(token => {
              wx.request({
                url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+token,
                method: 'post',
                data:{
                  touser: res.data.openid,
                  template_id: '',
                  form_id: e.detail.formId,
                  data: {
                    keyword1: {
                      value:'网易'
                      },
                    keyword2: {
                      value: 'hello'
                    },
                    keyword3: {
                      value: '试试'
                    },
                  }
                },
                success(res){

                }
              })
            })
          }
        })
      }
    })
    
  },
  showTemplateList(){
    this.getToken(token => {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=' + token,
        method: 'POST',
        data: {
          offset: 0,
          count: 5
        },
        success(res) {
          console.log(res)
        }
      })
    });
  },
  // 删除模板
  deleteTemplate(){
    this.getToken(token => {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/library/del?access_token=' + token,
        method: 'post',
        data: {
          template_id: ''
        },
        success(res) {
          console.log(res)
        }
      })
    })
  },
  // 添加模板标题
  addTemplate(){
    this.getToken(token => {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/library/add?access_token=' + token,
        method: 'post',
        data: {
          id: 'AT002',
          keyword_id_list: [6, 5, 4]
        },
        success(res){
          console.log(res)
        }
      })
    })
  },
  // 查看购买成功标题字段
  showBuySuccessDetail(){
    this.getToken(token => {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token='+token,
        method:"post",
        data:{
          id: 'AT002'
        },
        success(res){
          console.log(res)
        }
      })
    });
  },

  // 获取模板标题列表
  showMessageTitleList(){
    this.getToken(token => {
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=' + token,
        method: 'POST',
        data:{
          offset:0,
          count: 5
        },
        success(res){
          console.log(res)
        }
      })
    });
  },
  // 获取token并执行回调函数
  getToken(fn){
    // 获取token
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`,
      success(res) {
        // 执行回调函数
        fn(res.data.access_token)
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