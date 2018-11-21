// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收的数据
    data: {
      type: Array,
      values: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制组件的显隐
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换tab分类
    changeTab(e) {
      // 隐藏该组件
      this.setData({
        isShow: false
      });
      // 向tab组件发布分类id的消息
      this.triggerEvent('changeTab',{id: e.currentTarget.dataset.id});
     
    }
  }
})