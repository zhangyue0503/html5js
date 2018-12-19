// components/lessonCard/lessonCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: [],
      observer(newValue) {
        // console.log(newValue)
        // 如果包含了-，说明已经转换过了，如果不包含，我们要对日期进行转换
        if (newValue[2] && newValue[2].indexOf('-') === -1) {
           // 转换日期格式
           var date = new Date(+newValue[2])
           // 设置日期
           newValue[2] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
           // 更新数据
           this.setData({
             data: newValue
           })
        }
      }
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
    chooseLesson() {
      // 发布消息
      this.triggerEvent('lessontap', this.data.data)
    }
  }
})
