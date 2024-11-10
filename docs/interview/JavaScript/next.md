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
  const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

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

## 21. 实现一个`add(1)(2)(3)`

## 22. 实现一个快排 `quickSort`

## 23. 实现一个数组的原生方法`Map`, `Filter`,`Reduce`

## 24. 斐波那契数列

## 25. 实现一个解析`URL`参数

## 26. 实现`数组乱序`

## 27. 实现一个深度比较 `isEqual`

## 28. 实现一个`单列模式`

## 29. 实现一个`观察者模式`

## 30. 实现一个`发布订阅`

## 31. 实现一个`工厂模式`

## 32. 实现一个判断`对象循环引用`的公共方法

## 33. 实现一个`LRU算法`实现

## 34. 实现一个链式调用`add(5).add(3).minus(2)`功能

## 35. 实现一个`随机字符串`

## 36. 实现一个对象扁平化`flatObj`

## 37. 实现一个树的查找

## 38. 实现一个图片懒加载（Image LazyLoad）

## 39. 实现一个`Promise A+`

## 40. 实现一个`Promise.all`

## 41. 实现一个`Promise.race`

## 42. 实现一个`Promise.finally`

## 43. 实现一个`Promise.resolve`

## 44. 实现一个`Promise.reject`

## 45. 实现一个`Promise.allSettled`

## 46. 带并发限制的 promise 异步调度器

## 47. 实现实现红黄绿循环打印

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

## 49. `Proxy` 实现对象属性的拦

## 50. `Reflect` 的使用

## 51. 实现一个树的遍历

1. 深度优先

2. 广度优先
