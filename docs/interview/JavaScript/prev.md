---
title: JavaScript 面试基础知识(上篇)
tags: front interview
theme: solarized-dark
---

# JavaScript 面试基础知识(上篇)

在 JavaScript 中，数据类型分为 **原始类型** 和 **引用类型**。

### 1. 原始类型 (Primitive Types)

| 类型        | 描述                                   | 示例                    |
| ----------- | -------------------------------------- | ----------------------- |
| `undefined` | 表示未定义的值，变量未赋值时的默认值。 | `let x;`                |
| `null`      | 表示空值，通常用于表示空对象引用。     | `let x = null;`         |
| `boolean`   | 布尔类型，表示 `true` 或 `false` 值。  | `let x = true;`         |
| `number`    | 数字类型，表示整数或浮点数。           | `let x = 42;`           |
| `bigint`    | 表示任意精度的大整数。                 | `let x = 123n;`         |
| `string`    | 字符串类型，表示文本数据。             | `let x = "hello";`      |
| `symbol`    | 表示唯一的标识符，通常用于对象属性键。 | `let x = Symbol("id");` |

#### 2. 引用类型 (Reference Types)

| 类型       | 描述                                     | 示例                           |
| ---------- | ---------------------------------------- | ------------------------------ |
| `object`   | 对象类型，可以存储键值对和复杂数据结构。 | `let obj = { name: "Alice" };` |
| `array`    | 数组对象，用于存储有序集合。             | `let arr = [1, 2, 3];`         |
| `function` | 函数对象，表示可调用的代码块。           | `function greet() {}`          |
| `date`     | 日期对象，表示日期和时间。               | `let date = new Date();`       |

#### 3. 特殊数据类型

- **`NaN`**: 表示“不是一个数字”的特殊值，通常出现在无效的数学运算中（如 `0 / 0`）。
- **`Infinity` 和 `-Infinity`**: 表示正无穷大和负无穷大，出现在数值运算超出范围时（如 `1 / 0`）。

#### JavaScript 数据类型总结

JavaScript 数据类型大致可以分为两大类：

- **原始类型**：`undefined`、`null`、`boolean`、`number`、`bigint`、`string`、`symbol`
- **引用类型**：`object`

### 2. 什么是闭包，以及闭包有什么使用场景？

::: warning 各有理解
首先闭包正确的定义是：假如一个函数能访问外部的变量，那么就形成了一个闭包，而不是一定要返回一个函数。
:::
**闭包**是指在 JavaScript 中，一个函数能够访问其定义时所在作用域的变量，即使该函数在其作用域外被调用。闭包的主要使用场景包括：

- **数据封装**：利用闭包，可以创建私有变量，使得外部无法直接修改。
- **函数工厂**：在函数内部生成带有特定行为的函数。
- **状态保持**：可以保持函数内的状态，比如在多次调用时保留变量值。
- **回调与异步操作**：在异步操作中使用闭包可以访问外部作用域中的变量，适用于事件处理、计时等场景。

---

### 3. 什么是执行上下文

**执行上下文（Execution Context）** 是 JavaScript 代码执行的环境，每当 JavaScript 代码运行时都会创建一个执行上下文。执行上下文包含以下类型：

- **全局执行上下文**：在代码最外层的全局环境，只有一个。
- **函数执行上下文**：每次函数调用时都会创建一个新的上下文。
- **Eval 执行上下文**：在 `eval()` 执行时创建（不推荐使用）。

每个执行上下文包含 **变量对象**（存储变量和函数）、**作用域链**、和 **this** 的引用。

---

### 4. 什么是作用域

**作用域**是指程序中定义变量和函数的可访问范围。JavaScript 中的作用域分为：

- **全局作用域**：全局范围内的所有变量和函数，整个脚本可访问。
- **函数作用域**：每个函数创建独立的作用域，局部变量只能在该函数内访问。
- **块级作用域**：通过 `let` 和 `const` 关键字创建的块作用域，仅在 `{}` 中有效。

作用域控制了变量的可见性和生命周期，有助于避免变量命名冲突。

---

### 5. 什么是变量提升

**变量提升（Hoisting）** 是指在 JavaScript 中，变量声明和函数声明会在代码执行前被提升到其作用域的顶部。这意味着可以在声明前使用变量或函数，但未初始化的 `var` 变量会是 `undefined`。

```javascript
console.log(x); // undefined
var x = 10;
```

使用 let 和 const 声明的变量不会被提升到顶部，仍然处于 暂时性死区，未声明前无法使用。

### 6. 隐式类型转换有哪些？

JavaScript 中的 **隐式类型转换** 发生在不同数据类型之间进行运算时，主要包括以下几种情况：

- **字符串拼接**：当数字与字符串相加时，会将数字转换为字符串。
- **布尔值转换**：在条件判断中，非布尔类型会被转换为布尔值（例如，`0`、`null`、`undefined`、`NaN`、`""` 会被转换为 `false`）。
- **数值转换**：在涉及数学运算（如减法、乘法）时，会将字符串或布尔值转换为数字。
- **对象转换**：在对象与原始值比较时，对象会先转换为原始类型（通常是调用 `valueOf` 或 `toString` 方法）。

```javascript
console.log(1 + "2"); // "12"
console.log("5" - 3); // 2
console.log(!!""); // false
```

### 7. 什么是原型链/原型

**原型链** 是 JavaScript 实现继承的机制。每个对象都有一个私有属性 `[[Prototype]]`，通常通过 `__proto__` 访问，指向其构造函数的原型对象。JavaScript 在访问一个对象的属性时，若该对象本身没有该属性，则会沿原型链向上查找，直到找到该属性或到达 `null`（即原型链的顶端）。

```javascript
function Person() {}
const person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

### 8. 如何判断一个变量的类型

判断变量类型的几种方法：

- **`typeof`**：适合判断基本数据类型，但对于 `null` 和对象的区分不明确。
- **`instanceof`**：用于判断对象是否为某个构造函数的实例。
- **`Object.prototype.toString.call()`**：更精确的类型检测方法，返回如 `[object Array]` 这样的类型字符串。

```javascript
console.log(typeof 123); // "number"
console.log([] instanceof Array); // true
console.log(Object.prototype.toString.call([])); // "[object Array]"
// 还有其他方式。。。。
```

### 9. 什么是深拷贝？什么又是浅拷贝？

**浅拷贝** 和 **深拷贝** 都是对象拷贝的方式，但两者在拷贝的方式上有所不同：

#### 1. 浅拷贝

**浅拷贝** 是对对象的第一层属性进行拷贝。如果对象的属性是引用类型（如数组或对象），则拷贝的仍然是引用地址，而非实际的值。修改拷贝后的对象的引用类型属性，原对象的该属性也会受到影响。

常用的浅拷贝方法：

- 使用 `Object.assign()`
- 使用扩展运算符（`...`）

```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);
shallowCopy.b.c = 3;

console.log(obj.b.c); // 3, 原对象也受影响
console.log(shallowCopy.b.c); // 3
```

#### 2. 深拷贝

**深拷贝** 是指创建一个对象的完全独立副本，其中对象及其嵌套的所有对象和数组都会被递归地拷贝。深拷贝确保新对象和原对象在内存中是完全独立的，修改一个对象的内容不会影响另一个对象。

#### 深拷贝的特点：

- 会创建一个新对象，新对象与原对象没有任何引用关系。
- 所有嵌套的对象或数组会被递归复制，确保每一层都是独立的。
- 修改深拷贝后的对象不会影响原对象，反之亦然。

#### 常见的深拷贝方法：

1. **使用 `JSON.parse(JSON.stringify())`**
   这是最常用的简便方法，适用于没有函数、`undefined` 和 `Symbol` 的对象。它通过将对象序列化为 JSON 字符串，再将其反序列化为新对象，来实现深拷贝。在工作当中，通常使用`lodash-es`这种库提供的公共方法。

   ```javascript
   const obj = { a: 1, b: { c: 2 } };
   const deepCopy = JSON.parse(JSON.stringify(obj));
   deepCopy.b.c = 3;

   console.log(obj.b.c); // 2, 原对象不受影响
   console.log(deepCopy.b.c); // 3
   ```

### 10. 如何实现一个继承

1. 通过原型链继承：

```javascript
function Parent(name) {
  this.name = name;
  return this;
}

Parent.prototype.getName = function () {
  return this.name;
};

Parent.prototype.info = {
  male: "man",
};

function Child(age) {
  this.age = age;
}

Child.prototype = new Parent();

const child1 = new Child(1);
const child2 = new Child(2);

console.log(child1.getName);
console.log(child1.info);
child1.info.male = "woman";
console.log(child2.info);
```

_缺点：_ 共享父类引用类型的属性，无法传参

2. 通过`call/apply`构造函数继承

```javascript
function Parent(name) {
  this.name = name;
  return this;
}

Parent.prototype.getName = function () {
  return this.name;
};

Parent.prototype.info = {
  male: "man",
};

function Child(age, name) {
  Parent.call(this, name);

  this.age = age;
}

const child1 = new Child(1, "Tom");
const child2 = new Child(2, "Jack");

console.log(child1.name);
console.log(child2.name);
console.log(child2.info); // undefined
```

_缺点:_ 无法继承父类原型链上的方法以及属性

3. 寄生组合式继承

```javascript
function Parent(name) {
  this.name = name;
  return this;
}

Parent.prototype.getName = function () {
  return this.name;
};

Parent.prototype.info = {
  male: "man",
};

function Child(age, name) {
  Parent.call(this, name);

  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child1 = new Child(1, "Tom");
const child2 = new Child(2, "Jack");

console.log(child1.name);
console.log(child2.name);
console.log(child2.info);
console.log(child2.getName);
```

4. 通过 ES6 `extends` 实现继承

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(age, name) {
    super(name);
    this.age = age;
  }
  getInfo() {
    return `${this.name}——${this.age}`;
  }
}

const child = new Child(12, "TOM");

console.log(child.getInfo());
console.log(child.getName());
```

### 11. JavaScript 中 `this` 的指向

`this` 在 JavaScript 中的指向取决于**执行上下文**，不同的调用方式导致 `this` 指向不同对象。以下是几种常见情况：

#### 1. 全局环境（普通函数中的 `this`）

- 在全局作用域或普通函数中，`this` 默认指向全局对象（浏览器中是 `window`，Node.js 中是 `global`）。
- 严格模式（`'use strict'`）下，`this` 为 `undefined`。

```javascript
function test() {
  console.log(this); // 在非严格模式下输出：window，在严格模式下输出：undefined
}
test();
```

#### 2. 对象方法中的 this

- 当 this 出现在对象方法中，this 指向调用该方法的对象。

```javascript
const obj = {
  name: "Alice",
  getName() {
    console.log(this.name); // 输出：Alice
  },
};
obj.getName();
```

#### 3. 构造函数中的 this

- 使用构造函数（通过 new 关键字）调用时，this 指向新创建的实例对象。

```javascript
function Person(name) {
  this.name = name;
}
const person = new Person("Bob");
console.log(person.name); // 输出：Bob
```

#### 4. 箭头函数中的 this

- 箭头函数不会创建自己的 this，它继承自定义时的词法作用域的 this 值，指向函数声明时所在的作用域。

```javascript
const obj = {
  name: "Alice",
  getName: () => {
    console.log(this.name); // 输出：undefined（因为 this 继承自全局作用域）
  },
};
obj.getName();

function Outer() {
  this.name = "Bob";
  return () => console.log(this.name); // 输出：Bob
}
const arrowFunc = new Outer();
arrowFunc();
```

#### 5. call、apply 和 bind 改变 this

- call 和 apply 可以显式指定 this 指向，传入的第一个参数会作为 this。
- bind 创建一个新函数并锁定 this 为指定对象。

```javascript
function greet() {
  console.log(this.name);
}
const person = { name: "Alice" };
greet.call(person); // 输出：Alice
greet.apply(person); // 输出：Alice

const boundGreet = greet.bind(person);
boundGreet(); // 输出：Alice
```

#### 6. DOM 事件处理函数中的 this

- 在事件处理函数中，this 默认指向触发事件的 DOM 元素。

```javascript
const button = document.querySelector("button");
button.addEventListener("click", function () {
  console.log(this); // 输出：button 元素
});
```

#### 7. class 类中的 this

- class 中定义的方法（非箭头函数）调用时，this 指向该类的实例。
- 事件回调或箭头函数中的 this 指向外层作用域。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name); // 输出：实例的 name 属性
  }

  delayedGreet() {
    setTimeout(() => {
      console.log(this.name); // 输出：实例的 name，因为箭头函数继承了外层 this
    }, 1000);
  }
}

const person = new Person("Alice");
person.sayName(); // 输出：Alice
person.delayedGreet(); // 输出：Alice
```

this 的指向主要取决于函数的调用方式。使用 bind、call、apply 可以显式设置 this 指向，箭头函数则适合在嵌套结构中保持外层的 this 指向，class 和构造函数通常用于面向对象编程。

### 12. bind, call, apply 区别是什么？都分别是干什么用的

# `bind`、`call` 和 `apply` 的区别总结

| 方法    | 作用                         | 是否立即执行 | 参数传递方式                                   | 返回值       | 使用场景                             |
| ------- | ---------------------------- | ------------ | ---------------------------------------------- | ------------ | ------------------------------------ |
| `bind`  | 创建一个绑定 `this` 的新函数 | 否           | 第一个参数为 `this` 指向，后续为预设参数       | 返回新函数   | 需要永久改变 `this` 指向，并稍后调用 |
| `call`  | 调用函数并改变 `this` 指向   | 是           | 第一个参数为 `this` 指向，后续参数逐个传递     | 函数的返回值 | 立即调用函数并临时改变 `this` 指向   |
| `apply` | 调用函数并改变 `this` 指向   | 是           | 第一个参数为 `this` 指向，第二个参数为参数数组 | 函数的返回值 | 立即调用函数，参数通过数组传递       |

---

_示例代码_

#### 1. `bind` 示例

```javascript
const obj = { name: "Alice" };
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const boundGreet = greet.bind(obj, "Hello");
boundGreet(); // 输出：Hello, Alice
```

#### 2. `call` 示例

```javascript
const obj = { name: "Bob" };
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}
greet.call(obj, "Hi", "!"); // 输出：Hi, Bob!
```

#### 3. `apply` 示例

```javascript
const obj = { name: "Charlie" };
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}
greet.apply(obj, ["Hey", "?"]); // 输出：Hey, Charlie?
```

### 13. JS 的事件循环(EventLop)

在事件循环中，当主线程执行完当前的同步任务后，会检查事件队列中是否有待处理的事件。如果有，主线程会取出事件并执行对应的回调函数。这个循环的过程被称为事件循环（Event Loop），它由主线程和任务队列两部分组成。主线程负责执行同步任务，而异步任务则通过任务队列进行处理。这种机制保证了异步任务在适当的时机能够插入执行，从而实现了 JavaScript 的非阻塞异步执行。
![Event Loop](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/task.png)

事件循环流程如下：

1.主线程读取 JavaScript 代码，形成相应的堆和执行栈。

2.当主线程遇到异步任务时，将其委托给对应的异步进程（如 Web API）处理。

3.异步任务完成后，将相应的回调函数推入任务队列。

4.主线程执行完同步任务后，检查任务队列，如果有任务，则按照先进先出的原则将任务推入主线程执行。

5.重复执行以上步骤，形成事件循环。

#### 同步任务

同步任务是按照代码的书写顺序一步一步执行的任务。当主线程执行同步任务时，会阻塞后续的代码执行，直到当前任务执行完成。典型的同步任务包括函数调用、变量赋值、算术运算等。例如：

```javascript
console.log("Step 1");
let result = add(2, 3);
console.log(result);
console.log("Step 2");

function add(a, b) {
  return a + b;
}
```

#### 异步任务

异步任务是在主线程执行的同时，通过回调函数或其他机制委托给其他线程或事件来处理的任务。在执行异步任务时，主线程不会等待任务完成，而是继续执行后续代码。

#### 执行图：

![Event Loop](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/task1.png)

#### 任务队列类型

任务队列分为宏任务队列（macrotask queue）和微任务队列（microtask queue）两种。JavaScript 引擎遵循事件循环的机制，在执行完当前宏任务后，会检查微任务队列，执行其中的微任务，然后再取下一个宏任务执行。这个过程不断循环，形成事件循环。

1、宏任务（Macrotasks）是一些较大粒度的任务，包括：

所有同步任务

- script: 浏览器加载和解析 JavaScript 脚本文件，整个脚本作为一个宏任务执行。
- setTimeout: 设置一个定时器，当指定时间到达后，其回调函数作为一个宏任务被加入队列。
- setInterval: 与 setTimeout 类似，但会周期性地重复执行回调函数，每次执行都是一个宏任务。
- setImmediate: 在 Node.js 中，用于在当前事件循环结束后立即执行回调函数。在浏览器中，可以通过- - setTimeout(callback, 0)实现相似效果。
- I/O: 包括文件读写、网络请求等，完成后的回调函数作为宏任务处理。
- UI-rendering:浏览器自动更新页面元素的视觉表示，以反映最新的 DOM 和样式变更的过程。

2、微任务（Microtasks）是一些较小粒度、高优先级的任务，包括：

- Promise 的 then、catch、finally
- async/await 中的代码 （Promise + Generator 的语法糖）
- Generator 函数
- MutationObserver
- process.nextTick（Node.js 环境）

#### 执行过程

1. 执行同步代码（宏任务 script）

2. 同步执行完毕后，检查是否有异步需要执行(检查两个异步队列，微任务队列和宏任务队列)

3. 执行所有的微任务

4. 微任务执行完毕后，如果有需要就渲染页面

5. 执行异步宏任务，也就是开启下一次事件循环

### 14. JavaScript 的单线程特性

> 为什么 JS 是单线程？
> 一句话概括： 防止渲染 DOM 冲突

- CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 的渲染
- CSS 会阻塞 JS 执行，但不会阻塞 JS 文件的下载

JavaScript 设计之初的主要目的是在网页上添加交互功能，以增强网页的交互性和动态性，所以为了简化并发问题、提高执行效率和避免浏览器环境的限制，开发人员选择了单线程执行模型。它的优点在于：

- 节约性能/内存
- 节约上下文切换的时间
- 减少并发问题（如死锁等）的发生

当然单线程执行也存在一些局限性。例如，它不能充分利用多核 CPU 的并行处理能力，可能导致某些计算密集型任务的执行效率较低。为了解决这个问题，JavaScript 通过一些技术如事件循环机制、Promise、async/await 等来支持并发和并行处理。这些技术能让 JavaScript 代码在执行耗时任务时，不阻塞主线程的执行，从而提高了整体性能。

### 15. JS 需要等待 CSS 的下载，这是为什么呢？（CSS 阻塞 DOM 执行）

如果 JS 脚本的内容是获取元素的样式，那它就必然依赖 CSS。因为浏览器无法感知 JS 内部到底想干什么，为避免样式获取，就只好等前面所有的样式下载完毕再执行 JS。但 JS 文件与 CSS 文件下载是并行的，CSS 文件会在后面的 JS 文件执行前先加载执行完毕，所以 CSS 会阻塞后面 JS 的执行
避免白屏，提高 CSS 的加载速度

- 使用 CDN（CDN 会根据你的网络状况，挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间）
- 对 CSS 进行压缩
- 合理使用缓存
- 减少 http 请求数，合并 CSS 文件

### 16. 栈与堆的区别

| 特性         | 栈                                    | 堆                                   |
| ------------ | ------------------------------------- | ------------------------------------ |
| 存储数据类型 | 基本数据类型（`number`、`string` 等） | 引用类型（对象、数组、函数等）       |
| 内存分配方式 | 自动分配和释放，遵循 LIFO 规则        | 手动分配，由垃圾回收机制自动释放     |
| 存储位置     | 存储在栈内存中                        | 存储在堆内存中                       |
| 存取速度     | 存取速度较快                          | 存取速度较慢                         |
| 生命周期     | 当函数调用结束，栈内存会被释放        | 由垃圾回收机制管理，依赖引用计数机制 |

### 17.数组额常用方法

| 方法              | 返回值                           | 作用                                                                          |
| ----------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| **push()**        | 返回数组的新长度                 | 向数组末尾添加一个或多个元素，并返回数组的新长度。                            |
| **pop()**         | 返回被移除的元素                 | 删除数组末尾的元素，并返回该元素。                                            |
| **shift()**       | 返回被移除的元素                 | 删除数组开头的元素，并返回该元素。                                            |
| **unshift()**     | 返回数组的新长度                 | 向数组开头添加一个或多个元素，并返回数组的新长度。                            |
| **concat()**      | 返回一个新数组                   | 合并两个或多个数组，并返回一个新数组，原数组不变。                            |
| **join()**        | 返回一个字符串                   | 将数组的所有元素连接成一个字符串，元素之间用指定的分隔符分隔。                |
| **slice()**       | 返回数组的一个浅拷贝             | 返回数组的一部分（指定范围），不修改原数组。                                  |
| **splice()**      | 返回被删除的元素（数组）         | 从数组中添加/删除元素，修改原数组，返回删除的元素（如果有）。                 |
| **forEach()**     | 返回 `undefined`                 | 对数组的每个元素执行指定的函数，无返回值，遍历每个元素。                      |
| **map()**         | 返回一个新数组                   | 对数组的每个元素执行指定的函数，返回一个新数组。                              |
| **filter()**      | 返回一个新数组                   | 返回符合条件的元素组成的新数组。                                              |
| **reduce()**      | 返回一个单一的值                 | 根据指定的函数，将数组元素逐步合并成单一的值。                                |
| **reduceRight()** | 返回一个单一的值                 | 与 `reduce()` 类似，但从右到左遍历数组。                                      |
| **some()**        | 返回 `true` 或 `false`           | 如果数组中至少有一个元素满足指定的测试函数，则返回 `true`，否则返回 `false`。 |
| **every()**       | 返回 `true` 或 `false`           | 如果数组的所有元素都满足指定的测试函数，则返回 `true`，否则返回 `false`。     |
| **find()**        | 返回数组中第一个符合条件的元素   | 返回数组中第一个满足提供的测试函数的元素，如果没有找到，则返回 `undefined`。  |
| **findIndex()**   | 返回元素的索引                   | 返回数组中第一个符合条件的元素的索引，如果没有找到，则返回 `-1`。             |
| **sort()**        | 返回排序后的数组                 | 对数组进行排序，并返回排序后的数组。                                          |
| **reverse()**     | 返回反转后的数组                 | 将数组的顺序反转，并返回反转后的数组。                                        |
| **includes()**    | 返回 `true` 或 `false`           | 判断数组中是否包含某个元素，返回布尔值。                                      |
| **indexOf()**     | 返回元素的索引                   | 返回数组中指定元素第一次出现的索引，如果没有找到，则返回 `-1`。               |
| **at()**          | 返回指定位置的元素               | 返回数组中指定位置的元素，支持负数索引。                                      |
| **flat()**        | 返回一个新数组                   | 将多维数组拉平为一维数组。                                                    |
| **flatMap()**     | 返回一个新数组                   | 先对数组的每个元素进行映射操作，然后将结果合并为一个新数组。                  |
| **copyWithin()**  | 返回修改后的数组                 | 在数组内部复制一部分元素到其他位置，修改原数组。                              |
| **from()**        | 返回一个新数组                   | 将类数组对象或可迭代对象转换为数组。                                          |
| **keys()**        | 返回一个数组的键（索引）的迭代器 | 返回一个包含数组键（索引）的新的迭代器对象。                                  |
| **values()**      | 返回一个数组值的迭代器           | 返回一个包含数组值的新的迭代器对象。                                          |
| **entries()**     | 返回数组的键值对的迭代器         | 返回一个包含数组元素键值对的新的迭代器对象。                                  |

> `flatMap()` 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 `map()` 方法后再调用深度为 1 的 `flat()` 方法`（arr.map(...args).flat()）`，但比分别调用这两个方法稍微更高效一些。

```javascript
const arr1 = [1, 2, 1];

const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]
```

### 18. for...of,for..in,forEach,map 的区别？

| 特性/方法                       | `for...of`                            | `for...in`                       | `forEach()`                        | `map()`                          |
| ------------------------------- | ------------------------------------- | -------------------------------- | ---------------------------------- | -------------------------------- |
| **用途**                        | 遍历可迭代对象（数组、字符串等）      | 遍历对象的可枚举属性（键名）     | 遍历数组元素                       | 遍历数组元素，返回一个新数组     |
| **返回值**                      | 每次循环返回值                        | 每次循环返回键名（对象的属性名） | `undefined`，不返回新数组          | 返回一个新数组，包含转换后的元素 |
| **适用对象**                    | 可迭代对象（如数组、`Set`、`Map` 等） | 对象的属性（数组的索引也可遍历） | 数组                               | 数组                             |
| **是否支持 `break`/`continue`** | 支持 `break` 和 `continue`            | 支持 `break` 和 `continue`       | 不支持 `break` 或 `continue`       | 不支持 `break` 或 `continue`     |
| **是否创建新数组**              | 不创建新数组                          | 不创建新数组                     | 不创建新数组                       | 创建并返回一个新数组             |
| **性能**                        | 性能较好（相对 `for...in`）           | 性能较差，尤其是在数组上         | 性能一般（对每个元素执行回调函数） | 性能较好（用于转换数组元素）     |

#### 总结：

- `for...of`：适合遍历可迭代对象的值。
- `for...in`：适合遍历对象的属性名。
- `forEach()`：适合执行副作用操作，如打印，但不返回值。
- `map()`：适合处理并转换数组，返回新的数组。

这些方法根据不同的场景选择使用，可以帮助提高代码的可读性和效率。

### 19. `var`, `let` ,`const` 的区别以及使用场景

| 特性         | `var`                                                              | `let`                                          | `const`                                      |
| ------------ | ------------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------- |
| **作用域**   | 函数作用域（如果在函数内声明）或全局作用域（如果在函数外声明）     | 块级作用域（`if`、`for`、`while` 等）          | 块级作用域（`if`、`for`、`while` 等）        |
| **提升行为** | 会提升至函数或全局作用域的顶部，但初始化不会提升                   | 会提升至块级作用域顶部，但初始化不会提升       | 会提升至块级作用域顶部，但初始化不会提升     |
| **可重声明** | 允许在同一作用域内多次声明                                         | 不允许在同一作用域内重复声明                   | 不允许在同一作用域内重复声明                 |
| **可变性**   | 可以重新赋值，并且可以重新声明                                     | 可以重新赋值，但不能重新声明                   | 不能重新赋值，声明后值不可变`(引用类型可以)` |
| **初始化**   | 可以在声明时不初始化                                               | 必须在声明时初始化                             | 必须在声明时初始化                           |
| **适用场景** | 一般不推荐使用，除非兼容旧版浏览器，或者在全局作用域中处理某些情况 | 用于需要重新赋值的变量，适用于循环、条件判断等 | 用于常量，声明后值不会改变的变量             |

### 20. 箭头函数与普通函数的区别

- 箭头函数没有 arguments（建议使用更好的语法，剩余运算符替代）

- 箭头函数没有 prototype 属性，不能用作构造函数（不能用 new 关键字调用）

- 箭头函数没有自己 this，它的 this 是词法的，引用的是上下文的 this，即在你写这行代码的时候就箭头函数的 this 就已经和外层执行上下文的 this 绑定了(这里个人认为并不代表完全是静态的,因为外层的上下文仍是动态的可以使用 call,apply,bind 修改,这里只是说明了箭头函数的 this 始终等于它上层上下文中的 this)

### 21. ES6+ `iterator` 迭代器

![Event event](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/iterator2.png)

iterator 迭代器是 ES6 非常重要的概念，但是很多人对它了解的不多，但是它却是另外 4 个 ES6 常用特性的实现基础（解构赋值，剩余/扩展运算符，生成器，for of 循环），了解迭代器的概念有助于了解另外 4 个核心语法的原理，另外 ES6 新增的 Map,Set 数据结构也有使用到它，所以我放到前面来讲

对于可迭代的数据解构，ES6 在内部部署了一个[Symbol.iterator]属性，它是一个函数，执行后会返回 iterator 对象（也叫迭代器对象），而生成 iterator 对象[Symbol.iterator]属性叫 iterator 接口,有这个接口的数据结构即被视为可迭代的

数组中的 Symbol.iterator 方法(iterator 接口)默认部署在数组原型上:
![Event event](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/iterator.png)

默认部署 iterator 接口的数据结构有以下几个，注意普通对象默认是没有 iterator 接口的（可以自己创建 iterator 接口让普通对象也可以迭代）

- Array
- Map
- Set
- String
- TypedArray（类数组）
- 函数的 arguments 对象
- NodeList 对象

iterator 迭代器是一个对象，它具有一个 next 方法所以可以这么调用

![Event event](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/iterator1.png)

next 方法返回又会返回一个对象，有 value 和 done 两个属性，value 即每次迭代之后返回的值，而 done 表示是否还需要再次循环，可以看到当 value 为 undefined 时，done 为 true 表示循环终止

##### 梳理一下

- 可迭代的数据结构会有一个[Symbol.iterator]方法
- [Symbol.iterator]执行后返回一个 iterator 对象
- iterator 对象有一个 next 方法
- 执行一次 next 方法(消耗一次迭代器)会返回一个有 value,done 属性的对象

### 22. ES6+ 有哪些常用 API

1. 字符串模版
2. 箭头函数
3. 结构赋值
4. 对象属性/方法简写
5. async/await/promise
6. 数组常用 API `filter`,`some`,`every`,`map`,`reduce`，`includes`
7. 申明变量`let`,`const`
8. 剩余扩展运算符
9. `Class`
10. `Map`,`weakMap`,`Set`,`weakSet`

#### `Map`、`WeakMap`、`Set` 和 `WeakSet` 的区别

| 特性                             | `Map`                                                                 | `WeakMap`                                                              | `Set`                                    | `WeakSet`                                                     |
| -------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **定义**                         | 存储键值对的集合，每个元素是一个 [key, value] 数组                    | 存储键值对的集合，键是对象，值可以是任意数据类型                       | 存储唯一值的集合，不能有重复元素         | 存储唯一对象的集合，不能有重复元素                            |
| **键的类型**                     | 键可以是任意数据类型（包括对象、基本数据类型等）                      | 只允许对象作为键                                                       | 无键，只有值                             | 只允许对象作为元素                                            |
| **是否弱引用**                   | 强引用（即 `Map` 存储的键和值都会被引用）                             | 弱引用（键是弱引用，即键对象被垃圾回收时，`WeakMap` 中的项会自动删除） | 强引用（即 `Set` 存储的元素会被引用）    | 弱引用（即 `WeakSet` 只允许对象作为元素，且对象会被垃圾回收） |
| **垃圾回收机制**                 | 键和值的引用会阻止垃圾回收                                            | 键是弱引用，键对象被回收时，`WeakMap` 会自动清理项                     | 强引用，垃圾回收不会自动清理             | 元素是弱引用，元素对象被回收时，`WeakSet` 会自动清理项        |
| **迭代**                         | 支持迭代（通过 `forEach`、`for...of` 或 `keys`、`values`、`entries`） | 不支持迭代（不能直接遍历 `WeakMap`）                                   | 支持迭代（通过 `forEach` 或 `for...of`） | 不支持迭代（不能直接遍历 `WeakSet`）                          |
| **使用场景**                     | 存储任意类型的键值对，常用于缓存、查找等场景                          | 存储对象作为键的映射，适用于需要自动垃圾回收的场景                     | 存储不重复的值，常用于去重、集合等场景   | 存储不重复的对象，适用于需要自动垃圾回收的集合操作            |
| **插入、删除和查找的时间复杂度** | 常数时间复杂度 O(1)                                                   | 常数时间复杂度 O(1)                                                    | 常数时间复杂度 O(1)                      | 常数时间复杂度 O(1)                                           |

11. `Proxy` 与 `Reflect`(Vue3)

### 23. `Proxy` 与 `Reflect` 的使用场景以及详细介绍

#### **`Proxy`**

`Proxy` 是一种用于定义基本操作（如属性查找、赋值、枚举等）的自定义行为的机制。通过 `Proxy`，我们可以拦截并修改对象的操作。它接受两个参数：目标对象和处理器对象，处理器对象包含了不同操作的钩子方法。

##### **使用场景**

- **数据绑定**：在现代前端框架（如 Vue）中，使用 `Proxy` 实现响应式数据绑定，当数据变化时自动更新视图。
- **代理对象的访问控制**：通过 `Proxy` 可以拦截对对象属性的访问或修改，从而实现权限验证、日志记录等。
- **对象验证**：使用 `Proxy` 进行数据验证，比如拦截对象的设置操作，确保只有符合特定条件的数据被赋值。
- **缓存机制**：拦截对象的 getter 操作，实现计算结果的缓存，避免重复计算。

##### **常用操作**

- `get`：拦截对象的属性访问。
- `set`：拦截对象的属性赋值。
- `has`：拦截 `in` 操作符。
- `deleteProperty`：拦截 `delete` 操作符。
- `apply`：拦截函数调用。
- `construct`：拦截构造函数调用。

##### **代码示例**

```javascript
const handler = {
  get(target, prop, receiver) {
    console.log(`访问属性 ${prop}`);
    return prop in target ? target[prop] : 37; // 如果属性不存在，返回默认值
  },
  set(target, prop, value, receiver) {
    console.log(`设置属性 ${prop} 为 ${value}`);
    target[prop] = value;
    return true; // 必须返回 true 来表明赋值成功
  },
};

const obj = new Proxy({}, handler);
obj.name = "Alice"; // 设置属性 name 为 Alice
console.log(obj.name); // 访问属性 name
```

#### **`Reflect` 介绍**

`Reflect` 是 ECMAScript 2015 (ES6) 引入的一个全局对象，提供了操作对象的方法。它的设计初衷是统一和简化一些 JavaScript 内建对象操作，并补充了一些原本无法直接执行的操作。`Reflect` 包含了一些与对象操作相关的方法，这些方法和 `Proxy` 对象中的陷阱方法（如 `get`, `set`, `has` 等）非常相似。

`Reflect` 的一个显著特点是，它的操作方法返回的是标准的结果。与传统的对象操作（如 `obj.property` 或 `delete obj.property`）不同，`Reflect` 的方法返回布尔值，指示操作是否成功。

#### **使用场景**

1. **简化对象操作**：
   `Reflect` 提供了许多直接操作对象的标准方法，这些方法相比传统的操作方式更加简洁和一致。
2. **与 `Proxy` 配合使用**：
   `Reflect` 经常与 `Proxy` 一起使用，作为 `Proxy` 的陷阱方法的默认行为。例如，当我们在 `Proxy` 中定义拦截方法时，可以使用 `Reflect` 来确保执行对象的默认操作。

3. **避免直接操作对象的副作用**：
   在一些情况下，直接操作对象（如 `delete`, `get`）可能会引起副作用或者异常。通过使用 `Reflect`，可以更清晰地控制操作结果，避免这些副作用。

4. **对象方法的通用实现**：
   `Reflect` 可以用来简化对象操作的代码，例如动态访问、修改对象的属性或调用函数时提供统一的 API。

5. **实现 getter/setter 和方法调用**：
   `Reflect` 可以提供一种更简洁的方式来实现 getter/setter 和动态方法调用，它可以帮助你规避错误，特别是在动态访问属性或方法时。

#### **`Reflect` 的常用方法**

| 方法                                            | 说明                                          | 示例                                       |
| ----------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| `Reflect.get(target, prop)`                     | 获取对象的属性值。                            | `Reflect.get(obj, 'name')`                 |
| `Reflect.set(target, prop, value)`              | 设置对象的属性值。                            | `Reflect.set(obj, 'name', 'Alice')`        |
| `Reflect.has(target, prop)`                     | 判断对象是否具有指定的属性。                  | `Reflect.has(obj, 'name')`                 |
| `Reflect.deleteProperty(target, prop)`          | 删除对象的指定属性。                          | `Reflect.deleteProperty(obj, 'name')`      |
| `Reflect.apply(target, thisArg, argumentsList)` | 调用函数（类似 `Function.prototype.apply`）。 | `Reflect.apply(func, null, [1, 2])`        |
| `Reflect.construct(target, argumentsList)`      | 使用构造函数构造对象（类似 `new`）。          | `Reflect.construct(MyClass, [arg1, arg2])` |

#### **代码示例**

1. **使用 `Reflect` 简化对象操作**

```javascript
const obj = {
  name: "Alice",
  age: 25,
};

// 获取属性值
console.log(Reflect.get(obj, "name")); // 'Alice'

// 设置属性值
Reflect.set(obj, "name", "Bob");
console.log(obj.name); // 'Bob'

// 判断是否具有属性
console.log(Reflect.has(obj, "age")); // true

// 删除属性
Reflect.deleteProperty(obj, "age");
console.log(obj.age); // undefined
```

#### 与 Proxy 配合使用

```javascript
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(...arguments); // 使用 Reflect 获取属性值
    } else {
      return `属性 ${prop} 不存在`;
    }
  },
};

const proxy = new Proxy({ name: "Alice" }, handler);
console.log(proxy.name); // 'Alice'
console.log(proxy.age); // '属性 age 不存在'
```

#### 动态调用函数

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

// 使用 Reflect 调用函数
const result = Reflect.apply(greet, null, ["Alice"]);
console.log(result); // 'Hello, Alice!'
```

### `Reflect` 与传统方法的对比

| 特性                 | **传统方式**                        | **`Reflect` 方法**                        |
| -------------------- | ----------------------------------- | ----------------------------------------- |
| **获取属性**         | `obj.property` 或 `obj['property']` | `Reflect.get(obj, 'property')`            |
| **设置属性**         | `obj.property = value`              | `Reflect.set(obj, 'property', value)`     |
| **判断属性是否存在** | `'property' in obj`                 | `Reflect.has(obj, 'property')`            |
| **删除属性**         | `delete obj.property`               | `Reflect.deleteProperty(obj, 'property')` |
| **函数调用**         | `func.apply(thisArg, args)`         | `Reflect.apply(func, thisArg, args)`      |
| **构造函数调用**     | `new Constructor(args)`             | `Reflect.construct(Constructor, args)`    |

总结

- Proxy 主要用于拦截和自定义对象操作行为，适用于需要动态修改行为、控制访问或记录日志的场景。
- Reflect 提供了与 Proxy 操作一致的 API，用于简化对象操作，特别是当 Proxy 中需要使用默认行为时，Reflect 是一个有用的工具。

- 简化对象操作：Reflect 提供了比传统方法更简洁、更一致的方式来操作对象，尤其在需要动态访问、修改属性或调用函数时非常有用。
- 与 Proxy 配合：Reflect 可以作为 Proxy 的陷阱方法的默认实现，用来避免代理逻辑中操作的不一致性。
- 避免副作用：相比传统的直接操作对象，Reflect 提供了更安全和更可控的方式来进行对象操作，减少了副作用。

Reflect 是现代 JavaScript 中的一个强大工具，尤其在代理和反射操作中，提供了简化且一致的 API。
