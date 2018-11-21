// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab组件 的数据
    tabs: [
      { title: '推荐', id: 'tuijian' },
      { title: '折扣', id: 'zhekou' },
      { title: '热榜', id: 'rebang' },
      { title: '分类', id: 'fenlei' }
    ],
    categorys: [
      { title: '全部', id: 'quanbu' },
      { title: '居家', id: 'jujia' },
      { title: '食厨', id: 'shichu' },
      { title: '配件', id: 'peijian' },
      { title: '服装', id: 'fuzhuang' },
      { title: '电器', id: 'dianqi' },
      { title: '洗护', id: 'xihu' },
      { title: '婴童', id: 'yingtong' },
      { title: '杂货', id: 'zahuo' },
      { title: '饮食', id: 'yinshi' }
    ],
    //list组件数据
    data: {},
    // 当前选中的tabID
    tabID: ''
  },
  
  // 监听tab组件发布的消息
  changeList(e){
    this.setData({
      // 4 更新id
      tabID: e.detail.id
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://localhost:3001/static/json/list.json',
      // 监听数据返回
      success: ({data}) => {
        // console.log(res)
        // 更新数据
        this.setDate({data});
      }
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