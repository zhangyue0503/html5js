// 获取数据
Page({
	// 存储数据
	data: {},
	onLoad: function() {
		var me = this;
		// 获取数据
		wx.getStorage({
			key: 'card',
			success: function(res) {
				// 存储数据
				me.setData({
					card: res.data
				})
			}
		});
		// 获取用户信息
		wx.getUserInfo({
			success: function(res) {
				// console.log(res)
				// 存储数据
				me.setData({
					userInfo: res.userInfo
				})
			}
		})
	},
	// 进入card页面
	goToCardPage: function() {
		wx.navigateTo({url: '/pages/card/card'})
	}
})