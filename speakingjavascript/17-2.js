/**
 * Created by zhangyue on 2016/12/29.
 */
//原型共享
var PersonProto = {
    describe:function(){
        return 'Person named '+this.name;
    }
};
var jane = Object.create(PersonProto,{
    name:{value:'Jane',writable:true},
    aaa:{value:'1'}
});
var tarzan = Object.create(PersonProto,{
    name:{value:'Tarzan',writable:true}
});

console.log(jane.describe());

console.log(tarzan.describe());

console.log(Object.getPrototypeOf(jane));

console.log(PersonProto.isPrototypeOf(tarzan));

function getDefiningObject(obj,propKey){
    obj = Object(obj);
    while(obj && !{}.hasOwnProperty.call(obj,propKey)){
        obj = Object.getPrototypeOf(obj);
    }
    return obj;
}
console.log(getDefiningObject(jane,'describe'));

//遍历属性
var obj = {first:'John',last:'Doe'};
for(var key in obj){
    if(Object.prototype.hasOwnProperty.call(obj,key)){
        console.log(key);
    }
}

console.log(Object.getOwnPropertyDescriptor(Object.prototype,'toString'));

function Person(name){
    this.name = name;
}
Person.prototype.describe = function(){
    return 'Person named '+this.name;
};
var jane = new Person('Jane');
console.log(jane.describe());

//Crockford私有模式实现的StringBuilder
function StringBuilder(){
    var buffer = [];
    this.add = function(str){
        buffer.push(str);
    };
    this.toString = function(){
        return buffer.join('');
    };
}
var sb = new StringBuilder();
sb.add('Hello');
sb.add(' world!');
console.log(sb.toString());

//使用标记键的属性保存私有数据
function StringBuilder1(){
    this._buffer = [];
}
StringBuilder1.prototype = {
    constructor:StringBuilder1,
    add:function(str){
        this._buffer.push(str);
    },
    toString:function(){
        return this._buffer.join('');
    }
};

var sb = new StringBuilder1();
sb.add('Hello');
sb.add(' world!');
console.log(sb.toString());

//使用具体化键的属性保存私有数据
var StringBuilder2 = function(){
    var KEY_BUFFER = '_StringBuilder_buffer';
    function StringBuilder(){
        this[KEY_BUFFER] = [];
    }
    StringBuilder.prototype = {
        constructor:StringBuilder,
        add:function(str){
            this[KEY_BUFFER].push(str);
        },
        toString:function(){
            return this[KEY_BUFFER].join('');
        }
    };
    return StringBuilder;
}();
var sb = new StringBuilder2();
sb.add('Hello');
sb.add(' world!');
console.log(sb.toString());

//构造函数继承
function subclasses(SubC,SuperC){
    var subProto = Object.create(SuperC.prototype);
    copyOwnPropertiesFrom(subProto,SubC.prototype);
    SubC.prototype = subProto;
    SubC._super = SuperC.prototype;
}
function copyOwnPropertiesFrom(target,source){
    Object.getOwnPropertyNames(source)
        .forEach(function(propKey){
            var desc = Object.getOwnPropertyDescriptor(source,propKey);
            Object.defineProperty(target,propKey,desc);
        });
    return target;
}
function Employee(name,title){
    Employee._super.constructor.call(this,name);
    this.title = title;
}
Employee.prototype.describe = function(){
    return Employee._super.describe.call(this)+"("+this.title+")";
}
subclasses(Employee,Person);
var jane = new Employee('Jane','CTO');
console.log(jane.describe());
console.log(jane instanceof Employee);
console.log(jane instanceof Person);

//泛型方法
function Wine(age){
    this.age = age;
}
Wine.prototype.incAge = function(years){
    this.age += years;
}
var john = {age:51};
Wine.prototype.incAge.call(john,3);
console.log(john.age);

var arr1 = [1,2,3];
[].push.apply(arr1,[4,5,6]);
console.log(arr1);

console.log(Array.prototype.join.call('abc','-'));
