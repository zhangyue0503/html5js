// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 使用属性传递的数据，一定要在properties中注册，实现数据由外部流入内部
    // 模态框的标题
    title: {
      // 通过type定义类型，通过value定义默认值
      type: String,
      value: '',
      // 监听数据的改变
      observer(data){
        console.log(data)
      }
    },
    // 是否打开模态框
    isOpen: {
      type: Boolean,
      value: false
    },
    // 是否显示确定
    showConfirm: {
      type: Boolean,
      value: true
    },
    // 是否显示取消
    showCancel: {
      type: Boolean,
      value: true
    },
    // 确定文案
    confirmText: {
      type: String,
      value: '确定'
    },
    // 取消文案
    cancelText: {
      type: String,
      value: '取消'
    },
    // 确定字体色
    confirmColor: {
      type: String,
      value: '#333'
    },
    // 取消字体色
    cancelColor: {
      type: String,
      value: '#333'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击确认
    tapConfirm(){
      // console.log(this);
      this.setData({
        isOpen:false
      });
      // 通知页面，关闭了模态框
      this.triggerEvent('Confirm','hello');
    },

    // 点击取消
    tapCancel(){
      this.setData({
        isOpen: false
      });
      // 通知页面，关闭了模态框
      this.triggerEvent('Cancel', 'cancel');
    }
  }
})
