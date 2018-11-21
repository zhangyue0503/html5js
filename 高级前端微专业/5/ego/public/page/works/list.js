// (function(App){
// 	var page = {
// 		init: function(){
// 			this.initNav();
// 		},
// 		initNav: function(){
// 			App.nav.init();
// 			// App.nav.init({
// 			// 	login:function(user){
// 			// 		//user即当前登录的用户
// 			// 		this.initProfile(user);
// 			// 	}.bind(this)
// 			// });
// 		},
// 	};

// 	//页面初始化
// 	document.addEventListener('DOMContentLoaded', function(e){
// 		page.init();
// 	});
// })(window.App);
App.nav.init();

// //根据生日计算星座
// function getConstellation(birthday){
// 	birthday = new Date(birthday);
// 	var month = birthday.getMonth() + 1;
// 	var date = birthday.getDate();
// 	// var constellations = [
// 	// [12, 22, 1,19, '摩羯'],[1, 20, 2, 18, '水瓶']
// 	// ];
// 	// for(var i=0;i<constellations.length;i++){
// 	// 	var c = constellations[i];
// 	// 	if(month === c[0] && date >= c[1] || month===c[2] && date <= c[3]){
// 	// 		return c[4];
// 	// 	}
// 	// }
// 	var constellations = ['摩羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯'];
// 	return constellations[month - (date -14 < '657778999988'.charAt(month-1))];

// }

// // 初始化列表
// var page = {
// 	init: function(){
// 		this.initNav();
// 	},
// 	initNav: function(){
// 		App.nav.init({
// 			login: function(user){
// 				// user 即当前登录的用户
// 				this.initList();
// 				this.addEvent();
// 			}.bind(this);
// 		});
// 	},
// 	// 初始化列表
// 	initList: function(){
// 		this.loadList({
// 			query: {},
// 			callback: function(data){
// 				_.addClassName($('#g-bd'), 'list-loaded');
// 				if(!data.result.data.length){
// 					$('.m-works').innerHTML = '你还没有创建过作品~';
// 					return;
// 				}
// 				this.renderList(data.result.data);
// 			}.bind(this)
// 		});

// 	},
// 	loadList: function(options){
// 		_.ajax({
// 			data:options.query,
// 			url:'/api/works',
// 			success: function(data){
// 				options.callback(data);
// 			}
// 		});
// 	},
// 	renderList: function(list){

// 		var rawTemplate = `
// 			{{#each works}}
// 			<li class="item">
// 				<a href="#">
// 					{{#if this.coverUrl}}
// 					<img src="{{this.coverUrl}}" alt="{{this.name}}">
// 					{{else}}
// 					<img src="default_cover.png" alt="作品默认封面">
// 					{{/if}}
// 					<h3>{{this.name}}</h3>
// 				</a>
// 			</li>
// 			{{/each}}
// 		`;

// 		var template = Handlebars.compile(rawTemplate);
// 		var context = {
// 			"works": [
// 			// ...
// 			]
// 		};
// 		var html = template(context);
// 		var str = '';
// 		// 拼装列表的 html 字符串
// 		$('.m-works').innerHTML = str;
// 	},
// 	addEvent: function(){
// 		// 给编辑和删除图标添加点击事件
// 		var self = this;
// 		#('.m-works').addEventListener('click', function(e){
// 			var target = e.target;
// 			if(target.classList.contains('u-icon')){
// 				var worksEl = target.parentNode.parentNode;
// 				var options = {
// 					name: $('h3', worksEl).innerHTML,
// 					id: worksEl.dataset.id
// 				}
// 				if(target.classList.contains('u-icon-delete')){
// 					self.deleteWorks(options);
// 				}else if(target.classList.contains('u-icon-edit')){
// 					self.editWorks(options, worksEl);
// 				}
// 			}
// 		});
// 	},
// 	deleteWorks: function(works){
// 		var self = this;
// 		var modal = new App.Modal({
// 			content: `确定要删除作品 <em class="del-item-name">"${works.name}"</em> 吗？`;
// 		});
// 		modal.on('ok', function(){
// 			this.hide();
// 			_.ajax({
// 				method: 'DELETE',
// 				url: '/api/works/'+ works.id,
// 				success: function(data){
// 					// 删除成功后，重新刷新列表
// 					self.initList();
// 				}
// 			});
// 		});
// 	},
// 	editWorks: function(){

// 	}
// };

// (function(){
// 	// 默认选中的页码
// 	var DEFAULT_CURRENT_PAGE = 1;
// 	// 默认显示的页码个数
// 	var DEFAULT_SHOW_NUM = 8;
// 	// 每页显示的默认数量
// 	var DEFAULT_ITEMS_LIMIT = 10;
// 	function Pagination(options){
// 		this.options = options;
// 		this.current = options.current || DEFAULT_CURRENT_PAGE;
// 		this.showNum = options.showNum || DEFAULT_SHOW_NUM;
// 		this.itemsList = options.itemsList || DEFAULT_ITEMS_LIMIT;
// 		this.render();
// 	}
// 	Pagination.prototype.render = function(){
// 		this.destory();
// 		var ul = createElement('ul', 'm-pagination');
// 		this.first = createElement('li', '', '第一页');
// 		this.first.dataset.page = 1;
// 		ul.appendChild(this.first);
// 		//类似地，创建prev元素
// 		this.pageNum = Math.ceil(this.options.total / this.itemsLimit);
// 		this.startNum = Math.floor((this.current - 1) / this.showNum) * this.showNum +1;
// 		this.numEls = [];
// 		for(var i = 0; i< this.showNum;i++){
// 			var numEl = createElement('li'),num = this.startNum + i;
// 			if(num <= this.pageNum){
// 				numEl.innerHTML = 'num';
// 				numEl.dataset.page = num;
// 				this.numEls.push(numEl);
// 				ul.appendChild(numEl);
// 			}
// 		}
// 		// 类似地，创建 next 和 last 元素
// 		this.options.parent.appendChild(ul);

// 		this.setStatus();
// 		this.addEvent();
// 	}
// 	Pagination.prototype.destory = function(){
// 		if(this.container){
// 			this.options.parent.removeChild(this.container);
// 			this.container = null;
// 		}
// 	}
// 	Pagination.prototype.setStatus = function(){
// 		// 判断是否为第1页，如果是，则设置 first 和 prev元素的样式为disabled
// 		// 同理判断是否为最后一页，相应地设置 next 和 last 元素的样式
// 		// 设置 prev 和 next 两个元素的data-page值
// 		this.numEls.forEach(function(numEl)){
// 			numEl.className = '';
// 			if(this.current === parseInt(numEl.dataset.page)){
// 				numEl.className = 'active';
// 			}
// 		}.bind(this);
// 	}
// 	Pagination.prototype.addEvent = function(){
// 		var clickHandler = function(e){
// 			var numEl = e.target;
// 			// 如果已经是disabled或者active状态，则不操作
// 			this.current = parseInt(numEl.dataset.page);
// 			// 判断是否需要翻篇
// 			if(this.current < this.startNum || this.current >= this.startNum+this.showNum){
// 				this.render();
// 			}else{
// 				this.setStatus();
// 			}
// 			//有切换动作就需要回调
// 			this.options.callback(this.current);

// 		}.bind(this);
// 		this.container.addEventListener('click', clickHandler);
// 	}
// 	window.App.Pagination = Pagination;
// })();
// // 调用方式
// new App.Pagination({
// 	parent: document.querySelector('#pagination'),
// 	total: 500,
// 	current: 1,
// 	showNum: 8,
// 	itemsLimit: 10,
// 	callback: function(currentPage){
// 		console.log(currentPage);
// 	}
// });