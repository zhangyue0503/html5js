/**
 * Created by zhangyue on 2016/12/28.
 */
var jane = {
    name:'Jane',
    sayHello:function(otherName){
        'use strict';
        console.log(this.name+' says hello to '+otherName);
    }
};
jane.sayHello('Tarzan');

jane.sayHello.call(jane,'Tarzan');
jane.sayHello.apply(jane,['Tarzan']);
var func1 = jane.sayHello.bind(jane);
func1('Tarzan');
var func2 = jane.sayHello.bind(jane,'Tarzan');
func2