var _ = {
	extend: function(obj, options) {
		// obj.container = document.getElementById(options.id)
		// obj.container = options.container;
		for (var k in options) {

			obj[k] = options[k];
		}
		// // obj.prototype = options;
		// console.log(options)
		// console.log(obj)
	},
	delClassName: function(node, className) {
		node.classList.remove(className);
	},
	addClassName: function(node, className) {
		node.classList.add(className);
	},
	hasClassName: function(node, className) {
		var div = document.createElement("div"); 
		if ("classList" in div && typeof div.classList.contains === "function") {  
				return node.classList.contains(className);  
		} else {  
			
				var classes = node.className.split(/\s+/);   
				for (var i = 0; i < classes.length; i++) {    
					if (classes[i] === className) {     
						return true;    
					}   
				}   
				return false;  
			
		}
	},
	$: function(id) {
		return document.querySelector('#' + id);
	},
	html2node: function(html) {
		// const template = `<div class='child'>${txt}</div>`;
		  
		let tempNode = document.createElement('div');  
		tempNode.innerHTML = html;
		console.log(tempNode.innerHTML)
		console.log(tempNode.firstChild)
		return tempNode.firstChild;

		// const template = `<div class='child'>${html}</div>`;
		//   let doc = new DOMParser().parseFromString(template, 'text/html');
		//   let div = doc.querySelector('.child');
		//   return div;
	},
	//将对象序列化
	ajaxParmas: function(data) {
		var arr = [];
		for (var i in data) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	},
	ajax: function(obj) {
		//创建xhr对象;
		obj.xhr = new XMLHttpRequest();
		//后面随机数防止浏览器缓存
		// obj.url = obj.url + "?rand=" + Math.random();
		//序列化对象
		obj.data = this.ajaxParmas(obj.data);
		//当是get请求时
		obj.method = obj.method || 'GET';
		obj.async = obj.async || true;
		// if (obj.method = 'get') {
		// 	//当前面没设置随机数时

		// }
		//异步调用
		if (obj.async == true) {
			//监听响应状态
			obj.xhr.onreadystatechange = function() {
				if (obj.xhr.readyState == 4) {
					callback();
				}
			};
		}
		//启动HTTP请求
		obj.xhr.open(obj.method, obj.url, obj.aysnc);
		//当是post请求时
		if (obj.method === 'post') {
			//模仿表单提交
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			//发送HTTP请求-post
			obj.xhr.send(obj.data);
		} else {
			//发送HTTP请求-get
			obj.xhr.send(null);
		}
		//同步调用
		if (obj.async == false) {
			callback();
		}
		//回调函数传参
		function callback() {
			if (obj.xhr.status == 200) {
				obj.success(JSON.parse(obj.xhr.responseText));
			} else {
				alert("失败，失败状态码：" + obj.xhr.status);
			}
		}
	}
};