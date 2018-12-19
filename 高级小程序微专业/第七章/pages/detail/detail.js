// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: [],
    menus: [],
    teacher: [],
    hasBuy: false,
    hasSave: false
  },
  
  // 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟数据 
    // options = { id: '25030' }
    // console.log(options)
    wx.request({
      url: 'https://localhost:3001/action/detail?id=' + options.id,
      // 监听返回
      success: ({data}) => {
        // console.log(data)
        // 处理课程日期
        // 创建日期
        let date = new Date(+data.lesson[2])
        data.lesson[2] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        // 价格保留两位小数
        data.lesson[6] = data.lesson[6].toFixed(2)
        // 读取本地数据
        wx.getStorage({
          key: 'lesson',
          complete: res => {
            if(res.data && res.data.find(item => item[0] == data.lesson[0])){
              // 课程是购买过的
              data.hasBuy = true
            }
            // 存储数据
            this.setData(data)
          }
        })
        // 存储数据
        // this.setData(data)
        console.log(this)
      }
    })
    // 读取本地存储，查看是否收藏过课程
    wx.getStorage({
      key: 'saveLesson',
      complete: ({ data }) => {
        if (data && data.find(item => item[0] == options.id)) {
          // 已经收藏过了
          this.setData({
            hasSave: true
          })
        }
      }
    })
  },

  // 购买课程
  buyLesson() {
    // 将商品加入本地存储
    // 从本地存储中，获取所有加入购物车课程
    wx.getStorage({
      key: 'lesson',
      complete: ({data}) => {
        // 有课程数据
        // 是否该课程数据
        // if (data) {
        //   if(data.find(item => item[0] === this.data.lesson[0])){
        //     // 提醒用户，已购买课程，进入首页
        //     wx.showModal({
        //       title: '您已经购买该课程了，请不要重复购买',
        //       showCancel: false,
        //       confirmText: '再逛逛',
        //       success: () => {
        //         // 进入首页
        //         wx.switchTab({
        //           url: '/pages/index/index'
        //         })
        //       }
        //     })
        //   }
        // } else {
        //   // 没有课程数据
        //   data = []
        // }
        // 外面判断过是否购买，里面就可以直接存储了
        data = data || []
        // 如果已经购买过
        if (this.data.hasBuy) {
          // 点击时，从本地存储移除这个数据
          // 过滤出课程不相同的数据
          data = data.filter(item => item[0] != this.data.lesson[0])
        } else {
          // 添加该课程
          data.push(this.data.lesson)
        }
        // 更新本地存储
        wx.setStorage({
          key: 'lesson',
          data,
          // 存储成功，进入购物车页面
          success: () => {
            wx.switchTab({
              url: '/pages/shopping/shopping'
            })
          }
        })
        
      },
    })
    // 进入购物车页面
  },
  // 分享课程
  onShareAppMessage() {
    // 通知服务器，奖励用户
    wx.request({
      url: 'https://localhost:3001/action/share?id=' + this.data.lesson[0],
      success(res) {
        console.log(res.data)
      }
    })
  },
  // 收藏课程
  saveLesson() {
    // 将课程存在在本地
    // 从本地存储中，读取所有已经收藏的课程
    wx.getStorage({
      key: 'saveLesson',
      complete: ({data}) => {
        data = data || []
        // 如果收藏过了，点击按扭，取消收藏
        if(this.data.hasSave) {
          data = data.filter(item => item[0] != this.data.lesson[0])
        } else {
          // 否则，没有收藏过，加入收藏
          data.push(this.data.lesson)
        }
        // 最终更新数据
        this.setData({
          hasSave: !this.data.hasSave
        })
        // 更新本地存储
        wx.setStorage({
          key: 'saveLesson',
          data
        })
      }
    })
  }
})