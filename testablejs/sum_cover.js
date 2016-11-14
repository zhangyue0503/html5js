if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["sum.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/Users/zhangyue/MyProject/html5js/testablejs/sum.js",
    code: []
};
_yuitest_coverage["sum.js"].code=["/**"," * Created by zhangyue on 2016/11/14."," */","function sum(a,b){","    return a+b;","}"];
/**
 * Created by zhangyue on 2016/11/14.
 */
_yuitest_coverage["sum.js"].lines = {"4":0,"5":0};
_yuitest_coverage["sum.js"].functions = {"sum:4":0};
_yuitest_coverage["sum.js"].coveredLines = 2;
_yuitest_coverage["sum.js"].coveredFunctions = 1;
_yuitest_coverline("sum.js", 4);
function sum(a,b){
    _yuitest_coverfunc("sum.js", "sum", 4);
_yuitest_coverline("sum.js", 5);
return a+b;
}
