var tools = require('../../utils/tools.js');

var date = new Date();
// 重定义navigateTo方法
var originNavigateTo = wx.navigateTo;
// 重写方法
Object.defineProperty(wx, 'navigateTo', {
  configurable: true,
  writable: true,
  enumerable: true,
  value: function(opt){
    // 从第三个页面开始，重定向页面
    var page = getCurrentPages();
    // 当长度大于等于3的时候，我们就要重定向
    if(page && page.length >= 3){
      wx.redirectTo(opt);
    }else{
      //让页面进入堆栈
      originNavigateTo(opt);
    }
    console.log(page);
  }
});

Page({
  data: {
    user:{
      name:'小明',
      age: '30'
    },
    msg: 'hello'
  },
  intoNext(){
    wx.navigateTo({
      url: '/pages/second/second',
    })
  },
  demo: function(){
    console.log(123);
  },
  // 绑定页面滚动事件
  onPageScroll(){
    
    // 节流模式
    tools.throttle(this.demo, 200)
  },
  // 定义父组件的事件回调函数
  clickParent: function(e){
    console.log(e.target)
    switch(e.target.dataset.id){
      case 'first':
      console.log('first');
      break;
    }
  },
  onLoad: function () {
    console.log('load event', new Date() - date)
    // 如果缓存中有数据了，我们就不需要再发送请求了
    wx.getStorage({
      key: 'indexProduct1',
      success: function(res) {
        console.log(121)
        if(res){
          console.log(res)
        }else{
          wx.request({
            url: 'http://localhost:3000/static/json/list.json',
            success: (res) => {
              console.log(res);
              // 缓存数据
              wx.setStorage({
                key: 'indexProduct1',
                data: res
              })
            }
          })
        }
      },
    })
    
    // wx.request({
    //   url: 'http://localhost:3000/static/json/list.json',
    //   success: (res) => {
    //     console.log(res);
    //     // 缓存数据
    //     wx.setStorage({
    //       key: 'indexProduct',
    //       data: res
    //     })
    //   }
    // })
    //页面加载
    // console.log('page load');

    // 查看版本号，注意tools()，页面执行后才执行，如果exports=tools()，此处用toos.version，则在page load之前就会执行
    // console.log(tools().version);
  },
  onReady(){
    console.log('ready event', new Date() - date)
  },
  //点击页面的时候获取版本号
  clickIndexPage(){
    // 获取版本号
    // console.log(tools().version);

    // 修改数据
    this.setData({
      'user.name': '小白'
    });
    
    // 多次提交数据，建议合并成一次

  }
  
})
