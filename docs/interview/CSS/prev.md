---
title: CSS 面试基础知识(上篇)
tags: front interview
theme: solarized-dark
---

# CSS 面试基础知识(上篇)

### 1. CSS 选择器以及优先级

| 选择器类型      | 示例            | 优先级权重 |
| --------------- | --------------- | ---------- |
| ID 选择器       | `#id`           | 100        |
| 类选择器        | `.classname`    | 10         |
| 属性选择器      | `a[ref="eee"]`  | 10         |
| 伪类选择器      | `li:last-child` | 10         |
| 标签/元素选择器 | `div`           | 1          |
| 伪元素选择器    | `li::after`     | 1          |
| 相邻兄弟选择器  | `h1 + p`        | 0          |
| 子选择器        | `ul > li`       | 0          |
| 后代选择器      | `li a`          | 0          |
| 通配符选择器    | `*`             | 0          |

1. **行内样式** >
2. **ID 选择器** >
3. **类选择器 / 伪类选择器 / 属性选择器** >
4. **类型选择器 / 伪元素选择器**

#### 详细说明：

- **行内样式** (`style` 属性)：优先级最高，总是覆盖外部样式表的规则。

  - 示例：`<p style="color: red;">`
  - 优先级：`(1, 0, 0, 0)`

- **ID 选择器**：优先级次高。

  - 示例：`#header {}`
  - 优先级：`(0, 1, 0, 0)`

- **类选择器 / 伪类选择器 / 属性选择器**：优先级次之。

  - 示例：`.nav {}` 或 `:hover` 或 `[type="text"]`
  - 优先级：`(0, 0, 1, 0)`

- **类型选择器 / 伪元素选择器**：优先级最低。
  - 示例：`div {}` 或 `p::before {}`
  - 优先级：`(0, 0, 0, 1)`

::: info 继承与浏览器默认样式：
优先级提升：`!important`

- 使用 `!important` 可以提高规则的优先级，即使优先级较低的选择器也会覆盖其他规则。
  - 示例：
    ```css
    p {
      color: blue !important;
    }
    .intro {
      color: green;
    }
    ```
    最终，`p` 的颜色为蓝色，因为 `!important` 提升了其优先级。
- 某些 CSS 属性（如 `color` 和 `font-family`）是可以继承的，子元素会继承父元素的这些样式。
- 浏览器默认样式（user agent stylesheets）优先级较低，通常会被用户定义的样式覆盖。
  :::

### 2. CSS 中可继承与不可继承属性有哪些

##### 一、无继承性的属性

- display：规定元素应该生成的框的类型
- 文本属性：

  - vertical-align：垂直文本对齐
  - text-decoration：规定添加到文本的装饰
  - text-shadow：文本阴影效果
  - white-space：空白符的处理
  - direction/writing-mode：设置文本的方向

- 盒子模型的属性：width、height、margin、border、padding
- 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
- 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after
- 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

##### 二、有继承性的属性

字体系列属性

- font-family：字体系列
- font-weight：字体的粗细
- font-size：字体的大小
- font-style：字体的风格

文本系列属性

- text-indent：文本缩进
- text-align：文本水平对齐
- line-height：行高
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）
- color：文本颜色

### 3. display 有哪些常用的值

| 类别     | 常见的 `display` 值                                    |
| -------- | ------------------------------------------------------ |
| 块级元素 | `block`, `inline-block`, `list-item`                   |
| 行内元素 | `inline`, `inline-block`, `inline-flex`, `inline-grid` |
| 弹性布局 | `flex`, `inline-flex`                                  |
| 网格布局 | `grid`, `inline-grid`                                  |
| 表格布局 | `table`, `table-row`, `table-cell`, `table-column`     |
| 隐藏     | `none`                                                 |
| 其他     | `contents`, `run-in`                                   |

### 4. 隐藏元素的方法有哪些

| 方法                                       | 是否占据空间 | 是否响应事件 | 适用场景                       |
| ------------------------------------------ | ------------ | ------------ | ------------------------------ |
| **`display: none`**                        | 否           | 否           | 完全隐藏元素，不影响布局       |
| **`visibility: hidden`**                   | 是           | 否           | 保留布局但隐藏内容             |
| **`opacity: 0`**                           | 是           | 是           | 保留布局并响应交互，元素不可见 |
| **`height: 0` + `overflow: hidden`**       | 是           | 是           | 折叠元素高度，适合动画         |
| **`position: absolute` + `left: -9999px`** | 否           | 是           | 将元素移出视口，依然保留交互   |
| **`clip` / `clip-path`**                   | 否           | 是           | 裁剪区域隐藏，适合无障碍场景   |
| **`transform: scale(0)`**                  | 是           | 是           | 使用缩放动画隐藏元素           |
| **`z-index: -1`**                          | 是           | 是           | 将元素隐藏到页面下层           |
| **`filter: opacity(0)`**                   | 是           | 是           | 使用滤镜隐藏，但保留布局       |
| **`aria-hidden="true"`**                   | 否           | 否           | 仅在屏幕阅读器中隐藏           |

##### 各种方法的说明

1. **`display: none`**：完全从文档流中移除元素，元素不会占据任何空间。
2. **`visibility: hidden`**：元素不可见但仍占据布局空间，常用于保留页面结构。
3. **`opacity: 0`**：元素不可见，但仍参与布局和交互，常用于过渡效果。
4. **`height: 0` + `overflow: hidden`**：通过减少高度隐藏元素，适用于内容折叠动画。
5. **`position: absolute` + `left: -9999px`**：将元素移到视口之外，适合保留可访问性但隐藏元素。
6. **`clip` / `clip-path`**：裁剪元素使其不可见，通常用于视觉上隐藏元素但仍保留屏幕阅读器可读性。
7. **`transform: scale(0)`**：通过缩放隐藏元素，适合动画效果。
8. **`z-index: -1`**：将元素放到其他元素的下层，仍参与布局。
9. **`filter: opacity(0)`**：使用滤镜将元素透明度设置为 0，类似 `opacity: 0`。
10. **`aria-hidden="true"`**：屏幕阅读器忽略元素，常用于无障碍设计。

### 5. `transition` 与 `animation` 的区别

| 特性           | `transition`                                  | `animation`                                    |
| -------------- | --------------------------------------------- | ---------------------------------------------- |
| **触发方式**   | 需要事件触发（如：`hover`、`focus`、`click`） | 可以自动运行，无需用户交互                     |
| **控制步骤**   | 只能定义开始状态和结束状态                    | 可以定义多个关键帧（`keyframes`）              |
| **重复次数**   | 一次（由事件触发，过渡完成后停止）            | 可以通过 `animation-iteration-count` 设置多次  |
| **时间控制**   | 通过 `transition-duration` 定义过渡时间       | 通过 `animation-duration` 设置动画时长         |
| **延迟**       | 通过 `transition-delay` 设置过渡延迟          | 通过 `animation-delay` 设置动画延迟            |
| **属性控制**   | 仅能作用于指定的属性                          | 可以作用于多个属性，同时支持不同的时间、节奏   |
| **暂停与继续** | 不能暂停或继续                                | 可以通过 `animation-play-state` 控制暂停或继续 |
| **复杂性**     | 较简单，只能从一个状态过渡到另一个状态        | 可以创建复杂的多步骤动画                       |

### 6. 伪元素和伪类的区别和作用

常见伪类:

用于定义元素在特定状态下的样式。可以响应用户的交互或文档状态变化。

- **`:hover`**：当鼠标悬停在元素上时应用样式。
- **`:focus`**：当元素获得焦点时应用样式。
- **`:active`**：当元素被激活（点击）时应用样式。
- **`:nth-child(n)`**：选择父元素的第 n 个子元素。
- **`:first-child`** / **`:last-child`**：选择父元素的第一个或最后一个子元素。

常见伪元素:

用于创建和样式化元素的一部分或虚拟元素。不直接对应于 HTML 中的实际元素。

- `::before`：在元素内容之前插入内容。
- `::after`：在元素内容之后插入内容。
- `::first-line`：选择元素的第一行文本。
- `::first-letter`：选择元素的第一个字母。

### 7. 对 requestAnimationframe 的理解

实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供一个专门用于请求动画的 API，那就是 requestAnimationFrame，顾名思义就是请求动画帧。

:::info MDN 上的介绍
`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
:::

语法： `window.requestAnimationFrame(callback);` 其中，callback 是下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入 DOMHighResTimeStamp 参数，它表示 requestAnimationFrame() 开始去执行回调函数的时刻。该方法属于宏任务，所以会在执行完微任务之后再去执行。
取消动画： 使用 cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame 默认返回的 id，只需要传入这个 id 就可以取消动画了。

优势：

CPU 节能：使用 SetTinterval 实现的动画，当页面被隐藏或最小化时，SetTinterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 RequestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 RequestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。

函数节流：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

减少 DOM 操作：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。

setTimeout 执行动画的缺点：它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：

settimeout 任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；

settimeout 的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。

### 8. 谈谈对盒模型的理解

CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的，分别是 `margin`、`border`、`padding` 和 `content`。
标准盒模型和 IE 盒模型的区别在于设置`width` 和 `height` 时，所对应的范围不同：

标准盒模型的 `width` 和 `height` 属性的范围只包含了 `content`，
IE 盒模型的 `width` 和 `height` 属性的范围包含了 `border`r、`padding` 和 `content`。

可以通过修改元素的 `box-sizing` 属性来改变元素的盒模型：

`box-sizeing: content-box` 表示标准盒模型（默认值）
`box-sizeing: border-box` 表示 IE 盒模型（怪异盒模型）

### 9. 谈谈 CSS 中的定位都有哪些？

| 定位类型   | 特性                                                             | 影响                             | 使用场景               |
| ---------- | ---------------------------------------------------------------- | -------------------------------- | ---------------------- |
| `static`   | 默认值，按照文档流排列                                           | 保留在文档流中                   | 普通元素，无需特定定位 |
| `relative` | 相对自身原始位置偏移，使用 `top`、`right`、`bottom`、`left` 属性 | 保留在文档流中，影响其他元素布局 | 创建小的位移效果       |
| `absolute` | 相对最近的定位祖先元素定位                                       | 脱离文档流，不影响其他元素布局   | 精确控制位置的元素     |
| `fixed`    | 相对浏览器窗口定位，无论页面滚动位置                             | 脱离文档流，不影响其他元素布局   | 固定的导航栏、页脚等   |
| `sticky`   | 根据滚动阈值在相对和固定定位之间切换                             | 当达到阈值时，脱离文档流         | 粘性导航、标题等效果   |

### 10. 为什么有时候⽤ translate 来改变位置⽽不是定位？

`translate` 是 `transform` 属性的⼀个值。改变 `transform` 或 `opacity` 不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。transform 使浏览器为元素创建⼀个 `GPU 图层`，但改变绝对定位会使⽤到` CPU`。 因此 `translate()`更⾼效，可以缩短平滑动画的绘制时间。 ⽽ `translate` 改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。

### 11. CSS3 中有哪些新特性

- 新增各种 CSS 选择器 （: not(.input)：所有 class 不是“input”的节点）
- 圆角 （border-radius:8px）
- 多列布局 （multi-column layout）
- 阴影和反射 （Shadoweflect）
- 文字特效 （text-shadow）
- 文字渲染 （Text-decoration）
- 线性渐变 （gradient）
- 旋转 （transform）
- 增加了旋转,缩放,定位,倾斜,动画,多背景

### 12. 单行和多行文本溢出

单行文本溢出

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

多行文档溢出

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-box-line-clamp: 3;
text-overflow: ellipsis;
```

### 13. 对媒体查询的理解？

媒体查询由⼀个可选的媒体类型和零个或多个使⽤媒体功能的限制了样式表范围的表达式组成，例如宽度、⾼度和颜⾊。媒体查询，添加⾃ CSS3，允许内容的呈现针对⼀个特定范围的输出设备⽽进⾏裁剪，⽽不必改变内容本身，适合 web ⽹⻚应对不同型号的设备⽽做出对应的响应适配。
媒体查询包含⼀个可选的媒体类型和满⾜ CSS3 规范的条件下，包含零个或多个表达式，这些表达式描述了媒体特征，最终会被解析为 true 或 false。如果媒体查询中指定的媒体类型匹配展示⽂档所使⽤的设备类型，并且所有的表达式的值都是 true，那么该媒体查询的结果为 true。那么媒体查询内的样式将会⽣效。

简单来说，使用 @media 查询，可以针对不同的媒体类型定义不同的样式。@media 可以针对不同的屏幕尺寸设置不同的样式，特别是需要设置设计响应式的页面，@media 是非常有用的。当重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
<!-- 样式表中的CSS媒体查询 -->
<style>
  @media (max-width: 600px) {
    .facet_sidebar {
      display: none;
    }
  }
</style>
```

### 14. 如何判断元素是否到达可视区域

通过 JS 获取 CSS 属性

`window.innerHeight` 是浏览器可视区的高度；
`document.body.scrollTop` || `document.documentElement.scrollTop` 是浏览器滚动的过的距离；
imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）；
内容达到显示区域的：`img.offsetTop < window.innerHeight + document.body.scrollTop`;

使用 Intersection Observer API

> Intersection Observer 是一种更现代和高效的方法，用于异步观察元素与视口的交集。

```javascript
onst observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('元素在可视区域内');
            // 可以在这里执行其他操作，例如懒加载图片
        } else {
            console.log('元素不在可视区域内');
        }
    });
});

// 使用示例
const targetElement = document.querySelector('#myElement');
observer.observe(targetElement);
```

### 15. transform 有哪些属性？

| 属性                         | 描述                                                    | 示例                                          |
| ---------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| **`translate(x, y)`**        | 移动元素到指定的坐标。                                  | `transform: translate(50px, 100px);`          |
| **`scale(x, y)`**            | 缩放元素，`x` 和 `y` 分别表示水平和垂直方向的缩放比例。 | `transform: scale(2, 1.5);`                   |
| **`rotate(angle)`**          | 旋转元素，`angle` 为度数（deg）或弧度（rad）。          | `transform: rotate(45deg);`                   |
| **`skew(x-angle, y-angle)`** | 倾斜元素，`x-angle` 和 `y-angle` 表示倾斜角度。         | `transform: skew(30deg, 20deg);`              |
| **`translate3d(x, y, z)`**   | 在三维空间中移动元素。                                  | `transform: translate3d(50px, 100px, 200px);` |
| **`scale3d(x, y, z)`**       | 在三维空间中缩放元素。                                  | `transform: scale3d(1, 2, 1);`                |
| **`rotateX(angle)`**         | 围绕 x 轴旋转元素。                                     | `transform: rotateX(45deg);`                  |
| **`rotateY(angle)`**         | 围绕 y 轴旋转元素。                                     | `transform: rotateY(45deg);`                  |
| **`rotateZ(angle)`**         | 围绕 z 轴旋转元素（等同于 `rotate(angle)`）。           | `transform: rotateZ(45deg);`                  |
| **`perspective(value)`**     | 为 3D 转换设置透视效果。                                | `transform: perspective(500px);`              |
| **`transform-origin`**       | 设置变换的基点，默认为元素的中心。                      | `transform-origin: top left;`                 |

### 16. CSS 里面都哪些单位？

#### 1. 绝对单位

| 单位 | 描述                                     | 示例               |
| ---- | ---------------------------------------- | ------------------ |
| `px` | 像素，最常用的绝对单位，表示屏幕上的点。 | `width: 100px;`    |
| `pt` | 磅，主要用于打印，1pt = 1/72 英寸。      | `font-size: 12pt;` |
| `in` | 英寸，1in = 2.54 厘米。                  | `width: 2in;`      |
| `cm` | 厘米，1cm = 10mm。                       | `margin: 2cm;`     |
| `mm` | 毫米，1cm = 10mm。                       | `padding: 5mm;`    |

#### 2. 相对单位

| 单位   | 描述                                             | 示例                 |
| ------ | ------------------------------------------------ | -------------------- |
| `em`   | 相对于当前元素的字体大小，1em 等于当前字体大小。 | `font-size: 2em;`    |
| `rem`  | 相对于根元素（`<html>`）的字体大小。             | `font-size: 1.5rem;` |
| `%`    | 相对于父元素的大小。                             | `width: 50%;`        |
| `vw`   | 视口宽度的百分比，1vw = 1% 的视口宽度。          | `width: 50vw;`       |
| `vh`   | 视口高度的百分比，1vh = 1% 的视口高度。          | `height: 50vh;`      |
| `vmin` | 视口宽度和高度中较小的那个的百分比。             | `font-size: 5vmin;`  |
| `vmax` | 视口宽度和高度中较大的那个的百分比。             | `font-size: 5vmax;`  |

#### 3. 其他单位

| 单位 | 描述                                          | 示例                              |
| ---- | --------------------------------------------- | --------------------------------- |
| `ch` | 字符单位，表示数字 "0" 的宽度，通常用于排版。 | `width: 10ch;`                    |
| `ex` | 字体的 x-height 高度，通常用于排版。          | `line-height: 2ex;`               |
| `fr` | 在 CSS Grid 布局中，表示可用空间的分配份额。  | `grid-template-columns: 1fr 2fr;` |

### 17. CSS BFC 的理解

BFC 是一种独立的布局环境，内部元素的布局不会影响外部元素，反之亦然。它主要用于控制元素的布局和处理元素之间的关系。

#### BFC 的形成条件

| 形成方式          | 描述                                                                                                       | 示例                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------- |
| **根元素**        | 文档的根元素（通常是 `<html>`）。                                                                          |                        |
| **浮动元素**      | 设置了 `float` 属性的元素。                                                                                | `float: left;`         |
| **绝对定位元素**  | 设置了 `position` 属性为 `absolute` 或 `fixed` 的元素。                                                    | `position: absolute;`  |
| **表格单元格**    | 使用 `display: table`、`display: table-cell` 或 `display: table-caption` 或`inline-block`, `flex` 的元素。 | `display: table-cell;` |
| **overflow 属性** | 设置 `overflow` 属性为 `hidden`、`scroll` 或 `auto` 的块级元素。                                           | `overflow: hidden;`    |

#### BFC 的特性

- **独立布局**：BFC 内部的元素不会影响外部元素的布局。
- **清除浮动**：BFC 可以包含内部浮动元素，避免外部元素因浮动而被压缩。
- **边距合并**：BFC 可以避免垂直边距合并（margin collapsing）现象。
- **定位**：在 BFC 内部的元素可以使用 `position` 属性进行定位，而不会影响外部元素。

#### BFC 的使用场景

1. **清除浮动**：

   - 使用 BFC 使包含浮动元素的父元素能够自适应高度。
   - 示例：`overflow: hidden;`

2. **避免边距合并**：

   - 通过 BFC 避免子元素之间的边距合并，确保边距正确显示。
   - 示例：`overflow: auto;`

3. **控制元素的布局**：

   - 通过设置 BFC 精确控制复杂布局，避免意外的重叠和排版问题。
   - 示例：`display: flex;`

4. **实现响应式设计**：
   - 使用 BFC 帮助实现灵活的响应式设计，确保元素在不同屏幕尺寸下正常显示。

### 18. 什么是 margin 重叠问题？如何解决？

问题描述：
两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。重叠只会出现在垂直方向。
计算原则：
折叠合并后外边距的计算原则如下：

- 如果两者都是正数，那么就去最大者
- 如果是一正一负，就会正值减去负值的绝对值
- 两个都是负值时，用 0 减去两个中绝对值大的那个

解决办法：
对于折叠的情况，主要有两种：兄弟之间重叠和父子之间重叠
（1）兄弟之间重叠

- 底部元素变为行内盒子：display: inline-block
- 底部元素设置浮动：float
- 底部元素的 position 的值为 absolute/fixed

（2）父子之间重叠

- 父元素加入：overflow: hidden
- 父元素添加透明边框：border:1px solid transparent
- 子元素变为行内盒子：display: inline-block
- 子元素加入浮动属性或定位

### 19. 画一条 0.5px 的线

采用 `transform: scale()`的方式，该方法用来定义元素的 2D 缩放转换：

```css
transform: scale(0.5, 0.5);
```

采用 `meta viewport` 的方式

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"
/>
```

### 20. 设置小于 12px 的字体

1. 使用`-webkit-text-size-adjust`属性，添加该属性之后字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以高版本 chrome 谷歌浏览器已经不再支持-webkit-text-size-adjust 样式，所以要使用时候慎用

2. 使用 css3 的 transform 缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block/inline-block/...；

3. 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

### 21. 如何解决 1px 问题？

1. 用图片

2. 使用伪元素先放大后缩小

> 这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。
> 思路是先放大、后缩小：在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border 值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果。

```css
#container[data-device="2"] {
  position: relative;
}
#container[data-device="2"]::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  content: "";
  transform: scale(0.5);
  transform-origin: left top;
  box-sizing: border-box;
  border: 1px solid #333;
}
```

3. 利用 `meta viewport` 标签属性来实现

```html
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
<!-- 利用script来做 -->
<script>
  const scale = 1 / window.devicePixelRatio;
  // 这里 metaEl 指的是 meta 标签对应的 Dom
  metaEl.setAttribute(
    "content",
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
  );
</script>
```
