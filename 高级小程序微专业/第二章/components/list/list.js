// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 注册数据
    data:{
      type: Object,
      values: {},
      // 监听data数据的改变
      observer(data){
        // console.log(data)
        // 更新要渲染的数据
        this.setData({
          renderData: data[this.data.choose] || []
        });
      }
    },
    // 显示数据的分类
    choose: {
      type: String,
      value: 'tuijian',
      // 6 监听数据改变，更新渲染的数据
      observer(id){
        this.setData({
          renderData: this.data.data[id] || []
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    renderData: []
  },

  // 组件创建完成
  created() {
    console.log(this)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
