/*
 * @Author: ZhangZheyi
 * @Date:   2016-07-21 15:19:24
 * @Last Modified by:   ZhangZheyi
 * @Last Modified time: 2016-07-22 09:39:10
 * 实用的javascript小技巧 http://www.w3ctrain.com/2016/01/19/jstips/
 */

'use strict';

//一 、数组插入

// 插入数据，第二种效率高很多
var arr = [1, 2, 3, 4, 5];
arr.push(6);
arr[arr.length] = "Alice";

console.log(arr);

//插入到数组前端,使用concat比unshift更高效
// unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
// concat() 方法用于连接两个或多个数组。

var arr2 = [1, 2, 3, 4, 5];
arr2.unshift(0);
console.log(arr2);

console.log([9].concat(arr2)); //unshift修改了原来的数组，而concat返回一个新的数组

var arr3 = [9].concat(arr2);
console.log(arr3);

// 使用splice在数组中间插入是最高效的做法了
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。 arrayObject.splice(index,howmany,item1,.....,itemX)
var items = ['one', 'two', 'three', 'four'];
items.splice(items.length / 2, 0, 'hello');

console.log(items);

//二、优化层叠的条件判断

function printBlackBackground() {
    console.log("I'm black")
}

function printRedBackground() {
    console.log("I'm red")
}

function printColor(color) {
    if (color === 'black') {
        printBlackBackground();
    } else if (color === 'red') {
        printRedBackground();
    } else if (color === 'blue') {
        printBlueBackground();
    } else if (color === 'green') {
        printGreenBackground();
    } else {
        printYellowBackground();
    }
    return 'I\'m choose ' + color
}
printColor("red");
console.log(printColor("black"));

// 尽可能的避免使用switch，那么最高效的做法就是通过一个object了
//例1
var color = "black"
var colorObj = {
    'black': printBlackBackground,
    'red': printRedBackground
};

// hasOwnProperty：是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
// isPrototypeOf:是用来判断要检查其原型链的对象是否存在于指定对象实例中，是则返回true，否则返回false。

if (color && colorObj.hasOwnProperty(color)) {
    console.log("优化层叠的条件判断:");
    colorObj[color]();
}

//例2
function getDrink (type) {
  var drinks = {
    'coke': 'Coke',
    'pepsi': 'Pepsi',
    'lemonade': 'Lemonade',
    'default': 'Default item'
  };
  return 'The drink I chose was ' + (drinks[type] || drinks['default']);
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);

// 三 、使用同一个方法处理数组和单一元素
console.log("使用同一个方法处理数组和单一元素:")

function printUpperCase(words) {
  var elements = [].concat(words);  // 将words 转成数组
  for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].toUpperCase());
  }
}

printUpperCase("cactus");
printUpperCase('cactus'.split(''));
printUpperCase(["cactus", "bear", "potato"]);

//四、检查属性是否在对象上
// 任何继承自Object的对象都有in,hasOwnProperty两个方法

var myObject ={
    name: 'Echozhang',
    getName:function(){
        console.log(this)
        console.log(this.name)
        return this.name;  
    }
}
// myObject.prototype.valueof = function () {
//    alert(555)
// }

console.log(myObject.hasOwnProperty("name"));
console.log('name' in myObject);

console.log(myObject.hasOwnProperty("valueof"));
console.log('valueof' in myObject);

console.log('测试this:' + myObject.getName())

function A(){}
A.prototype.test = 'abc'
function A(){
this.name = 'efg'
}
var a = new A
console.log('name' in a)  //true
console.log('test' in a)  //true
console.log('hello' in a)  //false
console.log(a.hasOwnProperty("name"))  // true
console.log(a.hasOwnProperty("test"))  //false   because test is from the prototype chain
//总结
//只有属性是直接在对象上，hasOwnProperty 才会返回true,而 in 则是不三七二十一，把对象及其原型链都查找了一遍。





