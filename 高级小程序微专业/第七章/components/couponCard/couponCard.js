// components/couponCard/couponCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer(newValue) {
        // 格式化货币，保留两位小数
        newValue.discount = newValue.discount.toFixed(2);
        // 更新数据
        this.setData({
          data: newValue
        })
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
    // 选中的优惠券
    chooseCoupon() {
      // 发布消息
      this.triggerEvent('choosecoupon', this.data.data)
    }
  }
})
