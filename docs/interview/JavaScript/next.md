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

## 2. 实现一个`deepClone` 深拷贝

## 3. 实现一个`new` 操作符

## 4. 实现一个`Object.create`

## 5. 实现一个`throttle` 节流函数

## 6. 实现一个`debounce` 防抖函数

## 7. 实现一个`call`

## 8. 实现一个`apply`

## 9. 实现一个`bind`

## 10. 实现`flatten`数组扁平化

## 11. 实现`树转数组`

## 12. 实现`数组转树`

## 13. 实现数组去重

## 14. 实现一个`数字千分位分割`

## 15. 实现一个`下划线转驼峰`

## 16. 怎么判断一个对象是否为空对象

## 17. 实现一个`二分查找`

## 18. 实现一个`JSONP`

## 19. 实现一个 Ajax 请求数据

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

## 49. `Proxy` 实现对象属性的拦截

## 50. `Reflect` 的使用
