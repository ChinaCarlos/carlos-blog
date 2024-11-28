---
title: JavaScript 面试基础知识(下篇)
tags: front interview
theme: solarized-dark
---

# JavaScript 面试基础知识(下篇)

::: tip Tips:
包含基础的`Javascript`面试手写代码以及一些场景题，不包含`算法`手写代码，算法要单独出一章
:::

## 1. 实现一个`instanceOf`

首先要了解 `instanceof` 实现的功能，`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。其实考察的也是继承。

```javascript
function instanceOf(left, right) {
  let proto = left.__proto__;
  const prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (prototype === proto) return true;
    proto = proto.__proto__;
  }
}

const arr = [];

console.log(instanceOf(arr, Array)); // true
```

::: tip 如何检测 JS 的数据类型

```javascript
Object.prototype.toString.call([]).slice(8, -1).toLocaleLowerCase(); //[Object Array] ---> array
```

:::

## 2. 实现一个`deepClone` 深拷贝

在 JS 中可以使用`JSON.stringify()`和`JSON.parse()` 来实现深拷贝，但是会有问题，`Object.assign`,使用拓展运算符实现的复制`{...obj}` ，`Array.prototype.slice(), Array.prototype.concat()`属于常见的浅拷贝

- `undefined`,`function`,`Symbol` 会被忽略
- 日期类型`Date` 会以时间字符串形式被转换（注意：不是时间戳）如：`2024-11-10T15:54:57.918Z`
- 正则`RegExp`,`Set`,`Map` 会变成一个空对象
- 无法解决`对象循环引用`的问题(会报错)

实现一个深拷贝，要考虑上面的情况：

> 不考虑`Map`,`Set`,`Symbol` 面试的时候考虑时间问题，而且 API 也记不住

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 判断是否为null ,不能用typeof
  if (obj === null) return obj;
  // 循环对象引用
  if (hash.has(obj)) return hash.get(obj);
  // 日期处理
  if (obj instanceof Date) return new Date(obj);
  // 正则处理
  if (obj instanceof RegExp) return new RegExp(obj);
  // 函数处理
  if (typeof obj !== "object") return obj;
  // 对象深拷贝，包括数组
  let cloneObj = new obj.constructor();

  // 添加到hash 里面，判断后面是否有循环引用用
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return coneObj;
}

// 测试

let obj = {
  info: {
    name: "hello",
    date: new Date("2011-12-2"),
    f: () => {},
    r: /xxx/gi,
  },
};

const obj1 = deepClone(obj);

obj1.info.name = "xxxx";
delete obj1.info.r;

console.log(obj1, obj);
/**
 * {
  info: { name: 'xxxx', date: 2011-12-01T16:00:00.000Z, f: [Function: f] }
} {
  info: {
    name: 'hello',
    date: 2011-12-01T16:00:00.000Z,
    f: [Function: f],
    r: /xxx/gi
  }
}

 */
```

::: danger 总结：
在实践当中，通常使用`lodash-es` 中的`cloneDeep` 方法, 不推荐`lodash`，不好做按需引入
:::

## 3. 实现一个`new` 操作符

`new`的过程发生了什么？

1. 创建一个空的简单 `JavaScript` 对象（即`{}`）；
2. 链接该对象（即设置该对象的`构造函数`）到另一个对象 ；
3. 将步骤 `1` 新创建的对象作为 `this` 的上下文 ；
   如果该函数没有返回对象，则返回 `this`

```javascript
function _new(constructor, ...args) {
  // 创建一个空对象，继承构造函数的 prototype 属性
  let context = Object.create(constructor.prototype);
  // 执行构造函数
  let result = constructor.apply(context, args);

  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return typeof result === "object" && typeof result !== null
    ? result
    : context;
}
```

## 4. 实现一个`Object.create`

`Object.create()` 是创建一个新对象并将其原型设置为指定对象的方法

```javascript
function create(obj) {
  // 参数必须是一个对象或 null
  if (typeof obj !== "object" && typeof obj !== "function") {
    throw TypeError("Object prototype may only be an Object or null.");
  }
  // 创建一个空的构造函数
  function F() {}

  // 将构造函数的原型指向传入的对象
  F.prototype = obj;

  // 返回一个新的实例对象，该对象的原型为传入的对象
  return new F();
}
```

首先检查参数是否是一个对象或 null，因为只有这两种情况才能作为对象的原型。然后它创建一个空函数 F，并将其原型设置为传入的参数对象，最后返回用 F 创建的新对象，它的原型是传入的参数对象。

## 5. 实现一个`throttle` 节流函数

使用场景： 节流的原理是在规定的时间间隔内，无论事件触发了多少次，都只执行一次函数。也就是说，它会确保函数以一定的频率执行，而不是无限制地响应事件触发。节流常用于需要频繁但有规律地执行某些操作的场景，如滚动监听、鼠标移动等。

```javascript
function throttle(fn, time, invoke = false) {
  let timerId = null;
  let immediateInvoke = invoke;
  return function () {
    if (invoke && !timerId) {
      fn.apply(this, arguments);
      immediateInvoke = false;
    }
    if (!timerId && !immediateInvoke) {
      timerId = setTimeout(() => {
        fn.apply(this, arguments);
        timerId = null;
      }, time);
    }
  };
}
```

## 6. 实现一个`debounce` 防抖函数

使用场景： 防抖的原理是在事件被触发后，在指定的时间内如果事件没有再次被触发，则执行一次函数；如果在这段时间内事件再次被触发，则重新计时。简单来说，就是将多次触发的事件合并为一次执行，常用于需要等待用户操作完全停止后再进行处理的场景，如输入框搜索、窗口大小调整等

```javascript
function debounce(fn, delay, invoke = false) {
  let timerId = null;
  return function () {
    if (invoke && !timerId) {
      fn.apply(this, arguments);
    }
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, arguments);
      timerId = null;
    }, delay);
  };
}
```

## 7. 实现一个`call`

```javascript
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  context.__fn = this;
  let result = context.__fn(...args);
  delete context.__fn;
  return result;
};
```

## 8. 实现一个`apply`

```javascript
Function.prototype.myApply = function (context, args) {
  context = context === undefined || context === null ? window : context;
  context.__fn = this;
  let result = context.__fn(...args);
  delete context.__fn;
  return result;
};
```

## 9. 实现一个`bind`

```javascript
Function.prototype.myBind = function (context, ...args1) {
  context = context === undefined || context === null ? window : context;
  let _this = this;
  return function (...args2) {
    context.__fn = _this;
    let result = context.__fn(...[...args1, ...args2]);
    delete context.__fn;
    return result;
  };
};
```

另外一种写法：

```javascript
Function.prototype.myBind = function (context, ...args) {
  context = context === undefined || context === null ? globalThis : window;
  const _this = this;
  return function bondFunction(...args1) {
    if (this instanceof bondFunction) {
      return new _this(...args, ...args1);
    } else {
      return _this.apply(context, [...args, ...args1]);
    }
  };
};
```

## 10. 实现`flatten`数组扁平化

有很多中方法：

```javascript
const arr = [1, 2, 4, [4, 5, [44, 5], [4, 2, [5, 3]]]];

function flatten(arr) {
  // return  arr.toLocaleString().split(',').map(item=>Number(item))

  //return arr.flat()

  // 通过for或者while循环

  // 递归 && includes 方法

  return arr.reduce((result, value, index) => {
    return Array.isArray(value)
      ? [...result, ...flatten(value)]
      : [...result, value];
  }, []);
}
```

## 11. 实现`树转数组`

```javascript
const tree = {
  name: "root",
  children: [
    {
      name: "name1",
      children: [
        {
          name: "name1-name1",
        },
      ],
    },
    {
      name: "name3",
    },
    {
      name: "name2",
      children: [
        {
          name: "name2-name2",
        },
      ],
    },
  ],
};

function treeToArray(tree, result = []) {
  result.push(tree);
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      treeToArray(tree.children[i], result);
    }
  }
  return result;
}

console.log(treeToArray(tree));
```

## 12. 实现`数组转树`

```javascript
const data = [
  { id: 1, parentId: null, name: "Root" },
  { id: 2, parentId: 1, name: "Child 1" },
  { id: 3, parentId: 1, name: "Child 2" },
  { id: 4, parentId: 2, name: "Child 1.1" },
  { id: 5, parentId: 2, name: "Child 1.2" },
];

function arrToTree(arr, parentId = null) {
  return arr
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      return {
        ...item,
        children: arrToTree(arr, item.id),
      };
    });
}

console.log(arrToTree(data));
```

## 13. 实现数组去重

```javascript
const arr = [1, 9, 8, 8, 7, 2, 5, 3, 3, 3, 2, 3, 1, 4, 5, 444, 55, 22];
function uniqueArray(arr) {
  // return Array.from(new Set(arr));
  return arr.reduce((result, value, index) => {
    // includes 可以被indexOf,find 等替换
    return result.includes(value) ? result : [...result, value];
  }, []);
}

console.log(uniqueArray(arr));

/**
 * [
   1, 9, 8,   7,  2,
   5, 3, 4, 444, 55,
  22
]
 */
```

## 14. 实现一个`数字千分位分割`

```javascript
// 正则实现

function formatNumberWithRegex(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 利用自带的方法

function formatNumberLocale(num) {
  return num.toLocaleString();
}

// 其他实现
function formatNumber(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw Error("type error");
  }
  let [numStr, decimal] = num.toString().split(".");

  let arr = [];
  if (numStr.length <= 3) {
    return num;
  }
  let lastSplitIndex = 0;

  for (let i = 0; i < numStr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      arr.push(numStr.slice(i - 3, i));
      lastSplitIndex = i;
    }
  }

  let lastNum = numStr.slice(lastSplitIndex, numStr.length);

  return (
    arr.join(",") +
    (lastNum ? `,${lastNum}` : "") +
    (decimal ? `.${decimal}` : "")
  );
}

console.log(formatNumber(23232323.23));
console.log(formatNumber(23232323.2));
console.log(formatNumber(23232323));
console.log(formatNumber(23));

/**
 * 232,323,23.23
232,323,23.2
232,323,23
23
 */
```

## 15. 实现一个`下划线转驼峰`

```javascript
/**
 * 将下划线命名转换为驼峰命名
 * @param {string} str - 下划线命名的字符串
 * @returns {string} - 转换后的驼峰命名字符串
 */
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// 示例用法
console.log(toCamelCase("hello_world")); // 输出: "helloWorld"
console.log(toCamelCase("convert_to_camel_case")); // 输出: "convertToCamelCase"
```

## 16. 怎么判断一个对象是否为空对象

```javascript
function isEmpty1(obj) {
  return Object.keys(obj).length === 0;
}

function isEmpty2(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // 发现属性，返回 false
    }
  }
  return true; // 没有属性，返回 true
}

function isEmpty3(obj) {
  return JSON.stringify(obj) === "{}";
}
```

> 也可以使用`Object.getOwnPropertyNames()`

## 17. 实现一个`二分查找`

二分查找（Binary Search）是一种高效的查找算法，适用于已排序的数组。它通过不断将搜索范围折半，来逐渐缩小查找范围，从而减少比较次数，时间复杂度为 O(log n)。

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 计算中间索引

    if (arr[mid] === target) {
      return mid; // 找到目标值，返回索引
    }
    if (arr[mid] < target) {
      left = mid + 1; // 目标值在右半部分
    } else {
      right = mid - 1; // 目标值在左半部分
    }
  }

  return -1; // 如果没有找到目标值，返回 -1
}

// 示例用法
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17];
const target = 7;
const result = binarySearch(arr, target);
console.log(result); // 输出: 3 (目标 7 在数组中的索引是 3)
```

## 18. 实现一个`JSONP`

JSONP（JSON with Padding）是一种跨域请求数据的技术。由于浏览器的同源策略限制了跨域请求，JSONP 可以通过 `<script>` 标签的跨域能力来绕过这一限制。其核心思想是动态创建一个 `<script>` 标签，将请求的 URL 设置为目标服务器提供的 JSONP API，并指定一个回调函数来处理返回的数据。

```javascript
function jsonp(url, callback) {
  // 创建一个随机的回调函数名称
  const callbackName = "jsonp_callback";

  // 在全局作用域下创建一个回调函数
  window[callbackName] = function (data) {
    // 调用传入的回调函数
    callback(data);
    // 请求完成后，清理回调函数
    delete window[callbackName];
    document.body.removeChild(script); // 移除 script 标签
  };

  // 创建 script 标签并设置 src
  const script = document.createElement("script");
  script.src = `${url}?callback=${callbackName}`;
  document.body.appendChild(script); // 将 script 标签添加到页面中
}
```

## 19. 实现一个 Ajax 请求数据

```javascript
function ajaxGet(url, callback) {
  const xhr = new XMLHttpRequest(); // 创建 XMLHttpRequest 实例

  // 配置 GET 请求
  xhr.open("GET", url, true);

  // 设置请求完成时的回调函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 请求成功，调用回调函数，并将响应数据传给回调
      callback(null, xhr.responseText);
    } else if (xhr.readyState === 4) {
      // 请求失败
      callback(xhr.status, null);
    }
  };

  // 发送请求
  xhr.send();
}

// 示例使用
ajaxGet("https://jsonplaceholder.typicode.com/posts", function (error, data) {
  if (error) {
    console.log("请求失败，错误代码:", error);
  } else {
    console.log("请求成功，响应数据:", JSON.parse(data));
  }
});
```

## 20. 实现一个函数`currying`

```javascript
// 函数柯里化
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 不同的调用方式
console.log(curriedSum(1)(2)(3)); // 输出: 6
console.log(curriedSum(1, 2)(3)); // 输出: 6
console.log(curriedSum(1)(2, 3)); // 输出: 6
console.log(curriedSum(1, 2, 3)); // 输出: 6
```

## 21. 实现一个`add(1)(2)(3)`

利用 `20` 的函数`柯里化`实现

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 不同的调用方式
console.log(curriedSum(1)(2)(3)); // 输出: 6
console.log(curriedSum(1, 2)(3)); // 输出: 6
console.log(curriedSum(1)(2, 3)); // 输出: 6
console.log(curriedSum(1, 2, 3)); // 输出: 6
```

## 22. 实现一个快排 `quickSort`

```javascript
const arr = [4, 6, 2, 6, 2, 1, 7, 4, 8, 9];

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [];
  let right = [];
  let value = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= value) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), value, ...quickSort(right)];
}

console.log(quickSort(arr)); //输出 [1, 2, 2, 4, 4,6, 6, 7, 8, 9]
```

## 23. 实现数组的原生方法`Map`, `Filter`,`Reduce`

```javascript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};
console.log([1, 2, 3].myMap((item) => item * 2)); //[ 2, 4, 6 ]

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) && this.hasOwnProperty(i)) {
      result.push(this[i]);
    }
  }
  return result;
};
console.log([1, 2, 3].myFilter((item) => item === 2)); //[2]

Array.prototype.myReduce = function (callback, initValue) {
  let acc = initValue !== undefined ? initValue : this[0];
  let startIndex = initValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    if (this.hasOwnProperty(i)) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};

console.log([1, 2, 3].myReduce((result, item) => result + item, 0)); // 6
```

## 24. 斐波那契数列

_原始版本：_

```javascript
function finbo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return finbo(n - 1) + finbo(n - 2);
}
console.log(finbo(10)); //55
```

_优化版本 1：_

使用数组存储每次的计算值

```javascript
function finbo1(n) {
  let result = [0, 1];
  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
}

console.log(finbo1(10));
```

_优化版本 2：_

动态规划（自底向上）此时时间复杂度为`O(n)`

```javascript
function finbo2(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1,
    sum = 0;
  for (let i = 2; i <= n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return sum;
}
console.log(finbo2(10));
```

## 25. 实现一个解析`URL`参数

1. 使用自带的`URL`参数

```javascript
const urlInfo = new URL("url address");
```

2. 使用`URLSearchParams`

```javascript
function parseURLParams(url) {
  const params = {};
  const queryString = url.split("?")[1];
  if (!queryString) return params;

  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    if (params[key]) {
      // 如果已经存在该键，则将值转为数组
      params[key] = Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value];
    } else {
      params[key] = value;
    }
  });

  return params;
}

// 示例使用
const url = "https://example.com?page=1&sort=asc&id=1&id=2";
console.log(parseURLParams(url));
// 输出: { page: "1", sort: "asc", id: ["1", "2"] }
```

3. 使用正则

```javascript
function parseURLParams(url) {
  const params = {};
  const queryString = url.split("?")[1];
  if (!queryString) return params;

  const searchParams = new URLSearchParams(queryString);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

// 示例使用
const url = "https://example.com?page=1&sort=asc&search=hello";
console.log(parseURLParams(url));
// 输出: { page: "1", sort: "asc", search: "hello" }
```

## 26. 实现`数组乱序`

```javascript
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 示例使用
const arr = [1, 2, 3, 4, 5];
console.log(shuffleArray(arr)); // 输出: 一个乱序的数组，例如 [3, 1, 5, 4, 2]
```

## 27. 实现一个深度比较 `isEqual`

```javascript
const obj1 = { name: "obj1", info: { gender: "man", age: 23 } };
const obj2 = { name: "obj1", info: { gender: "man", age: 233 } };

function isEqual(obj1, obj2) {
  const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
  };
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  // 判断属性长度
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  // 如果是对象
  if (obj1 === obj2) {
    return true;
  }

  // 递归比较key
  const keys = Object.keys(obj1);
  for (let i = 0; i < keys.length; i++) {
    const res = isEqual(obj1[keys[i]], obj2[keys[i]]);
    if (!res) {
      return false;
    }
  }
  return true;
}

console.log(isEqual(obj1, obj2));
```

## 28. 实现一个`单例模式`

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance; // 返回已有的实例
    }
    Singleton.instance = this; // 存储唯一实例
    this.name = "I am the instance";
    Object.freeze(this); // 冻结实例，防止修改
  }
}

// 示例使用
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // 输出: true
```

## 29. 实现一个`观察者模式`

```javascript
class Subject {
  constructor() {
    this.observers = []; // 存储所有观察者
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // 通知所有观察者
  notify(message) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  // 观察者更新方法
  update(message) {
    console.log(`${this.name} received message: ${message}`);
  }
}

// 示例使用
const subject = new Subject();

const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");
const observer3 = new Observer("Observer 3");

// 添加观察者
subject.addObserver(observer1);
subject.addObserver(observer2);

// 发送消息
subject.notify("Hello Observers!");

// 移除观察者
subject.removeObserver(observer1);

// 再次发送消息，只有 Observer 2 会收到
subject.notify("Another message");
```

## 30. 实现一个`发布订阅者模式`

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback];
    } else {
      this.events[type].push(callback);
    }
  }
  once(type, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(type, fn);
    };
    this.on(type, fn);
  }
  emit(type, ...args) {
    if (!!this.events[type]) {
      this.events[type].forEach((cb) => cb(...args));
    } else {
      return;
    }
  }
  off(type, callback) {
    if (!!this.events[type]) {
      this.events[type] = this.events[type].filter((item) => item !== callback);
    } else {
      return;
    }
  }
}

// Example Usage
const emitter = new EventEmitter();

// Event listener for 'event1'
const callback1 = (message) => {
  console.log("event1 received:", message);
};

// Registering a listener for 'event1'
emitter.on("event1", callback1);

// Emit 'event1' with arguments
emitter.emit("event1", "Hello, World!");

// Remove listener
emitter.off("event1", callback1);
emitter.emit("event1", "This will not be logged"); // No output as callback1 was removed

// Once listener
emitter.once("event2", (msg) => {
  console.log("Once listener triggered:", msg);
});

emitter.emit("event2", "First time"); // This will be logged
emitter.emit("event2", "Second time"); // No output, as the listener is removed after first call
```

## 31. 实现一个`工厂模式`

```javascript
// 1. 产品类：定义工厂需要生产的对象
class Car {
  drive() {
    console.log("Driving a car");
  }
}

class Bike {
  drive() {
    console.log("Riding a bike");
  }
}

// 2. 工厂类：根据需求创建不同的对象
class VehicleFactory {
  static createVehicle(type) {
    if (type === "car") {
      return new Car();
    } else if (type === "bike") {
      return new Bike();
    } else {
      throw new Error("Unknown vehicle type");
    }
  }
}

// 3. 使用工厂模式创建对象
const vehicle1 = VehicleFactory.createVehicle("car");
vehicle1.drive(); // Output: Driving a car

const vehicle2 = VehicleFactory.createVehicle("bike");
vehicle2.drive(); // Output: Riding a bike
```

## 32. 实现一个判断`对象循环引用`的公共方法

1. `JSON.stringify`报错信息中有循环引用的报错
2. 利用`Set`或者`WeakSet` 遍历对象，把每次访问的对象属性存起来，然后去查找是否访问过

```javascript
function hasCircularReference(obj, visitors = new WeakSet()) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  if (visitors.has(obj)) {
    return true;
  }

  visitors.add(obj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (hasCircularReference(obj[key], visitors)) {
        return true;
      }
    }
  }

  return false;
}

// 测试代码
const a = {};
const b = { a: a };
a.b = b; // 形成循环引用

console.log(hasCircularReference(a)); // true

const c = { name: "John" };
const d = { name: "Doe" };

console.log(hasCircularReference(c)); // false
```

## 33. 实现一个`LRU算法`实现

在前端单页应用中，我们常遇到动态组件切换的场景。如果每次切换都卸载组件并重新加载，势必会消耗资源、降低性能，尤其是在涉及复杂组件时。`Vue` 的 `keep-alive` 功能提供了一种解决方案——在组件切换时对部分组件进行缓存，下次访问时直接从缓存中恢复，而非重新渲染。这里就用到` LRU 算法`.

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 缓存的最大容量
    this.cache = new Map(); // 使用 Map 存储缓存数据
  }

  // 获取缓存数据
  get(key) {
    if (!this.cache.has(key)) {
      return -1; // 如果缓存中没有该数据，则返回 -1
    }
    // 如果数据存在，先删除再重新插入（表示该数据被访问过，更新为最近使用）
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  // 设置缓存数据
  put(key, value) {
    // 如果缓存已满，删除最旧的数据
    if (this.cache.size >= this.capacity) {
      // Map 的 keys() 返回插入顺序，删除第一个元素
      this.cache.delete(this.cache.keys().next().value);
    }
    // 如果已经存在这个 key，删除旧值并插入新值
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 插入新数据到缓存
    this.cache.set(key, value);
  }
}

// 测试代码
const lru = new LRUCache(2);
lru.put(1, 1); // 缓存 {1=1}
lru.put(2, 2); // 缓存 {1=1, 2=2}
console.log(lru.get(1)); // 返回 1，缓存 {2=2, 1=1}
lru.put(3, 3); // 缓存已满，删除最久未使用的 2，缓存 {1=1, 3=3}
console.log(lru.get(1)); // 返回 -1 (未找到)
lru.put(4, 4); // 缓存 {3=3, 4=4}
console.log(lru.get(2)); // 返回 -1 (未找到)
console.log(lru.get(3)); // 返回 3
console.log(lru.get(4)); // 返回 4
```

## 34. 实现一个链式调用`add(5).add(3).minus(2)`功能

实现链式调用的核心就是每个调用的方法中要返回`this`

```javascript
class Calculator {
  constructor() {
    this.result = 0; // 初始化结果为 0
  }

  // add 方法：将值加到当前结果上
  add(value) {
    this.result += value;
    return this; // 返回当前对象，支持链式调用
  }

  // minus 方法：从当前结果中减去值
  minus(value) {
    this.result -= value;
    return this; // 返回当前对象，支持链式调用
  }

  // 获取当前的结果
  getResult() {
    return this.result;
  }
}

// 使用链式调用
const calc = new Calculator();
const result = calc.add(5).add(3).minus(2).getResult();
console.log(result); // 输出 6，计算过程是 (0 + 5 + 3 - 2)
```

## 35. 实现一个`随机字符串`

```javascript
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 可选字符集
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // 随机选取一个字符
    result += characters[randomIndex]; // 添加到结果字符串中
  }

  return result;
}

// 测试：生成一个长度为 10 的随机字符串
const randomString = generateRandomString(10);
console.log(randomString); // 输出例如 "A9d4F3g8R1"
```

## 36. 实现一个对象扁平化`flatObj`

```javascript
function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key; // 拼接新的键
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], newKey, result); // 递归处理嵌套对象
      } else {
        result[newKey] = obj[key]; // 将值赋给结果对象
      }
    }
  }
  return result;
}

// 示例对象
const obj = {
  a: 1,
  b: {
    b1: 2,
    b2: {
      b21: 3,
      b22: 4,
    },
  },
  c: 5,
};

const flatObj = flattenObject(obj);
console.log(flatObj); // { a: 1, 'b.b1': 2, 'b.b2.b21': 3, 'b.b2.b22': 4, c: 5 }
```

## 37. 实现一个树的查找

首先构建一个树结构

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log("tree:", root);
```

### 1. 深度优先`(DFS)`

深度优先搜索（DFS）是一种树或图的遍历算法。DFS 会尽可能深入树的分支，直到达到树的叶节点后再回溯并继续其他分支的搜索。

```javascript
// 深度优先搜索（DFS）查找方法
function depthFirstSearch(root, target) {
  if (root === null) {
    return null; // 没有找到目标
  }

  if (root.value === target) {
    return root; // 找到目标，返回节点
  }

  // 在左子树中查找
  let leftSearch = depthFirstSearch(root.left, target);
  if (leftSearch) {
    return leftSearch;
  }

  // 在右子树中查找
  return depthFirstSearch(root.right, target);
}
console.log(DFSSearch(root, 3));
```

### 2. 广度优先`(BFS)`

广度优先搜索的特点是从根节点开始，首先访问当前节点的所有子节点，然后依次访问每个子节点的子节点，直到找到目标。

```javascript
// 广度优先搜索（BFS）查找方法
function breadthFirstSearch(root, target) {
  if (root === null) {
    return null; // 如果根节点为空，直接返回 null
  }

  const queue = [root]; // 使用队列来记录需要访问的节点

  while (queue.length > 0) {
    let node = queue.shift(); // 取出队列中的第一个节点

    if (node.value === target) {
      return node; // 找到目标节点
    }

    if (node.left) queue.push(node.left); // 将左子节点加入队列
    if (node.right) queue.push(node.right); // 将右子节点加入队列
  }

  return null; // 如果遍历完成没有找到目标节点，返回 null
}
```

## 38. 实现一个图片懒加载（Image LazyLoad）

_懒加载原理_： 图片进入可视区域之后再去请求图片资源。

1.使用 img 标签，scr 属性初始为空

2.写一个自定义属性字段，该属性的值写成图片地址

3.当图片在可视区域的范围内的时候，将自定义属性的值作为 src 的值

> 检测元素是否可在可见区域可以用`Intersection Observer API`：这是一个现代的 API，可以异步观察目标元素与其祖先元素或顶级文档视口的交叉状态。它提供了更加简洁和高效的方式来监听元素是否进入可视区域。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .box {
      width: 400px;
      margin: 0 auto;
    }

    .box img {
      display: block;
      width: 100%;
      height: 200px;
    }
  </style>

  <body>
    <div class="box">
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show1.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show2.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show3.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show1.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show2.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show3.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show1.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show2.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show3.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show1.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show2.jpg"
      />
      <img
        src="./imgs/loading.jpg"
        alt=""
        class="lazyload-img"
        data-src="./imgs/show3.jpg"
      />
    </div>
    <script>
      // 获取根元素节点
      let viewport = document.documentElement;
      // 把DOM节点数组转为真正的数组,即伪数组转数组
      // let imgArr = [].slice.call(document.querySelectorAll('.lazyload-img'));
      let imgArr = Array.from(document.querySelectorAll(".lazyload-img"));
      // 该函数用来判断某一个元素是否在可视区域
      function isVisible(element) {
        // 获取当前元素节点的大小、位置等信息
        let rect = element.getBoundingClientRect();
        // 用户不管是从上向下、从下向上、从左向右、从右向左滑动，都可以判断当前元素是否在可视区域
        return (
          rect.top < viewport.clientHeight &&
          rect.bottom > 0 &&
          rect.left < viewport.clientWidth &&
          rect.right > 0
        );
      }
      //防抖处理
      let timer = null;
      // 该函数动态设置图片的src属性，动态加载图片
      function lazyloadImg() {
        for (let i = 0; i < imgArr.length; i++) {
          let img = imgArr[i];
          // 如果元素在可视区域内
          if (isVisible(img)) {
            // 则把data-src属性赋值给data-src
            img.src = img.getAttribute("data-src");
            // 当前元素从未加载数组中移除
            imgArr.splice(i, 1);
            // 后一下标前移至当前下标，自减再循环
            i--;
          }
        }
        // 可视区域内加载完成后,防抖限制解除
        timer = null;
      }
      // 一开始先执行一次，把当前时间在可视区域的图片加载出来
      lazyloadImg();

      // 监听页面滚动
      document.addEventListener("scroll", function () {
        // 如果已触发滚动期间再触发
        console.log(timer);
        if (timer) {
          // 则清除现有执行
          return clearTimeout(timer);
        }
        // 重新赋值
        timer = setTimeout(() => {
          // 页面滚动的时候，不断有新的图片进入可视区域，此时再调用lazyloadImg函数
          lazyloadImg();
        }, 100);
      });
    </script>
  </body>
</html>
```

## 39. 实现一个`Promise A+`

> 参考： [实现一个 Promise A+](https://juejin.cn/post/7426319570813075475?searchId=20241111235703086F93225292A8E624B9)

> 如果是在面试中，可以写一个简单版本的，要么就放弃，反正工作中也不会让你写 `Promise A+`

> ![Promise](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/promise.png)

```javascript
// 简单版本：
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "reject";

class SimplePromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulFilledCallbacks.forEach((cb) => cb(value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled =
      typeof onFulFilled === "function" ? onFulFilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    if (this.status === FULFILLED) {
      this.onFulFilledCallbacks.push(onFulFilled);
    }
    if (this.status === REJECTED) {
      this.onRejectedCallbacks.push(onRejected);
    }
    if (this.status === PENDING) {
      this.onFulFilledCallbacks.push(onFulFilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }
}

const promise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 4000);
});

promise.then(
  (value) => {
    console.log(value); // 输出: "Promise resolved!"
  },
  (error) => {
    console.log(error);
  }
);
```

:::details 完全体的`Promise A+` 源码：

```javascript
// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = (err) => {
      throw err;
    };
    onRejected = onRejected || defaultOnRejected;

    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    return new MyPromise((resolve, reject) => {
      // 1.如果在then调用的时候, 状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      // 2.将成功回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          });
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    // 问题关键: 什么时候要执行resolve, 什么时候要执行reject
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const results = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (results.length === promises.length) {
              resolve(results);
            }
          },
          (err) => {
            results.push({ status: PROMISE_STATUS_REJECTED, value: err });
            if (results.length === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  static any(promises) {
    // resolve必须等到有一个成功的结果
    // reject所有的都失败才执行reject
    const reasons = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err);
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons));
          }
        });
      });
    });
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1111);
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2222);
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3333);
  }, 3000);
});

// MyPromise.race([p1, p2, p3]).then(res => {
//   console.log("res:", res)
// }).catch(err => {
//   console.log("err:", err)
// })

MyPromise.any([p1, p2, p3])
  .then((res) => {
    console.log("res:", res);
  })
  .catch((err) => {
    console.log("err:", err.errors);
  });

//module.exports = MyPromise 导出模块用于后续测试
```

:::

## 40. 实现一个`Promise.all`

```javascript
const one = new Promise((resolve) => {
  setTimeout(() => {
    console.log("one");
    resolve();
  }, 1000);
});
const two = new Promise((resolve) => {
  setTimeout(() => {
    console.log("two");
    resolve();
  }, 2000);
});
const three = new Promise((resolve) => {
  setTimeout(() => {
    console.log("three");
    resolve();
  }, 3000);
});

Promise.myAll = function (promises) {
  let execPromiseLength = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then(() => {
          execPromiseLength++;
          if (execPromiseLength === promises.length) {
            resolve();
          }
        })
        .catch(() => {
          reject();
        });
    });
  });
};

Promise.myAll([one, two, three]).then(() => {
  console.log("done");
});
// 输出结果：
// one
// two
// three
// done
```

## 41. 实现一个`Promise.race`

```javascript
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  });
};

Promise.myRace([one, two, three]).then(() => {
  console.log("done");
});
// 输出结果：
// one
// done
```

## 42. 实现一个`Promise.finally`

```javascript
Promise.prototype.finally = function (cb) {
  return this.then(
    (data) => {
      // 如何保证Promise.then能够执行完毕
      return Promise.resolve(cb()).then((n) => data);
    },
    (err) => {
      // Promise.resolve 目的是等待cb()后的Promise执行完成
      return Promise.resolve(cb()).then((n) => {
        throw err;
      });
    }
  );
};
```

## 43. 实现一个`Promise.resolve`

```javascript
Promise.resolve = function (data) {
    // 1 参数是一个 Promise 实例,不做任何修改、原封不动地返回这个实例
    if (data instanceOf Promise) {
        return data
    }
    // 2 参数是一个thenable对象,将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
    if (data.then) {
        return new Promise((resolve, reject) => {
            data.then(resolve, reject)
        })
    }
    // 3 参数不是具有then方法的对象，或根本就不是对象
    // 4 不带有任何参数
    return new Promise((resolve) => {
        resolve(data)
    })
}

```

## 44. 实现一个`Promise.reject`

```javascript
Promise.reject = function (err) {
  return new Promise((_, reject) => {
    reject(err);
  });
};
```

## 45. 实现一个`Promise.allSettled`

`Promise.allSettled()` 静态方法将一个` Promise` 可迭代对象作为输入，并返回一个单独的` Promise`。当所有输入的` Promise` 都已敲定时（包括传入空的可迭代对象时），返回的` Promise` 将被兑现，并带有描述每个` Promise` 结果的对象数组。

```javascript
Promise.allSettled = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("arguments must be an array"));
    }
    let resolvedCounter = 0;
    const promiseNum = promises.length;
    // 统计所有的promise结果并最后返回
    const resolvedResults = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          resolvedCounter++;
          resolvedResults[i] = value;
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedResults);
          }
        },
        function (reason) {
          resolvedCounter++;
          resolvedResults[i] = reason;
          if (resolvedCounter == promiseNum) {
            return resolve(reason);
          }
        }
      );
    }
  });
};
```

## 46. 实现一个带并发限制的 promise 异步调度器

```javascript
class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.activeCount = 0;
    this.queue = [];
  }

  add(task) {
    // task must be promise
    const runTask = () => {
      return new Promise((resolve, reject) => {
        this.activeCount = this.activeCount + 1;
        task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.activeCount = this.activeCount - 1;
            this.runNextTask();
          });
      });
    };

    if (this.activeCount < this.limit) {
      runTask();
    } else {
      this.queue.push(runTask);
    }
  }

  runNextTask() {
    if (this.queue.length && this.limit > this.activeCount) {
      const nextTask = this.queue.shift();
      nextTask();
    }
  }
}

const scheduler = new Scheduler(2); // 并发限制为 2

const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 模拟任务，打印并返回完成时间
const addTask = (time, name) => {
  scheduler.add(() => timeout(time).then(() => console.log(name)));
};

// 添加任务
addTask(1000, "Task 1"); // 1 秒后输出
addTask(500, "Task 2"); // 0.5 秒后输出
addTask(300, "Task 3"); // 0.3 秒后输出
addTask(400, "Task 4"); // 0.4 秒后输出

// 预期输出顺序：
// Task 2
// Task 3
// Task 1
// Task 4
```

## 47. 实现实现红黄绿循环打印

```javascript
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function trafficLight() {
  while (true) {
    console.log("Red");
    await delay(3000);
    console.log("Green");
    await delay(2000);
    console.log("Yellow");
    await delay(1000);
  }
}

trafficLight();
```

## 48. 实现一个`lazyMan`

题目如下：

```javascript

实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

```

### 实现思路

LazyMan 需要实现一种任务链，能够按顺序或优先级依次执行，支持以下功能：

1. sayHi：立即输出 Hi! This is ${name}!

2. eat：立即输出 Eat ${food}~

3. sleep：延迟一段时间后输出 Wake up after ${seconds}

4. sleepFirst：优先延迟执行，并在等待之后继续执行其他任务

```javascript
class LazyManClass {
  constructor(name) {
    this.tasks = [];
    this.sayHi(name);
    // 开始执行任务队列
    setTimeout(() => {
      this.next();
    }, 0);
  }

  // 向任务队列添加任务
  next() {
    const task = this.tasks.shift();
    if (task) task();
  }

  // Hi 方法立即执行
  sayHi(name) {
    this.tasks.push(() => {
      console.log(`Hi! This is ${name}!`);
      this.next();
    });
    return this;
  }

  // Eat 方法
  eat(food) {
    this.tasks.push(() => {
      console.log(`Eat ${food}~`);
      this.next();
    });
    return this;
  }

  // sleep 方法，延迟一定时间再执行下一个任务
  sleep(seconds) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}`);
        this.next();
      }, seconds * 1000);
    });
    return this;
  }

  // sleepFirst 方法，优先延迟执行的任务，插入队列最前面
  sleepFirst(seconds) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log(`Wake up after ${seconds}`);
        this.next();
      }, seconds * 1000);
    });
    return this;
  }
}

// 外部调用的接口函数
function LazyMan(name) {
  return new LazyManClass(name);
}
```

### 核心实现步骤

1. 任务队列：

   - 使用 tasks 数组来存储所有要执行的任务（每个任务都是一个函数）。
   - 任务队列的处理逻辑允许按顺序执行，同时支持任务优先级。

2. 任务调度：

   - 在 LazyMan 构造函数中，通过 setTimeout 触发 next 方法，从而开始执行任务队列中的任务。
   - next 方法负责取出并执行队列中的任务，每个任务执行完毕后调用 next() 来执行下一个任务。

3. 链式调用：

   - 每个方法都返回 this，允许链式调用并将任务依次加入 tasks 队列。

4. sleep 和 sleepFirst 方法：

   - sleep 将延迟任务添加到队列末尾。
   - sleepFirst 将延迟任务插入到队列最前面，保证优先执行。

## 49. `Proxy` 实现对象属性的拦截

使用 `Proxy` 可以拦截对象的属性访问、修改、删除等操作。通过指定 `get、set` 等捕获器（handlers），可以在属性被访问或设置时执行特定逻辑。

以下是一个使用 Proxy 来拦截对象属性的示例代码：

```javascript
const handler = {
  // 拦截属性读取操作
  get(target, property) {
    if (property in target) {
      console.log(`Getting property "${property}": ${target[property]}`);
      return target[property];
    } else {
      console.log(`Property "${property}" does not exist.`);
      return undefined;
    }
  },

  // 拦截属性写入操作
  set(target, property, value) {
    console.log(`Setting property "${property}" to ${value}`);
    target[property] = value;
    return true; // 返回 true 表示设置成功
  },

  // 拦截属性删除操作
  deleteProperty(target, property) {
    if (property in target) {
      console.log(`Deleting property "${property}"`);
      delete target[property];
      return true;
    } else {
      console.log(`Cannot delete non-existent property "${property}"`);
      return false;
    }
  },
};

// 创建目标对象
const targetObject = {
  name: "Alice",
  age: 30,
};

// 创建代理对象
const proxy = new Proxy(targetObject, handler);

// 测试属性访问
console.log(proxy.name); // 获取属性 "name"
console.log(proxy.age); // 获取属性 "age"
console.log(proxy.address); // 获取不存在的属性 "address"

// 测试属性写入
proxy.name = "Bob"; // 设置属性 "name"
proxy.city = "New York"; // 设置新的属性 "city"

// 测试属性删除
delete proxy.age; // 删除属性 "age"
delete proxy.address; // 尝试删除不存在的属性 "address"
```

## 50. `Reflect` 的使用

`Reflect` 是 JavaScript 提供的一个内置对象，用于简化对象操作，配合 `Proxy` 使用时非常便利。`Reflect` 的方法与对象操作符类似，但提供了更灵活的控制和一致的 API。

以下是 `Reflect` 的几个使用示例：

### 1. 使用 `Reflect.get` 获取对象属性

`Reflect.get` 方法类似于直接获取属性（`object.property`），但可以动态传递属性名，且不会因属性不存在而抛出错误。

```javascript
const obj = { name: "Alice", age: 30 };
console.log(Reflect.get(obj, "name")); // "Alice"
console.log(Reflect.get(obj, "nonExistent")); // undefined
```

### 2. 使用 Reflect.set 设置对象属性

`Reflect.set` 用于设置对象属性，成功返回 `true`，失败返回 `false`，比直接赋值更灵活。可以将它与` Proxy` 一起使用来添加条件。

```javascript
const person = {};
Reflect.set(person, "name", "Bob");
console.log(person.name); // "Bob"
```

#### 与 `Proxy` 结合使用：

```javascript
const handler = {
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      console.log("Age must be a number!");
      return false;
    }
    return Reflect.set(target, property, value);
  },
};

const personProxy = new Proxy({}, handler);
Reflect.set(personProxy, "name", "Alice"); // 设置成功
Reflect.set(personProxy, "age", "30"); // 输出 "Age must be a number!"
```

### 3. 使用 `Reflect.has` 检查属性是否存在

Reflect.has 等同于 in 操作符，用于检查属性是否存在，返回布尔值。

```javascript
const car = { brand: "Toyota" };
console.log(Reflect.has(car, "brand")); // true
console.log(Reflect.has(car, "model")); // false
```

### 4. 使用 `Reflect.deleteProperty` 删除属性

`Reflect.deleteProperty` 等同于 `delete` 操作符，用于删除属性。返回 `true` 表示删除成功，`false` 表示删除失败。

```javascript
const user = { name: "Charlie", age: 25 };
Reflect.deleteProperty(user, "age");
console.log(user); // { name: "Charlie" }
```

### 5. 使用 `Reflect.ownKeys` 获取对象的所有属性键

`Reflect.ownKeys` 用于获取对象的所有属性键，包括 Symbol 类型的键。

```javascript
const data = { id: 1, [Symbol("meta")]: "info" };
console.log(Reflect.ownKeys(data)); // ["id", Symbol(meta)]
```

### 6. 使用 `Reflect.apply` 调用函数

`Reflect.apply` 用于调用函数，可以动态传递` this` 和参数列表，类似于 `Function.prototype.apply`。

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

console.log(Reflect.apply(greet, undefined, ["World"])); // "Hello, World"
```

## 51. 用`setTimeout` 实现一个`setInterval`

```javascript
function newSetInterval(callback, timer) {
  function fn() {
    callback();
    setTimeout(fn, timer);
  }
  setTimeout(fn, timer);
}

newSetInterval(() => {
  console.log(Date.now());
}, 1000);
```
