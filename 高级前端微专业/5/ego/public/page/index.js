var iconConfig = [
	'u-icon-male',
	'u-icon-female'
];
var followConfig = [
	{
		class:'z-unfollow',
		text:'关注',
		icon:''
	},
	{
		class:'z-follow',
		text:'已关注',
		icon:''
	}
];
// var App = {};


// window.App.nav.init();

// 轮播图
(function(App) {
	var template = '<div class="m-slider"></div>'

	function Slider(options) {
		_.extend(this, options);
		// ...
		this.imgLength = this.imgPath.length;
		this.container = _.$('banner');
		this.interval = 5000;
		//组件节点
		this.slider = _.html2node(template);
		this.sliders = this.buildSlider();
		this.cursors = this.buildCursor();
		//初始化事件
		this.slider.addEventListener('mouseenter', this.stop.bind(this));
		this.slider.addEventListener('mouseleave', this.autoPlay.bind(this));
		//初始化动作
		this.container.appendChild(this.slider);
		this.nav(this.initIndex || 0);
		this.autoPlay();
	}
	//...
	//下一页
	Slider.prototype.next = function() {
		var index = (this.index + 1) % this.imgLength;
		this.nav(index)
	}
	//跳到指定页
	Slider.prototype.nav = function(index) {
		if (this.index === index) return;
		this.last = this.index;
		this.index = index;

		this.fade();
		this.setCurrent();
	}
	//设置当前选中状态
	Slider.prototype.setCurrent = function() {
		//去除之前选中节点的选中状态
		for (var i = 0; i < this.cursors.length; i++) {
			_.delClassName(this.cursors[i], 'active');
		}
		//添加当前选中节点的选中状态
		_.addClassName(this.cursors[this.index], 'active');
	}

	//自动播放
	Slider.prototype.autoPlay = function() {
		this.timer = setInterval(function() {
			this.next();
		}.bind(this), this.interval)
	}
	//停止自动播放
	Slider.prototype.stop = function() {
		clearInterval(this.timer);
	}

	//切换效果
	Slider.prototype.fade = function() {
		if (this.last !== undefined) {
			this.sliders[this.last].style.opacity = 0;
		}
		this.sliders[this.index].style.opacity = 1;
	}

	// 构造节点
	Slider.prototype.buildSlider = function() {
		var sliders = document.createElement('ul'),
			html = '';
		for (var i = 0; i < this.imgPath.length; i++) {
			html += `<li class="slider_img">
    				<img src="${this.imgPath[i]}" alt="">`;
		}
		sliders.innerHTML = html;
		this.slider.appendChild(sliders);
		return sliders.children;
	}

	// 构造指示器节点
	Slider.prototype.buildCursor = function() {
		var cursor = document.createElement('ul'),
			html = '';

		cursor.className = 'm-cursor';
		for (var i = 0; i < this.imgLength; i++) {
			html += `<li data-index=${i}></li>`;
		}
		cursor.innerHTML = html;
		this.slider.appendChild(cursor);
		//处理点击事件
		cursor.addEventListener('click', function(event) {
			//index=点击节点的下标
			if (event.target.dataset.index)
				this.nav(event.target.dataset.index)
		}.bind(this));
		return cursor.children;
	}

	App.Slider = Slider;
})(window.App);

//明日之星
(function(App) {
	function StarList(container, data) {
		this.listInfo = data;
		this.container = container;
		// this.initList();//initList
		this.render(data);
		//绑定事件
		console.log(this.container)
		this.container.addEventListener('click', this.followHandler.bind(this));
		
	}

	_.extend(StarList.prototype, App.emitter);
	
	StarList.prototype.render = function(data) {
		var html = ""
		data.forEach(function(item) {
			html += this.renderItem(item);
		}.bind(this))
		
		this.container.innerHTML = html;
	}
	StarList.prototype.renderItem = function(data) {
		var config = followConfig[Number(!!data.isFollow)];
		var html = `<li class="m-card">
				<img src="./res/images/avatar.png" alt="" class="card_avatar">
				<div class="card_info">
					<div>${data.nickname}</div>
					<div><span>作品 ${data.workCount}</span><span>粉丝 ${data.followCount}</span></div>
				</div>
				<button class="u-btn u-btn-sm ${config.class}" data-userid="${data.id}">
					<span class="u-icon ${config.icon}"></span>${config.text}
				</button>
			</li>`;
		return html;
	}
	StarList.prototype.followHandler = function(event) {
		var target = event.target;
		if (event.target.tagName === 'BUTTON') {
			var user = window.App.user;
			//未登录情况
			if (user === undefined) {
				this.emit('login');
				return;
			}
			var userId = target.dataset.userid,
				data;
				
			//data=点击的用户信息
			for(var k in this.listInfo){
				if(this.listInfo[k].id == userId){
					data = this.listInfo[k];
				}
			}
			// console.log(_.hasClassName(target, 'z-unfollow'))
			if (_.hasClassName(target, 'z-unfollow')) {
				this.follow(data, target.parentNode);
			} else {
				this.unFollow(data, target.parentNode);
			}
		}
	}
	StarList.prototype.follow = function(followInfo, replaceNode) {
		_.ajax({
			url: '/api/users?follow',
			method: 'POST',
			data: {
				id: followInfo.id
			},
			success: function(data) {
				if (data.code == 200) {
					followInfo.isFollow = true;
					followInfo.followCount++;
					var newNode = _.html2node(this.renderItem(followInfo));
					replaceNode.parentNode.replaceChild(newNode, replaceNode);
				}
			}.bind(this),
			fail: function() {}
		});
	}
	StarList.prototype.unFollow = function(followInfo, replaceNode) {
		_.ajax({
			url: '/api/users?unfollow',
			method: 'POST',
			data: {
				id: followInfo.id
			},
			success: function(data) {
				if (data.code == 200) {
					followInfo.isFollow = false;
					followInfo.followCount--;
					var newNode = _.html2node(this.renderItem(followInfo));
					replaceNode.parentNode.replaceChild(newNode, replaceNode);
				}
			}.bind(this),
			fail: function() {}
		});
	}
	App.StarList = StarList;

})(window.App);

// //首页
(function(App){
	var page = {
		init: function(){
			this.initNav();
			this.initStarList();
			this.slider = new App.Slider({
				imgPath: [
					'./res/images/banner0.jpg',
					'./res/images/banner1.jpg',
					'./res/images/banner2.jpg',
					'./res/images/banner3.jpg'
				]
			});
			this.sideTab = new App.Tabs({container:_.$("hdtabs_right")});
		},
		initNav:function(argument){
			
			App.nav.init({
				login:function(data){
					if(!window.App.user.username){
						window.App.user = data;
						this.initStarList();
					}
				}.bind(this)
			});
		},
		initStarList:function(){
			_.ajax({
				url:'/api/users?getstarlist',
				success:function(data){
					if(data.code === 200){
						if(!this.starList){

							this.starList = new App.StarList( _.$('star'), data.result);
							// this.starList.on('login', function(){
							// 	this.nav.showLogin();
							// }.bind(this));
						}else{
							this.starList.render(data.result);
						}
					}
				}.bind(this),
				fail:function(){}
			});
		}
	};
	//页面初始化
	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});
})(window.App);

// //登录Modal
// (function(App){
// 	var validator = App.validator;
// 	var html = `<div>...</div>`;
// 	function LoginModal(){
// 		this.node = _.html2node(html);
// 		App.Modal.call(this, {});
// 		//缓存节点 this.nUsername...
// 		this.initLoginEvent();
// 	}
// 	LoginModal.prototype = Object.create(App.Modal.prototype);

// 	LoginModal.prototype.initLoginEvent = function(){
// 		//绑定提交事件
// 		//绑定跳转注册事件
// 	}
// 	LoginModal.prototype.check = function(){
// 		var isValid = true,
// 			flag = true;

// 		//验证用户名
// 		flag = flag && !validator.isEmpty(this.nUsername.value);
// 		flag = flag && validator.isPhone(this.nUsername.value);
// 		!flag && this.showError(this.nUsername, true);
// 		isValid = isValid && flag;

// 		//验证密码
// 		flag = true;
// 		flag = flag && !validator.isEmpty(this.nPassword.value) ;
// 		!flag && this.showError(this.nPassword, true);
// 		isValid = isValid && flag;

// 		//显示错误
// 		return isValid;
// 	}
// 	LoginModal.prototype.submit = function(event){
// 		event.preventDefault();
// 		if(this.check()){
// 			var data = {
// 				username:this.nUsername.value.trim(),
// 				password:hex_md5(this.password.value),
// 				remember:!!this.nRemember.checked
// 			};
// 			_.ajax({
// 				url:'/api/login',
// 				method:'POST',
// 				data:data,
// 				success:function(data){
// 					if(data.code === 200){
// 						this.hide();
// 						this.emit('ok', data.result);
// 					}else{
// 						//根据错误码显示不同的错误提示
// 						switch(data.code){
// 							case 400:
// 							this.nError.innerText = '密码错误，请重新输入';
// 							break;
// 							case 404:
// 							this.nError.innerText = '用户不存在，请重新输入';
// 							break;
// 						}
// 						this.showError(this.nForm, true);
// 					}
// 				}.bind(this),
// 				fail:function(){}
// 			});
// 		}
// 	}

// 	App.LoginModal = LoginModal;

// })(window.App);

// // 注册按扭
// _.$('goregister').addEventListener('click', function(){
// 	this.emit('register');
// }.bind(this));

// this.nLogin.addEventListener('click', function(){
// 	this.modal = new App.LoginModal();
// 	this.modal.on('ok', function(data){
// 		this.initUserInfo(data);
// 		this.loginCallback && this.loginCallback(data);
// 	}.bind(this))
// 	this.modal.on('register',function(){
// 		this.modal.hide();
// 		this.nRegister.click();
// 	}.bind(this));
// }.bind(this));

// //注册modal实现
// (function(App){
// 	var html = `<div>...</div>`
// 	function RegisterModal(){
// 		this.node = _.html2node(html);
// 		App.Modal.call(this, {});
// 		//缓存节点 this.nPhone
// 		// ...
// 		this.initSelect();
// 		this.initRegisterEvent();
// 	}
// 	RegisterModal.prototype = Object.create(App.Modal.prototype);
// 	RegisterModal.prototype.initRegisterEvent = function(){

// 	}
// 	RegisterModal.prototype.initSelect = function(){

// 	}
// 	RegisterModal.prototype.resetCaptcha = function(){
// 		this.captchaImg.src = "/captcha?t="+ +new Date();
// 	}
// 	RegisterModal.prototype.submit = function(){
// 		//...
// 		if(this.check()){
// 			var data = {
// 				username:this.phone.value.trim(),
// 				nickname:this.nick.value.trim(),
// 				password:hex_md5(this.pwd.value),
// 				sex:this.getRadioValue('registerform', 'sex'),
// 				captcha:this.captcha.value.trim()
// 			};
// 			this.birthday = this.birthdaySelect.getValue().join('-');
// 			this.location = this.locationSelect.getValue();
// 			data.province = this.location[0];
// 			data.city = this.location[1];
// 			data.district = this.location[2];
// 			data.birthday = this.birthday;

// 			_.ajax({
// 				url:'',
// 				method:'',
// 				data:data,
// 				success:function(data){
// 					if(data.code === 200){
// 						this.hide();
// 						this.emit('ok');
// 					}else{
// 						this.nError.innerText = data.msg;
// 						this.showError(this.nForm, true);
// 					}
// 				}.bind(this),
// 				fail:function(){}
// 			});
// 		}
// 	}
// 	RegisterModal.prototype.check = function(){
// 		var isValid = true,
// 			errorMsg = "";
// 		var checkList = [
// 			[this.phone, ['required', 'phone']],
// 			[this.nick, ['required', 'nickname']],
// 			[this.pwd, ['required', 'length']],
// 			[this.confirmpwd, ['required', 'length']],
// 			[this.captcha, ['required']],
// 		];
// 		isValid = this.checkRules(checkList);
// 		if(!isValid){
// 			errorMsg = '输入有误';
// 		}
// 		//验证两次密码
// 		//验证条款是否为空
// 		//显示错误
// 		return isValid;
// 	}
// 	RegisterModal.prototype.checkRules = function(checkRules){
// 		//...
// 		for(var i=0;i<checkRules.length;i++){
// 			var checkItem = checkRules[i][0],
// 				rules = checkRules[i][1],
// 				flag;
// 				for(var j=0;j<rules.length;j++){
// 					var key = rules[j];
// 					switch(key){
// 						//...
// 						case 'nickname':
// 						flag = validator.isNickName(checkItem.value);
// 						break;
// 						case 'length':
// 						flag = validator.isLength(checkItem.value,6,16);
// 						break;
// 					}
// 					if(!flag){break;}
// 				}
// 		}
// 		//显示错误
// 	}
// 	//...
// 	App.RegisterModal = RegisterModal;
// })(window.App);

// //select实现
// (function(App){
// 	var _ = App.util;
// 	var template = `<div class="m-select"></div>`;
// 	function Select(options){
// 		_.extend(this, options);
// 		this.body = _.html2node(template);
// 		//缓存节点 this.nSelection ...
// 		this.init();
// 	}
// 	_.extend(Select.prototype, App.emitter);
// 	Select.prototype.init = function(){}
// 	Select.prototype.initEvent = function(){
// 		this.body.addEventListener('click', this.clickHandler.bind(this));
// 		document.addEventListener('click', this.close.bind(this));
// 	}
// 	Select.prototype.render = function(data, defaultIndex){
// 		var optionsHTML = '';
// 		for(var i=0;i<data.length;i++){
// 			//格式化数据{name:,value:}
// 			optionsHTML += `<li data-index=${i}>${data[i].name}</li>`
// 		}
// 		this.nOption.innerHTML = optionsHTML;
// 		this.nOptions = this.nOption.children;
// 		this.options = data;
// 		this.selectedIndex = undefined;
// 		//默认选中第一项
// 		this.setSelect(defaultIndex || 0);
// 	}
// 	Select.prototype.clickHandler = function(event){
// 		// this.setSelect() or this.toggle()
// 	}
// 	Select.prototype.open = function(){
// 		_.delClassName(this.nOption, 'f-dn');
// 	}
// 	Select.prototype.close = function(){
// 		_.addClassName(this.nOption, 'f-dn');
// 	}
// 	Select.prototype.toggle = function(){
// 		._hasClassName(this.nOption, 'f-dn') ? this.open() : this.close();
// 	}
// 	Select.prototype.getValue = function(){
// 		return this.options[this.selectedIndex].value;
// 	}
// 	Select.prototype.setSelect = function(){
// 		//取消上次选中效果
// 		if(this.selectedIndex !== undefined){
// 			_.delClassName(this.nOptions[this.selectedIndex], 'z-select');
// 		}
// 		//设置选中
// 		this.selectedIndex = index;
// 		this.nValue.innerText = this.options[this.selectedIndex].name;
// 		_.addClassName(this.nOptions[this.selectedIndex], 'z-select');

// 		this.emit('select', this.getValue());
// 	}
// 	App.Select = Select;
// })(window.App);

// // 级联选择器实现
// (function(App){
// 	function CascadeSelect(options){
// 		_.extend(this, options)
// 		this.selectList = [];
// 		this.init();
// 	}
// 	CascadeSelect.prototype.init = function(){
// 		for(var i=0;i<3;i++){
// 			var select = new App.Select({
// 				container:this.container
// 			});
// 			select.on('select', this.onChange.bind(this, i));
// 			this.selectList[i] = select;
// 		}
// 		this.selectList[0].render(this.data);

// 	}
// 	CascadeSelect.prototype.getValue = function(){}
// 	//响应select事件，渲染下一个Select数据
// 	CascadeSelect.prototype.onChange = function(index){
// 		var next = index + 1;
// 		if(next === this.selectList.length) return;
// 		this.selectList[next].render(this.getList(next));
// 	}
// 	//获取第N个Select数据
// 	CascadeSelect.prototype.getList = function(n){}
// })(window.App);


// //验证码实现
// this.nCaptchaImg.addEventListener('click', function(){
// 	this.resetCaptcha()
// }.bind(this));

// App.nav.init();


// window.App.Search(document.getElementById('hdSearch')).search()