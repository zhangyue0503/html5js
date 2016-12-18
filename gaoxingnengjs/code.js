/**
 * Created by zhangyue on 2016/12/18.
 */
self.onmessage = function(event){
    self.postMessage("Hello, "+event.data+"!");
};

