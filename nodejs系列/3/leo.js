exports.sun = function(){
    var re = 0;
    for(var i = 0;i<arguments.length;i++){
        re+=arguments[i];
    }
    return re;
};