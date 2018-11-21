// (function(App){
// 	function Tag(options){
// 		this.options = options;
// 		if(!this.options.parent){
// 			console.log('请转入标签父容器');
// 			return;
// 		}
// 		this.list = [];
// 		this.element = createElement('ul', 'm-tag');
// 		this.options.parent.appendChild(this.element);
// 		this.initList();
// 		this.addEvent();

// 		Tag.prototype.initList = function(){
// 			// 最后的添加按扭
// 			// this.addTag = createElement();
// 			// // 输入框
// 			// this.tagInput = createElement();
// 			// //默认提示文本
// 			// this.tagTxt = createElement();
// 			// this.addTag.appendChild(this.tagInput);
// 			// this.addTag.appendChild(this.tagTxt);
// 			// this.element.appendChild(this.addTag);
// 			// // 初始化时传入的标签
// 			// this.add(this.options.tags);

// 		}
// 		Tag.prototype.add = function(tags){
// 			var add = function(tag){
// 				// 判断标签是否已存在
// 				if(this.list.includes(tag))	{
// 					return;
// 				}
// 				var tagEl;
// 				// 按 html 结构组装标签元素
// 				// ....
// 				this.element.insertBefore(tagEl, this.addTag);
// 			};
// 			// tag 参数，支持单个对象，也支持数组
// 			if(tags && !Array.isArray(tags)){
// 				tags = [tags];
// 			}
// 			(tags || []).forEach(add, this);
// 		}
// 		Tag.prototype.remove = function(tag){
// 		for(var i=0;i<this.list.length;i++){
// 			if(this.list[i] === tag){
// 				// 从this.list数组中将该标签移除
// 				// ...
// 				// 删除标签元素
// 				// ...
// 				//退出循环
// 				break;
// 			}
// 		}
// 		}
// 		Tag.prototype.addEvent = function(){
// 			// 关闭按扭及添加tag的点击事件
// 			var clickHandler = function(e){
// 				var target = e.target;
// 				// if(target 是按扭){
// 				// 	//调用删除方法
// 				// }else if(target 是文字){
// 				// 	// 给this.addTag添加focused类
// 				// }
// 			}.bind(this);
// 			this.element.addEventListener('click', clickHandler);

// 			// tag 输入框失焦事件
// 			var inputBlurHandler = function(e){
// 				// 清空输入框的值
// 				// 删除this.addTag上的focused类
// 			}.bind(this);
// 			// tag 输入框回车事件
// 			// var tagInputKeydownHandler = functionc(e){
// 			// 	if(e.keyCode === "47"){
// 			// 		// 取value时去除前后空格
// 			// 		var value = this.tagInput.value.trim();
// 			// 		if(标签不存在){
// 			// 			// 则添加这个标签，并清空输入框的值
// 			// 		}
// 			// 	}
// 			// }.bind(this);
// 			this.tagInput.addEventListner('blur', tagInputBlurHandler);
// 			this.tagInput.addEventListener('keydown', tagInputKeydownHandler);

// 		}
// 		Tag.prototype.getValue = function(){
// 			return this.list;
// 		}
// 	}
// })(window.App);
// new window.App.Tag();

// function progressHandler(e){
// 	//触发一次或多次
// 	if(e.lengthComputable){ // 资源长度是否可以计算
// 		console.log(e.total); // 资源总长度
// 		console.log(e.loaded); // 已经处理的资源长度
// 	}


// }

// // XMLHttpRequest
// var xhr = XMLHttpRequest();
// // 跨域请求
// xhr.withCredentials = true;

// // 进度分下载进度和上传进度
// // 下载进度
// xhr.addEventListener('progress', uploadProgressHandler, false);
// // 上传进度
// xhr.upload.addEventListener('progress', downloadProgressHandler, false);

// // FormData
// var fd = new FormData();

// // value为string或者blob（比如file）
// fd.append(name, value);

// // 如果value为blob则第三个参数为blob的文件名
// // filename默认为blob
// fd.append(name, value, filename);


// // 批量上传
// function changeHandler(e){
// 	var files = e.target.files;
// 	var sizeExceedFiles = [];
// 	var sizeOkFiles = [];
// 	var maxSize = 1024 * 1024;
// 	// 遍历files，如果大于maxSize，放入exceedFiles数组
// 	// 否则放入 sizeOkFiles数组
// 	// 如果execeedFiles中有文件，则进行弹窗提示
// 	this.uploadFiles(sizeOkFiles);
// }
// this.fileInput.addEventListener('change', changeHandler);
// function uploadFiles(files){
// 	var progressBar, progressInfo;
// 	// 计算所有文件的长度
// 	var totalSize;
// 	// 设置progressBar的value(0)和max(totalSize)
// 	var loadedSize = 0, uploadingFileIndex = 1;
// 	// 更改样式，让用户知道正在上传文件
// 	var getLoadedSize = function(){
// 		// 计算已经上传的资源总长度
// 	}
// 	function progressHandler(e){
// 		if(e.lengthComputable){ 
// 			// 更新progressBar的value为getLoadedSize()
// 			// 设置progressInfo，共x个文件，正在上传第y个，上传进度z%...
// 		}
// 	}
// 	var readyStateHandler = function(e){
// 		if(this.readyState === this.DONE){
// 			// 将图片添加到图片列表中
// 			// 更新uploadingFileIndex的值
// 			upload();
// 		}
// 	}
// 	upload();

// }
// var upload = function (){
// 	var file = files[uploadingFileIndex -1];
// 	if(!file){
// 		// 上传完毕，恢复按扭及其他状态，让用户知道上传已经完成
// 		return;
// 	}
// 	var fd = new FormData();
// 	fd.append('file', file, file.name);
// 	var xhr = new XMLHttpRequest();
// 	xhr.withCredentials = true;
// 	xhr.addEventListener('readyState', readyStateHandler, false);
// 	xhr.upload.addEventListener('progress', progressHandler, false);
// 	xhr.open('POST', '/api/works?upload');
// 	xhr.send(fd);
// }

// // Promise批量同步上传
// var uploadRequests = [];
// files.forEach(function(file){
// 	uploadRequests.push(new Promise(function(resolve, reject){
// 		var fd = new FormData();
// 		fd.append('file', file, file.name);
// 		var xhr = new XMLHttpRequest();
// 		xhr.withCredentials = true;
// 		xhr.addEventListener('readyState', function(){
// 			if(this.readyState === this.DONE){
// 				resolve(JSON.parse(this.responseText).result);
// 			}
// 		}, false);
// 		xhr.upload.addEventListener('progress', progressHandler, false);
// 		xhr.open('POST', '/api/works?upload');
// 		xhr.send(fd);
// 	}));
// });
// Promise.all(uploadRequests).then(function(data){
// 	// 上传完毕，恢复按扭状态
// });

// // 拖拽上传
// var drop = document.querySelector('.drop');
// var drop.addEventListener('dragover', function(e){
// 	e.preventDefault();
// 	this.classList.add('over');
// });
// drop.addEventListener('drop', function(e){
// 	e.preventDefault();
// 	this.classList.remove('over');
// 	console.log(e.dataTransfer.files);
// });

// // 表单提交
// var nameInput;
// var postData = {
// 	category,
// 	pictures,
// 	coverId,
// 	name,
// 	description,
// 	tag
// };
// _.ajax({
// 	url:'/api/works',
// 	method:'post',
// 	data:postData,
// 	success: function(data){
// 		// 成功后跳转到作品列表页面
// 	}
// });

App.nav.init();