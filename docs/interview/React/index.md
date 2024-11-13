---
title: 前端面试React篇
tags: front interview
theme: solarized-dark
---

# 前端面试 React 篇

![react_lifecycle](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/react_lifecyle.png)

## 1. React 的生命周期有哪些？

React 组件的生命周期大致可以分为以下三个阶段：**挂载阶段**、**更新阶段** 和 **卸载阶段**。每个阶段都有对应的生命周期方法。

### 1. 挂载阶段（Mounting）

挂载阶段是指组件被创建并插入到 DOM 中的过程。在这个阶段会触发以下方法：

- **constructor**：初始化状态或绑定方法，是组件实例创建的第一个方法。
- **static getDerivedStateFromProps**：在组件挂载或更新时调用，用于在渲染前更新状态。
- **render**：唯一必需的方法，返回组件的 JSX，描述组件的 UI。
- **componentDidMount**：组件挂载后调用，常用于进行异步请求或 DOM 操作。

### 2. 更新阶段（Updating）

更新阶段发生在组件的状态或属性发生变化时。React 会重新渲染组件并触发以下方法：

- **static getDerivedStateFromProps**：每次更新前调用，用于根据 props 更新状态。
- **shouldComponentUpdate**：用来判断是否允许更新，返回 `true` 允许更新，返回 `false` 阻止更新。
- **render**：重新渲染组件，生成新的 DOM。
- **getSnapshotBeforeUpdate**：在 DOM 更新前调用，返回的值会传递给 `componentDidUpdate`。
- **componentDidUpdate**：组件更新后调用，通常用于操作更新后的 DOM 或发起异步请求。

### 3. 卸载阶段（Unmounting）

卸载阶段是指组件即将被从 DOM 中移除的过程。在这个阶段只会调用一个方法：

- **componentWillUnmount**：组件卸载前调用，用于清理定时器或取消网络请求等。

### 4. 错误处理阶段（Error Handling）

React 16 引入了新的错误处理方法，用于捕获组件中的错误。

- **componentDidCatch**：在子组件出现错误时调用，接收 `error` 和 `info` 参数，可以用于记录错误信息或展示降级 UI。
- **static re'a**：用来更新组件状态以响应渲染错误，常用于实现错误边界。

### React 生命周期方法一览表

| 阶段     | 生命周期方法                      | 描述                                                            |
| -------- | --------------------------------- | --------------------------------------------------------------- |
| 挂载     | `constructor`                     | 初始化状态和方法绑定。                                          |
|          | `static getDerivedStateFromProps` | 在挂载前或更新前调用，用于根据 props 初始化或更新状态。         |
|          | `render`                          | 必需方法，返回 JSX 描述组件 UI。                                |
|          | `componentDidMount`               | 组件挂载后调用，适合进行异步请求或 DOM 操作。                   |
| 更新     | `static getDerivedStateFromProps` | 在更新前调用，根据新的 props 更新状态。                         |
|          | `shouldComponentUpdate`           | 控制是否允许更新，返回 `true` 继续更新，返回 `false` 阻止更新。 |
|          | `render`                          | 重新渲染组件生成新的 DOM。                                      |
|          | `getSnapshotBeforeUpdate`         | DOM 更新前调用，返回值传递给 `componentDidUpdate`。             |
|          | `componentDidUpdate`              | 组件更新后调用，用于操作更新后的 DOM。                          |
| 卸载     | `componentWillUnmount`            | 组件卸载前调用，适合清理定时器或取消异步请求。                  |
| 错误处理 | `componentDidCatch`               | 捕获子组件错误，用于记录错误或展示降级 UI。                     |
|          | `static getDerivedStateFromError` | 在渲染时遇到错误时调用，更新组件状态以展示备用 UI。             |

### React 16+ 新的生命周期方法

React 16 引入了 `static getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate`，并逐步弃用了 `componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate`。旧方法依然可用，但在使用时会

## 2.

## 3.

## 4.

## 5.

## 6.

## 7.

## 8.

## 9.

## 10.

## 11.

## 12.

## 13.

## 14.

## 15.

## 16.

## 17.

## 18.

## 19.

## 20.

## 21.

## 22.

## 23.

## 24.

## 25.

## 26.

## 27.

## 28.

## 29.

## 30.
