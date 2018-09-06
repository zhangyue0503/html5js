var worker = new Worker("user-privilege.js");
worker.postMessage(user);

//主线程空闲可以做别的事了

worker.addEventListener('message',function(evt){
	var sortedData = evt.data;
});