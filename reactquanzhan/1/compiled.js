'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var numbers = [1, 2, 3];
var doubleNumbers = numbers.map(function (number) {
  return number * 2;
});
console.log(doubleNumbers);

var mike = { name: 'mike', age: 40 };
mike = _extends({}, mike, { sex: 'male' });
console.log(mike);


