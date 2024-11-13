---
title: 前端面试React篇
tags: front interview
theme: solarized-dark
---

# 前端面试 React 篇 (UI=f(data))

![react_lifecycle](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/react_lifecyle.png)

## 1. React 的生命周期有哪些？

React 组件的生命周期大致可以分为以下三个阶段：**挂载阶段**、**更新阶段** 和 **卸载阶段**。每个阶段都有对应的生命周期方法。

### 1. 挂载阶段（Mounting）

挂载阶段是指组件被创建并插入到 DOM 中的过程。在这个阶段会触发以下方法：

- **constructor**：初始化状态或绑定方法，是组件实例创建的第一个方法。
- **static getDerivedStateFromProps(nextProps, prevState)**：在组件挂载或更新时调用，用于在渲染前更新状态。
- **render**：唯一必需的方法，返回组件的 JSX，描述组件的 UI。
- **componentDidMount**：组件挂载后调用，常用于进行异步请求或 DOM 操作。

### 2. 更新阶段（Updating）

更新阶段发生在组件的状态或属性发生变化时。React 会重新渲染组件并触发以下方法：

- **static getDerivedStateFromProps(nextProps, prevState)**：每次更新前调用，用于根据 props 更新状态。
- **shouldComponentUpdate(nextProps, nextState)**：用来判断是否允许更新，返回 `true` 允许更新，返回 `false` 阻止更新。
- **render**：重新渲染组件，生成新的 DOM。
- **getSnapshotBeforeUpdate(prevProps, prevState)**：在 DOM 更新前调用，返回的值会传递给 `componentDidUpdate(prevProps, prevState, snapshot)`。
- **componentDidUpdate(prevProps, prevState, snapshot)**：组件更新后调用，通常用于操作更新后的 DOM 或发起异步请求。

### 3. 卸载阶段（Unmounting）

卸载阶段是指组件即将被从 DOM 中移除的过程。在这个阶段只会调用一个方法：

- **componentWillUnmount**：组件卸载前调用，用于清理定时器或取消网络请求等。

### 4. 错误处理阶段（Error Handling）

React 16 引入了新的错误处理方法，用于捕获组件中的错误。

- **componentDidCatch**：在子组件出现错误时调用，接收 `error` 和 `info` 参数，可以用于记录错误信息或展示降级 UI。
- **static re'a**：用来更新组件状态以响应渲染错误，常用于实现错误边界。

### React 生命周期方法一览表

| 阶段     | 生命周期方法                                             | 描述                                                                                |
| -------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 挂载     | `constructor`                                            | 初始化状态和方法绑定。                                                              |
|          | `static  getDerivedStateFromProps(nextProps, prevState)` | 在挂载前或更新前调用，用于根据 props 初始化或更新状态。                             |
|          | `render`                                                 | 必需方法，返回 JSX 描述组件 UI。                                                    |
|          | `componentDidMount`                                      | 组件挂载后调用，适合进行异步请求或 DOM 操作。                                       |
| 更新     | `static  getDerivedStateFromProps(nextProps, prevState)` | 在更新前调用，根据新的 props 更新状态。                                             |
|          | `shouldComponentUpdate(nextProps, nextState)`            | 控制是否允许更新，返回 `true` 继续更新，返回 `false` 阻止更新。                     |
|          | `render`                                                 | 重新渲染组件生成新的 DOM。                                                          |
|          | `getSnapshotBeforeUpdate(prevProps, prevState)`          | DOM 更新前调用，返回值传递给 `componentDidUpdate(prevProps, prevState, snapshot)`。 |
|          | `componentDidUpdate(prevProps, prevState, snapshot)`     | 组件更新后调用，用于操作更新后的 DOM。                                              |
| 卸载     | `componentWillUnmount`                                   | 组件卸载前调用，适合清理定时器或取消异步请求。                                      |
| 错误处理 | `componentDidCatch`                                      | 捕获子组件错误，用于记录错误或展示降级 UI。                                         |
|          | `static getDerivedStateFromError`                        | 在渲染时遇到错误时调用，更新组件状态以展示备用 UI。                                 |

### React 16+ 新的生命周期方法

React 16 引入了 `static  getDerivedStateFromProps(nextProps, prevState)` 和 `getSnapshotBeforeUpdate(prevProps, prevState)`，并逐步弃用了 `componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate`。旧方法依然可用，但在使用时会

## 2. 什么是 JSX？

**JSX**（JavaScript XML）是一种 React 引入的语法扩展，允许在 JavaScript 代码中直接编写类似 HTML 的语法，用于描述组件的 UI 结构。它在浏览器运行之前会被编译为标准 JavaScript（如 `React.createElement` 调用），从而创建虚拟 DOM 节点。

### JSX 的特性

1. **类似 HTML 的语法**：JSX 的语法接近 HTML，让代码更直观地描述 UI 结构，便于阅读和维护。
2. **JavaScript 表达式支持**：可以在 JSX 中使用大括号 `{}` 包裹 JavaScript 表达式，例如变量、条件表达式、函数调用等，增强了组件的灵活性。
3. **编译为 JavaScript**：JSX 语法本质上是对 JavaScript 的扩展。通过 Babel 等工具编译后，JSX 会被转换为 `React.createElement` 形式的 JavaScript 代码。

### JSX 的语法规则

1. **顶层元素**：JSX 语法必须有一个唯一的顶层父元素，通常使用 `<div>` 或 `<React.Fragment>`。
2. **属性名和 className**：在 JSX 中，`class` 属性需要写成 `className`，因为 `class` 是 JavaScript 的保留字；事件名等属性遵循 camelCase 格式，如 `onClick`、`onChange` 等。
3. **表达式使用**：在 JSX 中可以通过 `{}` 包裹 JavaScript 表达式，比如动态数据或函数调用。
4. **注释**：在 JSX 中使用 `{/* 注释内容 */}` 进行注释。

## 3. React 组件通信如何实现?

在 React 中，组件之间的通信方式主要根据组件的层级关系决定。以下是几种常见的组件通信方式：

### 1. 父子组件通信

父组件向子组件传递数据，或通过子组件调用父组件的方法。

- **通过 props 传递数据**：父组件可以将数据通过 props 传递给子组件，子组件通过 `props` 接收。
- **回调函数传递事件**：父组件可以将一个回调函数作为 props 传递给子组件，子组件调用该回调函数并传入参数，父组件接收数据。

### 2. 兄弟组件通信

兄弟组件之间通常没有直接关系，数据传递需要通过共同的父组件或全局状态管理工具。

- **状态提升**：将状态提升至共同的父组件，通过 props 将状态和更新函数传递给兄弟组件，兄弟组件间通过共享父组件的状态实现通信。
- **状态管理库（如 Context 或 Redux）**：将共享状态存储在全局状态中，兄弟组件可以通过订阅状态来实现通信。

### 3. 跨层级组件通信

对于层级较深的组件通信，可以通过 Context API 或全局状态管理工具（如 Redux、MobX、Recoil 等）。

- **Context API**：创建 Context，在顶层组件中使用 `Provider` 提供状态，然后在深层子组件中使用 `useContext` 消费数据。
- **全局状态管理库**：在大型应用中共享复杂全局状态，使用 Redux、MobX 等实现跨层级状态管理和通信。

### 4. 发布订阅模式

在较复杂的应用中，发布订阅模式（Pub/Sub）用于实现松耦合的组件通信。

- **事件总线（Event Bus）**：在项目中创建一个中央事件总线，不同组件可以通过事件名发布和订阅消息，实现组件间通信。

### 5. URL 和路由参数

在基于路由的 React 应用中，可以通过 URL 和路由参数在不同页面组件间传递数据。

- **URL 参数**：通过路由中的参数传递数据，组件可以通过 `useParams` 等钩子函数获取。
- **查询字符串**：在 URL 中添加查询字符串，通过 `location.search` 或专用的库解析获取数据。

### 总结

- **父子组件通信**：通过 props 和回调函数传递数据和事件。
- **兄弟组件通信**：状态提升到共同的父组件，或使用 Context、状态管理库。
- **跨层级通信**：使用 Context API 或状态管理库管理全局状态。
- **发布订阅模式**：使用事件总线实现松耦合通信。
- **路由参数**：通过 URL 和查询字符串在不同页面组件间传递数据。

## 4. React 如何进行组件/逻辑复用?

在 React 中，组件和逻辑复用是提高代码复用性、可维护性和扩展性的关键方法。以下是几种常用的实现方式：

### 1. 高阶组件（Higher-Order Components，HOC）

高阶组件是一个**函数**，接受一个组件作为参数并返回一个新的组件。它用于为现有组件增加额外的功能或行为，通常用于跨多个组件的功能复用，如身份验证、日志记录、权限控制等。

- **优点**：可以动态地为组件添加功能，提高复用性。
- **缺点**：可能导致组件树嵌套过深，增加调试和维护的复杂度。

### 2. 自定义 Hook

自定义 Hook 是 React 16.8 引入的一种复用逻辑的方式，允许开发者将**状态逻辑**抽象成独立的函数，使其在多个组件间复用。自定义 Hook 使得组件的逻辑和状态管理更加模块化，避免了重复的代码。

- **优点**：能够复用逻辑，而不需要修改组件结构；非常适合处理状态逻辑、数据获取等场景。
- **缺点**：只能复用逻辑，不能复用 UI 或样式。

### 3. Render Props 模式

Render Props 模式是一种通过将**函数作为 props 传递给组件**，让父组件控制子组件渲染内容的模式。父组件通过函数传递给子组件，子组件调用该函数来控制其渲染内容，进而实现状态共享或行为复用。

- **优点**：灵活控制组件的渲染，适合复杂的逻辑复用。
- **缺点**：可能导致「嵌套地狱」，特别是在多层嵌套的情况下。

### 4. 组件组合（Composition）

组件组合是通过将多个独立的组件组合在一起，实现更复杂的组件功能。它强调将逻辑和 UI 拆分成多个小组件，然后将它们组合在一起，通过 props 或子组件来传递数据和行为。

- **优点**：提高组件的可复用性和组合性，组件之间解耦，代码清晰。
- **缺点**：可能需要在父组件中管理更多的状态，增加了管理的复杂度。

### 总结

- **高阶组件（HOC）**：适合复用功能逻辑，跨多个组件。
- **自定义 Hook**：适用于复用状态逻辑，不涉及 UI。
- **Render Props**：灵活控制组件渲染内容，适合复杂的状态或行为共享。
- **组件组合**：通过组合多个小组件，提升 UI 和功能的复用性。

这些方法各有优缺点，开发者可以根据需求和应用场景选择合适的方式进行组件和逻辑的复用。

## 5. 受控组件和非受控组件有什么区别？

在 React 中，组件的状态管理方式分为**受控组件**和**非受控组件**。两者的主要区别在于如何管理和访问表单元素的值。

### 1. 受控组件（Controlled Components）

受控组件是指**组件的表单元素（如 `<input>`、`<textarea>`、`<select>`）的值由 React 的 state 控制**。所有的表单输入都绑定到组件的 state 上，React 组件完全控制了表单元素的状态。

- **特点**：

  - 表单元素的值由 React 的 state 控制。
  - 每次输入更改时，都会更新 React 的 state，形成单向数据流。
  - 使用 `value` 和 `onChange` 属性来绑定表单元素和 React 状态。

- **优点**：

  - 更易于控制和验证输入内容，能够及时响应用户输入。
  - 提供了更高的灵活性，能够通过 React 的 state 管理输入数据、验证、格式化等。
  - 适用于需要与组件的状态进行同步的场景。

- **缺点**：
  - 需要更多的代码，尤其是在表单较大时，需要处理每个输入的状态和事件。

### 2. 非受控组件（Uncontrolled Components）

非受控组件是指**表单元素的值不由 React 管理，而是由 DOM 本身管理**。在这种情况下，表单元素的值通过 `ref` 获取，而不是通过组件的 state。

- **特点**：

  - 表单元素的值由 DOM 管理，React 组件不直接控制。
  - 通过 `ref` 引用 DOM 元素，获取和设置其值。
  - 不使用 `value` 和 `onChange` 来控制输入值。

- **优点**：

  - 代码相对简洁，不需要在每个输入变化时都更新 state，适合简单的场景。
  - 适用于一些不需要与 React 状态同步的情况，如上传文件等。

- **缺点**：
  - 难以实现实时验证或格式化数据，且在状态更新时较为不灵活。
  - 不容易与 React 的组件状态和其他业务逻辑同步。

### 3. 主要区别

| 特性                | 受控组件                            | 非受控组件                      |
| ------------------- | ----------------------------------- | ------------------------------- |
| **状态管理**        | React 控制输入的值，通过 state 管理 | DOM 控制输入的值，通过 ref 获取 |
| **表单处理**        | `value` 和 `onChange` 控制输入值    | 通过 ref 获取或设置输入值       |
| **代码复杂度**      | 需要更多的代码来处理状态            | 代码较简单，适合简单场景        |
| **实时验证/格式化** | 便于处理实时验证和格式化            | 不适合实时验证或格式化          |

### 总结

- **受控组件**：适用于需要实时控制和管理输入状态的场景，更加灵活和可控，但代码量较大。
- **非受控组件**：适合简单的表单场景，减少了 React state 的干预，代码较简洁，但不适合需要复杂交互或验证的场景。

选择使用受控组件还是非受控组件，取决于应用的复杂度和对表单数据的管理需求。

## 6. React Hooks 有哪些？

React 提供了一系列 Hooks 来管理状态、生命周期和副作用等功能。以下是常见的 React Hooks：

### 1. `useState`

- **功能**：用于在函数组件中声明状态。
- **返回值**：一个包含当前状态值和更新该状态的函数的数组。
- **使用场景**：组件内部状态管理。

### 2. `useEffect`

- **功能**：用于处理副作用（例如数据获取、DOM 操作、事件监听等）。
- **返回值**：无返回值，接受一个回调函数作为参数，可以选择在组件渲染后执行副作用，或者在组件卸载时清理副作用。
- **使用场景**：组件加载时、更新时或卸载时执行副作用操作。

### 3. `useContext`

- **功能**：用于在函数组件中访问 React Context 的值。
- **返回值**：当前 Context 的值。
- **使用场景**：跨多个组件共享数据，避免在组件层级上传递 props。

### 4. `useRef`

- **功能**：用于引用 DOM 元素或函数组件实例，以及保存跨渲染周期的可变数据。
- **返回值**：一个包含 `current` 属性的对象，该属性指向 DOM 元素或函数组件实例。
- **使用场景**：获取 DOM 元素的引用、存储可变数据（不触发重新渲染）。

### 5. `useMemo`

- **功能**：用于缓存计算结果，优化性能，避免不必要的重复计算。
- **返回值**：缓存的值。
- **使用场景**：优化性能，避免在每次渲染时都执行昂贵的计算。

### 6. `useCallback`

- **功能**：用于缓存函数实例，避免函数在每次渲染时被重新创建。
- **返回值**：缓存的回调函数。
- **使用场景**：避免在子组件重新渲染时不必要的回调函数重建，优化性能。

### 7. `useReducer`

- **功能**：用于代替 `useState` 来管理复杂的状态逻辑，尤其是当状态变化依赖于先前状态时。
- **返回值**：当前状态和一个派发 action 的函数。
- **使用场景**：复杂的状态逻辑，类似于 Redux 中的 reducer 用法。

### 8. `useLayoutEffect`

- **功能**：与 `useEffect` 类似，但它会在 DOM 更新后同步执行副作用操作。
- **返回值**：无返回值。
- **使用场景**：需要在 DOM 更新后立即执行副作用，通常用于布局计算和样式更新。

### 9. `useImperativeHandle`

- **功能**：允许你在父组件中自定义对子组件的引用操作。
- **返回值**：返回一个对象，父组件通过 `ref` 可以访问该对象中的方法。
- **使用场景**：向父组件暴露子组件的某些实例方法或状态。

### 10. `useDebugValue`

- **功能**：用于在 React 开发工具中自定义显示 Hook 的调试信息。
- **返回值**：无返回值。
- **使用场景**：调试自定义 Hook 时，向 React 开发者工具显示特定的调试信息。

### 11. `useTransition`（React 18 引入）

- **功能**：用于标记一些更新是“过渡性”的，可以让 React 在处理这些更新时保持界面的响应性。
- **返回值**：一个状态值和标记该更新是否正在进行的函数。
- **使用场景**：用于优化性能，特别是在渲染大量数据时，避免阻塞主线程。

### 12. `useDeferredValue`（React 18 引入）

- **功能**：用于延迟某些状态的更新，直到浏览器空闲时再处理。
- **返回值**：返回一个延迟的值。
- **使用场景**：提高页面的响应性，减少复杂更新时的阻塞。

### 总结

React Hooks 使得在函数组件中管理状态、处理副作用等变得更加简便和高效。以下是常见的 React Hooks：

- **`useState`**：管理组件状态
- **`useEffect`**：处理副作用
- **`useContext`**：访问 Context 数据
- **`useRef`**：引用 DOM 或保存可变数据
- **`useMemo`**：缓存计算结果
- **`useCallback`**：缓存函数实例
- **`useReducer`**：管理复杂状态
- **`useLayoutEffect`**：同步执行副作用
- **`useImperativeHandle`**：自定义 ref 行为
- **`useDebugValue`**：调试 Hook
- **`useTransition`**、**`useDeferredValue`**：用于 React 18 的并发特性

这些 Hooks 提供了强大的功能和灵活性，有助于构建现代化的 React 应用。

## 7. 基于类的 React 组件和函数式 React 组件有什么区别？

React 支持两种定义组件的方式：基于类的组件（Class Components）和函数式组件（Function Components）。这两者有着不同的特点和用途，随着 React 16.8 引入 Hooks 后，函数式组件逐渐成为主流。

### 1. 语法与结构

| 特性             | 类组件 (Class Components)                                                  | 函数组件 (Function Components)                          |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| **定义方式**     | 使用 `class` 关键字定义，继承自 `React.Component`                          | 使用普通的 JavaScript 函数定义组件                      |
| **构造函数**     | 必须定义构造函数来初始化组件的 state 和绑定事件                            | 无需构造函数，直接在函数体内使用 Hooks 管理状态和副作用 |
| **生命周期方法** | 使用类中的生命周期方法，如 `componentDidMount`、`shouldComponentUpdate` 等 | 依赖 `useEffect` 和其他 Hooks 代替生命周期方法          |
| **状态管理**     | 使用 `this.state` 和 `this.setState` 来管理状态                            | 使用 `useState` Hook 来管理状态                         |
| **事件处理**     | 需要手动绑定 `this`，如 `this.handleClick`                                 | 自动绑定 `this`，无需额外操作                           |

### 2. 状态与副作用管理

- **类组件**：

  - 使用 `this.state` 管理组件状态，更新状态时使用 `this.setState`。
  - 使用生命周期方法来处理副作用，如 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 等。

- **函数组件**：

  - 使用 `useState` Hook 来管理状态。
  - 使用 `useEffect` Hook 来处理副作用，替代了生命周期方法。

  在函数组件中，状态和副作用管理更加简洁和直观，通过 Hooks 可以更方便地在组件中复用逻辑。

### 3. 性能

- **类组件**：
  - 在更新时，React 会重新实例化类组件的实例，执行构造函数和生命周期方法，可能带来性能开销。
- **函数组件**：
  - 函数组件是无状态的（不依赖于 `this`），且不会重复实例化，因此通常会有更好的性能。
  - React 16.8 引入的 Hooks 允许函数组件拥有状态和副作用，从而使得它们在性能上不再逊色于类组件。

### 4. 可读性与简洁性

- **类组件**：
  - 类组件需要更多的样板代码，如构造函数、生命周期方法等，代码较为冗长。
  - 需要手动处理 `this` 的绑定，这对于初学者来说可能不太直观。
- **函数组件**：
  - 函数组件通常更简洁，尤其是结合 Hooks 后，代码更加直观。
  - 无需手动处理 `this`，使得代码更易于理解。

### 5. 使用场景与推荐

- **类组件**：

  - 早期 React 应用中主要使用类组件，至今在一些老旧代码库中仍然广泛使用。
  - 如果在需要使用传统生命周期方法的场景下，类组件可能更合适。

- **函数组件**：
  - React 16.8 后，函数组件成为了推荐的方式。通过 Hooks，函数组件可以更灵活地处理状态、副作用、上下文等。
  - 对于大部分新项目和现代 React 开发，函数组件是首选方式。

### 总结

- **类组件**：语法相对较复杂，依赖生命周期方法管理状态和副作用，需要手动绑定 `this`。
- **函数组件**：语法更简洁，使用 Hooks 来管理状态和副作用，不需要手动绑定 `this`，逐渐成为 React 中的主流选择。

React 现在更推崇函数组件，因为它简化了代码和逻辑，提供了更高的可维护性和性能。

## 8. React 中如何访问 DOM

引用是使用 `React.createRef()` 或 `useRef()` 钩子创建的，并通过 `ref` 属性附加到 React 元素上。通过访问创建的引用，我们可以使用 `ref.current` 访问 DOM 元素。

示例代码：

```javascript
const App = () => {
  const myRef = useRef(null);

  const handleClick = () => {
    console.log(myRef.current); // Accessing the DOM element
  };

  return (
    <div>
      <input type="text" ref={myRef} />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default App;
```

## 9. React 事件与 DOM 原生事件的差异

### React 合成事件

- **合成事件**：React 使用合成事件（Synthetic Events），这是一个跨浏览器包装器，标准化了事件对象和行为，提供一致的接口。

- \*\*事件委托：React 通过事件委托机制，将所有事件处理程序附加到根元素上，而不是每个子元素。这提高了性能和内存使用效率，特别是在有大量子元素的情况下。

- **统一接口**：合成事件为所有事件提供了统一的接口，消除了跨浏览器差异。

### 原生 DOM 事件

- **原生事件**：原生 DOM 事件是由浏览器直接触发的事件，每个事件处理程序直接附加到对应的 DOM 元素上。

- **事件处理**：每个元素都可以独立地处理自己的事件，这可能导致在复杂应用中存在大量事件处理程序，从而增加内存和性能开销。

- **跨浏览器差异**：原生 DOM 事件在不同浏览器中可能表现不同，开发者需要处理这些差异。

## 10.React hooks 解决了什么问题

- 让函数组件也能做类组件的事，有自己的状态，可以处理一些副作用，能获取 ref ，也能做数据缓存。
- 解决逻辑复用难的问题。
- 放弃面向对象编程，拥抱函数式编程。

## 11. React Fiber

### 什么是 fiber，fiber 解决了什么问题

在 React16 以前，React 更新是通过树的`深度优先遍历`完成的，遍历是不能中断的，当树的层级深就会产生栈的层级过深，页面渲染速度变慢的问题，为了解决这个问题引入了 fiber，React fiber 就是虚拟 DOM，它是一个`链表结构`，返回了 return、children、siblings，分别代表父 fiber，子 fiber 和兄弟 fiber，随时可中断

### Fiber 是纤程，比线程更精细，表示对渲染线程实现更精细的控制

实现增量渲染，增量渲染指的是把一个渲染任务分解为多个渲染任务，而后将其分散到多个帧里。增量渲染是为了实现任务的可中断、可恢复，并按优先级处理任务，从而达到更顺滑的用户体验

### Fiber 的可中断、可恢复怎么实现的

fiber 是协程，是比线程更小的单元，可以被人为中断和恢复，当 react 更新时间超过 1 帧时，会产生视觉卡顿的效果，因此我们可以通过 fiber 把浏览器渲染过程分段执行，每执行一会就让出主线程控制权，执行优先级更高的任务
fiber 是一个链表结构，它有三个指针，分别记录了当前节点的下一个兄弟节点，子节点，父节点。当遍历中断时，它是可以恢复的，只需要保留当前节点的索引，就能根据索引找到对应的节点

## 12. React 有哪几种渲染模式

React 提供了几种渲染模式，以优化性能并提升用户体验。以下是主要渲染模式及其开启方式：

### 1. 同步渲染（传统模式）

同步渲染是 React 的默认渲染模式。在此模式下，当组件的状态更新时，React 会同步进行渲染，确保每个状态更新在进行下一个更新前完成。虽然同步渲染简单且容易预测，但在复杂应用中可能会导致性能问题，尤其是状态频繁更新时。

### 2. 异步渲染（并发模式）

并发模式允许 React 将渲染任务拆分为多个较小的任务，并在不同时间片上执行，从而优化应用的响应性。长时间的渲染任务可以被暂停，并在稍后继续，以防止 UI 阻塞。并发模式使得 React 可以优先响应用户输入，提升复杂 UI 中的体验。

```jsx
import React from "react";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 3. 懒加载渲染（Lazy Rendering）

懒加载渲染允许 `React` 仅在需要时加载组件，减少初始加载的时间，提升首屏渲染速度。这通过 `React.lazy` 和 `Suspense` 配合使用实现，能够按需加载组件，避免不必要的文件加载。

```jsx
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;
```

## 13.setState 是同步还是异步的

`setState` 是一个异步方法，但是在 setTimeout/setInterval 等定时器里逃脱了 React 对它的掌控，变成了同步方法
实现机制类似于 vue 的$nextTick 和浏览器的事件循环机制，每个 `setState` 都会被 react 加入到任务队列，多次对同一个 state 使用 `setState` 只会返回最后一次的结果，因为它不是立刻就更新，而是先放在队列中，等时机成熟在执行批量更新。React18 以后，使用了 `createRoot` api 后，所有 `setState` 都是异步批量执行的

## 14. Redux 工作原理

![react_lifecycle](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/redux.png)

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

```

```
