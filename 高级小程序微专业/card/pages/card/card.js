Page({
	// 绑定的数据
	data: {
		card: {}
	},
	// 页面加载完成，获取数据
	onLoad: function() {
		// 获取数据
		var card = wx.getStorageSync('card');
		// 存储
		this.setData({
			card: card
		})
	},
	submitFormData: function(e) {
		// 将数据存储在本地存储
		wx.setStorage({
			key: 'card',
			// 存储表单提交的数据
			data: e.detail.value,
			// 成功之后，进入首页
			success: function() {
				// 进入首页
				wx.navigateTo({url: '../index/index'})
			}
		})

	}
})