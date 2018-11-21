console.log(wx);

document.getElementById('btn').onclick = function(){
    // 向小程序发布消息
    wx.miniProgram.postMessage({
        data:{
            teacher:'张张张'
        }
    });
    wx.miniProgram.postMessage({
        data:{
            school:'网易云课堂'
        }
    });
}