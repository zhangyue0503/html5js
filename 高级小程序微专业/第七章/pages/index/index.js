//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 搜索框绑定的数据
    searchValue: '',
    // banner数据
    banner: [],
    // 滚动视图的高度
    height: 0,
    // 广告数据
    ads: [],
    // 广告容器的宽度
    adWidth: '',
    // 课程标题
    lessonTilte: [],
    // 第一类课程主体，切换tab，将更新该数据，默认显示第一类
    lessons: [],
    // 所有课程数据
    allLesson: [],
    // 周三显示优惠券信息
    showCoupon: false,
    // 优惠券信息
    coupon: {}
  },
  
  onLoad: function () {
    // 如果是周三，请求本周优惠券接口，获取优惠券信息 zy
    var week = new Date().getDay();
    if (week == 3) {
      wx.request({
        url: 'https://localhost:3001/action/usercoupon',
        success: ({ data }) => {
          if(data) {
            this.setData({
              showCoupon: true,
              coupon: data
            })
          }
        }
      })
    }

    // 获取滚动视图页面的高度
    var height = wx.getSystemInfoSync().windowHeight - 50;
    wx.request({
      url: 'https://localhost:3001/action/home',
      // 监听数据返回
      success: ({ data }) => {
        console.log(data)
        // 创建课程标题和数据
        var lessonTitle = data.lesson.map(({id, title}) => ({id, title}))
        lessonTitle[0].cls = 'choose'
        // 将返回的数据，存储在页面中
        this.setData({
          height,
          banner: data.banner,
          ads: data.ads,
          // 广告容器宽度=180*长度
          adWidth: 180 * data.ads.length,
          // 课程标题
          lessonTitle,
          // 课程数据
          lessons: data.lesson[0].data,
          // 所有课程数据
          allLesson: data.lesson
        })
      }
    })
  },

  // 存储优惠券 zy
  saveCoupon() {
    // 调用接口保存领取信息
    if(this.data.coupon) {
      wx.request({
        url: 'https://localhost:3001/action/savecoupon?id=' + this.data.coupon.id,
        success: ({ data }) => {
          if (data.errno == 'ok') {
            // 领取成功，隐藏领取按扭，直接进入优惠券列表页面
            this.setData({
              showCoupon: false
            })
            wx.navigateTo({
              url: '/pages/showCoupons/showCoupons'
            })
          } else {
            // 领取失败，打印返回的信息
            wx.showToast({
              title: data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
    
  },

  // 进入搜索页面
  showSearchPage(e) {
    // console.log(e)
    // 清空输入框的值
    this.setData({
      searchValue: ''
    })
    // 导航
    wx.navigateTo({
      url: '/pages/search/search?value=' + e.detail.value
    })
  },

  // 切换课程方法
  toogleLesson(e) {
    // 获取id
    let id = e.target.dataset.id
    // 更新title数据
    let lessonTitle = this.data.lessonTitle.map((item) => {
      item.cls = item.id == id ? 'choose' : ''
    return item
    })
    // 课程主体
    // let lessons = this.data.allLesson.filter(item => item.id == id)[0].data
    let lessons = this.data.allLesson.find(item => item.id == id).data

    this.setData({
      lessonTitle,
      lessons
    })
  },

  // 进入详情页的方法
  showDetailPage(e) {
    // console.log(data)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.detail[0],
    })
  }
})
