var urlLib = require('url');
var data = 'https://www.baidu.com/s?wd=%E6%B5%8B%E8%AF%95&rsv_spt=1&rsv_iqid=0xb3d483f000011def&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=6&rsv_sug1=4&rsv_sug7=100&rsv_sug2=0&inputT=1345&rsv_sug4=1793';

console.log(urlLib.parse(data));
