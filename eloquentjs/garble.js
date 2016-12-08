/**
 * Created by zhangyue on 2016/12/7.
 */
module.exports = function(string){
    return string.split("").map(function(ch){
        return String.fromCharCode(ch.charCodeAt(0)+5);
    }).join("");
};
