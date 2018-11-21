// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 注册数据
    data: {
      type: Array,
      values: []
    },
    categorys:{
      type:Array,
      values:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arrow: 'down',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 接收category发布的消息
    receiveMessage(e){
      // console.log(e);
      // 向页面发布消息
      this.triggerEvent('tabChange', { id: e.detail.id });
      this.setData({
        arrow: 'down'
      });
    },
    // 点击tab按扭，向页面发布消息
    changeTab(e){
      //如果点击的是分类按扭
      if (e.currentTarget.dataset.id === 'fenlei'){
        // 获取子组件更新数据
        let child = this.selectComponent('#category');
        // 更新数据
        child.setData({
          isShow: true
        });
        // 更改箭头样式
        this.setData({
          arrow:'up'
        });
        // 不要再向页面发布消息了
        return;
      }
      // console.log(e.currentTarget.dataset.id)
      // 发布消息
      this.triggerEvent('tabChange', { id: e.currentTarget.dataset.id});
    }
  }
})
