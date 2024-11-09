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

### JavaScript 中 `this` 的指向

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

JavaScript 设计之初的主要目的是在网页上添加交互功能，以增强网页的交互性和动态性，所以为了简化并发问题、提高执行效率和避免浏览器环境的限制，开发人员选择了单线程执行模型。它的优点在于：

- 节约性能/内存
- 节约上下文切换的时间
- 减少并发问题（如死锁等）的发生

当然单线程执行也存在一些局限性。例如，它不能充分利用多核 CPU 的并行处理能力，可能导致某些计算密集型任务的执行效率较低。为了解决这个问题，JavaScript 通过一些技术如事件循环机制、Promise、async/await 等来支持并发和并行处理。这些技术能让 JavaScript 代码在执行耗时任务时，不阻塞主线程的执行，从而提高了整体性能。

### 15. JavaScript 的单线程特性

### 栈与堆的区别

| 特性         | 栈                                    | 堆                                   |
| ------------ | ------------------------------------- | ------------------------------------ |
| 存储数据类型 | 基本数据类型（`number`、`string` 等） | 引用类型（对象、数组、函数等）       |
| 内存分配方式 | 自动分配和释放，遵循 LIFO 规则        | 手动分配，由垃圾回收机制自动释放     |
| 存储位置     | 存储在栈内存中                        | 存储在堆内存中                       |
| 存取速度     | 存取速度较快                          | 存取速度较慢                         |
| 生命周期     | 当函数调用结束，栈内存会被释放        | 由垃圾回收机制管理，依赖引用计数机制 |
