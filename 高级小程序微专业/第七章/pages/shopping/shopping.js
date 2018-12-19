// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有课程
    lessons: [],
    // 总价
    price: 0,
    // 显示优惠券列表
    showCoupons: false,
    // 可以使用优惠券
    useCoupons: true,
    // 优惠券列表
    coupons: [],
    // 选中使用的优惠券
    coupon: {},
    // 原始价格
    oldPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateData();
  },
  updateData() {
    // 获取本地存储中的数据
    wx.getStorage({
      key: 'lesson',
      complete: ({ data }) => {
        data = data || []
        // 数据不存在
        if (data.length == 0) {
          // 提醒用户，并且进入首页
          wx.showModal({
            title: '购物车空空如也！',
            confirmText: '进入首页',
            showCancel: false
          })
          return;
        }
        var price = data
          // 转换成价格数组
          .map(item => item[6])
          // 求所有成员之和
          .reduce((res, item) => +res + +item)
        // 如果数据存在
        this.setData({
          lessons: data,
          price,
          oldPrice: price
        })
        // console.log(data)
      }
    })

    // 获取优惠券列表
    wx.request({
      url: 'https://localhost:3001/action/showcoupons',
      success: ({ data }) => {
        this.setData({
          coupons: data
        })
      }
    })
  },
  onShow() {
    this.updateData();
  },

  // 显示优惠券列表
  showCoupons() {
    this.setData({
      showCoupons: !this.data.showCoupons
    })
  },
  
  // 选中优惠券 zy
  chooseCoupon(e) {
    if(e.detail) {
      // 计算新价格
      var price = this.data.oldPrice - e.detail.discount
      var coupons = []
      var coupon = {}
      if (this.data.coupon && e.detail.id == this.data.coupon.id) {
        // 重复点击，取消使用，恢复原始价格及选中状态
        price = this.data.oldPrice
        coupons = this.data.coupons.map((item) => {
          item.choose = false
          return item
        })
      } else {
        // 选中信息
        coupon = e.detail
        coupons = this.data.coupons.map((item) => {
          if (item.id == e.detail.id) {
            item.choose = true
          } else {
            item.choose = false
          }
          return item;
        })
      }
      this.setData({
        price,
        showCoupons: false,
        coupons,
        coupon
      })
    }
  },

  // 进入详情页
  showDetailPage(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.detail[0]
    })
  },
  // 购买课程
  buyLessons() {
    // 登录
    wx.login({
      success: ({ code }) => {
        // console.log(res)
        // 购买商品
        wx.request({
          url: `https://localhost:3001/action/pay?code=${code}&fee=${this.data.price * 100}&title=${this.data.lessons.map(item => item[1]).join('|')}&coupon=${this.data.coupon.id}&discount=${this.data.coupon.discount * 100}`,
          success: ({ data }) => {
            data.success = res => console.log(res)
            // 付款
            wx.requestPayment(data)
          }
        })
      }
    })
  }
})