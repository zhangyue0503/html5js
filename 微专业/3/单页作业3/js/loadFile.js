/*** js和css按需加载 ***/
function loadJsCss(url, callback ){// 非阻塞的加载 后面的js会先执行
    var isJs = /\/.+\.js($|\?)/i.test(url) ? true : false;
    function onloaded(script, callback){//绑定加载完的回调函数
        if(script.readyState){ //ie
            script.attachEvent('onreadystatechange', function(){
                if(script.readyState == 'loaded' || script.readyState == 'complete'){
                    script.className = 'loaded';
                    callback && callback.constructor === Function && callback();
                }
            });
        }else{
            script.addEventListener('load',function(){
                script.className = "loaded";
                callback && callback.constructor === Function && callback();
            }, false); 
        }
    }
    if(!isJs){ //加载css
        var links = document.getElementsByTagName('link');
        for(var i = 0; i < links.length; i++){//是否已加载
            if(links[i].href.indexOf(url)>-1){ 
                return; 
            }
        }
        var link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        var head = document.getElementsByTagName('head')[0]; 
        head.insertBefore(link,head.getElementsByTagName('link')[0] || null );
    }else{ //加载js
        var scripts = document.getElementsByTagName('script');
        for(var i = 0; i < scripts.length; i++){//是否已加载
            if(scripts[i].src.indexOf(url)>-1 && callback && (callback.constructor === Function) ){ 
            //已创建script
                if(scripts[i].className === 'loaded'){//已加载
                    callback();
                }else{//加载中
                    onloaded(scripts[i], callback);
                }
                return; 
            }
        }
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url; 
        document.body.appendChild(script);
        onloaded(script, callback); 
        
    }
}

// 表单验证插件 动态加载
// function loadValidator(callback){// 加载nicevalidator插件
// loadJsCss("/css/nicevalidator.css");
// loadJsCss("/js/nicevalidator.js", callback);
// }

// 组件动态加载
// function loadComponent(callback){// 加载自定义组件
// loadJsCss("/css/component.css");
// loadJsCss("/js/component.js", callback);
// }