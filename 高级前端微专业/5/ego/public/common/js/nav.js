// 顶部Tab
(function(App) {
	function Tabs(options) {
		_.extend(this, options)
		this.index = this.index || 0;

		// 缓存节点
		this.nTab = this.container.getElementsByTagName('ul')[0];
		this.nTabs = this.nTab.children;

		// 下划线节点
		this.nThumb = this.container.querySelector('.tabs_thumb');

		this.init();
	}

	Tabs.prototype.init = function() {
		//绑定事件
		for (var i = 0; i < this.nTabs.length; i++) {
			this.nTabs[i].addEventListener('mouseenter', function(index) {
				this.highlight(index)
			}.bind(this, i))
			this.nTabs[i].addEventListener('click', function(index) {
				this.setCurrent(index)
			}.bind(this, i))
		}

		this.nTab.addEventListener('mouseleave', function() {
			this.highlight(this.index);
		}.bind(this));

		this.setCurrent(this.index);
	}

	//高亮当前tab
	Tabs.prototype.highlight = function(index) {
		var tab = this.nTabs[index];
		this.nThumb.style.width = tab.offsetWidth + 'px';
		this.nThumb.style.left = tab.offsetLeft + 'px';
	}
	//设置当前选中tab
	Tabs.prototype.setCurrent = function(index) {
		_.delClassName(this.nTabs[this.index], 'z-active');
		this.index = index;
		_.addClassName(this.nTabs[index], 'z-active');
		this.highlight(index);
	}
	App.Tabs = Tabs;

})(window.App);


// 搜索框
(function(App) {
	function Search(container) {
		this.nForm = container;
		this.nKeyword = this.nForm.getElementsByTagName('input')[0];
		this.init();
	}
	Search.prototype.init = function() {
		this.nForm.addEventListener('submit', this.search.bind(this), false);
	}
	Search.prototype.search = function(ev) {
		//验证输入是否为空
		//如果为空，不提交表单
		if (!this.nKeyword.value) {
			ev = ev || window.event; // Event对象
			if (ev.preventDefault) { // 标准浏览器
				ev.preventDefault();
			} else { // IE浏览器
				window.event.returnValue = false;
			}
		}
	}
	App.Search = Search;
})(window.App);


(function(App) {
	var nav = {
		init: function(options) {
			options = options || {};
			this.loginCallback = options.login;
			this.nName = _.$('nickname');
			this.nSexIcon = _.$('sexIcon');
			this.nGuest = _.$('guest');
			this.nUser = _.$('userdropdown')
			this.nLogout = _.$('logout');

			this.hdtab = new App.Tabs({
				container: _.$('hdtabs'),
				// index: this.getTabIndex()
			});
			

			this.search = new App.Search(_.$('hdSearch'));
			//绑定登录，注册，登出事件
			this.initLoginStatus();

			//退出登录
			this.nLogout.addEventListener('click', function() {
				_.ajax({
					url: '/api/logout',
					method: 'POST',
					data: {},
					success: function(data) {
						console.log(data)
						if (data.code === 200) {
							window.location.href = "/index";
						}
					},
					fail: function() {}
				});
			});
		},
		getTabIndex: function() {
			return this.options.index || 0;
		},
		initLoginStatus: function() {
			_.ajax({
				url: '/api/users?getloginuser',
				success: function(data) {
					// this.initUserInfo(data.result);
				}.bind(this),
				fail: function(data) {}
			});
		},
		initUserInfo: function(data) {

			//设置用户姓名和性别ICON
			this.nName.innerText = data.nickname;
			_.addClassName(this.nSexIcon, iconConfig[data.sex]);

			//隐藏登录，注册按扭，显示用户信息
			_.addClassName(this.nGuest, 'f-dn');
			_.delClassName(this.nUser, 'f-dn');
			App.user = data;
		}
	}
	App.nav = nav;

})(window.App);