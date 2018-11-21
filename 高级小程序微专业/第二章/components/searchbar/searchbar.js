// components/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入数据
    inputChange(e){
      this.triggerEvent('change', e.detail.value);
      this.setData({
        searchText: e.detail.value
      });
    },
    // 搜索按扭
    tapSearch(){
      let text = this.data.searchText.trim();
      // 无内容时不提交
      if(text){
        this.triggerEvent('search', text);
      }
      this.setData({
        searchText: '',
        searchChangeText: ''
      });
    }
  }
})
