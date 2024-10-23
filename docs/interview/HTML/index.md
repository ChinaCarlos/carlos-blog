---
title: HTML 基础知识
tags: front interview
theme: solarized-dark
---

# HTML 面试常见面试题

### 1.什么是 DOCTYPE， 有何作用？

DOCTYPE 是 HTML 文档的第一行，告知浏览器使用哪种 HTML 版本进行渲染。常见的 DOCTYPE 有`<!DOCTYPE html>`, `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

`等，它的主要作用是：

触发标准模式：浏览器根据 DOCTYPE 来决定是否以标准模式或怪异模式（Quirks mode）渲染页面。标准模式下，浏览器会尽可能遵循 W3C 的标准规范。而在怪异模式中，浏览器会采用向后兼容的方式，模仿老旧浏览器的行为。

兼容性：使用正确的 DOCTYPE 可以避免页面在不同浏览器中出现布局和渲染差异，确保页面行为一致。

> 可以通过`document.compatMode`来获取是标准模式还是混杂怪异模式

### 2. 说说对 html 语义化的理解

HTML 标签的语义化，简单来说，就是用正确的标签做正确的事情，给某块内容用上一个最恰当最合适的标签，使页面有良好的结构，页面元素有含义，无论是谁都能看懂这块内容是什么。

语义化的优点如下：
在没有 CSS 样式情况下也能够让页面呈现出清晰的结构
有利于 SEO 和搜索引擎建立良好的沟通，有助于爬虫抓取更多的有效信息，爬虫是依赖于标签来确定上下文和各个关键字的权重
方便团队开发和维护，语义化更具可读性，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

### 3 .前端页面有哪三层构成，分别是什么？

构成：结构层、表示层、行为层

结构层（structural layer）
结构层类似于盖房子需要打地基以及房子的悬梁框架，它是由 HTML 超文本标记语言来创建的，也就是页面中的各种标签，在结构层中保存了用户可以看到的所有内容，比如说：一段文字、一张图片、一段视频等等

表示层（presentation layer）
表示层是由 CSS 负责创建，它的作用是如何显示有关内容，学名：层叠样式表，也就相当于装修房子，看你要什么风格的，田园的、中式的、地中海的，总之 CSS 都能办妥

行为层（behaviorlayer）
行为层表示网页内容跟用户之间产生交互性，简单来说就是用户操作了网页，网页给用户一个反馈，这是 JavaScript 和 DOM 主宰的领域

### 4. 行级元素和块级元素分别有哪些

常见的块级元素：`p`、`div`、`form`、`ul`、`li`、`ol`、`table`、`h1`、`h2`、`h3`、`h4`、`h5`、`h6`、`dl`、`dt`、`dd`

常见的行级元素：`span`、`a`、`img`、`button`、`input`、`select`

块级元素：
总是在新行上开始，就是每个块级元素独占一行，默认从上到下排列
宽度缺少时是它的容器的 100%，除非设置一个宽度
高度、行高以及外边距和内边距都是可以设置的
块级元素可以容纳其它行级元素和块级元素

行内元素：

和其它元素都会在一行显示
高、行高以及外边距和内边距可以设置
宽度就是文字或者图片的宽度，不能改变
行级元素只能容纳文本或者其它行内元素

使用行内元素需要注意的是：

行内元素设置宽度 `width` 无效
行内元素设置 `height` 无效，但是可以通过 `line-height` 来设置
设置 `margin` 只有左右有效，上下无效
设置 `padding` 只有左右有效，上下无效

### 5. H5 有哪些新元素和新特性

HTML5 主要是关于图像、位置、存储、多任务等功能的增加：

- 语义化标签，如：`article`、`footer`、`header`、`nav` 等
- 视频 `video`、音频 `audio`
- 画布 `canvas`
- 表单控件，`phone`、`date`、`time`、`email`
- 地理
- 本地离线存储，`localStorage` 长期存储数据，浏览器关闭后数据不丢失，`sessionStorage` 的数据在浏览器关闭后自动删除
- 拖拽释放

##### 如何利用 canvas 进行绘制

```html
<canvas id="myCanvas" width="200" height="200"></canvas>
<script>
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(50, 50, 100, 100);
</script>
```

1. 绘制路径相关的 API
   这些 API 用于绘制线条、形状等路径。
   - beginPath()：开始创建路径，或重置当前路径。
   - moveTo(x, y)：将画笔移动到指定坐标 (x, y)。
   - lineTo(x, y)：从当前点绘制一条线段到指定的 (x, y)。
   - closePath()：通过绘制一条直线回到当前子路径的起点。
   - stroke()：根据当前的画笔样式，描边当前路径。
   - fill()：根据当前的填充样式，填充当前路径。
2. 绘制矩形相关的 API
   用于绘制矩形。

- rect(x, y, width, height)：创建一个矩形的路径。
- fillRect(x, y, width, height)：绘制一个填充的矩形。
- strokeRect(x, y, width, height)：绘制一个矩形的边框。
- clearRect(x, y, width, height)：清除指定矩形区域的内容，将该区域设置为透明。

3. 绘制圆形/弧线的 API
   用于绘制圆形或弧形。

- arc(x, y, radius, startAngle, endAngle, anticlockwise)：绘制圆弧或圆。

- x 和 y：圆心的坐标。
  radius：圆的半径。
  startAngle 和 endAngle：以弧度为单位的起始和结束角度。
  anticlockwise：是否逆时针绘制，默认是 false（顺时针）。
  arcTo(x1, y1, x2, y2, radius)：绘制两条线的连接处，并使用指定半径绘制圆角。

4. 样式与颜色
   用于设置描边和填充样式。

- fillStyle：设置填充颜色或样式（可以是颜色、渐变或图案）。
- strokeStyle：设置描边颜色或样式。
- lineWidth：设置线条宽度。
- lineCap：设置线条末端的样式（butt，round，square）。
- lineJoin：设置两条线相交时的拐角样式（round，bevel，miter）。
- setLineDash(segments)：设置虚线的线段样式。
- getLineDash()：返回当前虚线的设置。
- lineDashOffset：设置虚线的起始偏移量。

5. 文本
   用于在画布上绘制文本。

- fillText(text, x, y, maxWidth)：在指定位置绘制填充文本。
- strokeText(text, x, y, maxWidth)：在指定位置绘制文本的描边。
- font：设置文本的字体样式。
- textAlign：设置文本的对齐方式（left，right，center，start，end）。
- textBaseline：设置文本的基线对齐方式（top，hanging，middle，alphabetic，ideographic，bottom）。
- measureText(text)：返回指定文本的宽度。

6. 渐变与图案
   用于创建渐变色和图案。

- createLinearGradient(x0, y0, x1, y1)：创建线性渐变。
- createRadialGradient(x0, y0, r0, x1, y1, r1)：创建放射性渐变。
- addColorStop(position, color)：为渐变添加颜色。
- createPattern(image, repetition)：用图像创建图案，repetition 可以是 repeat、repeat-x、repeat-y 或 no-repeat。

7. 变换
   用于对画布上的内容进行平移、缩放、旋转等操作。

- translate(x, y)：移动画布的原点到指定的 (x, y)。
- rotate(angle)：旋转画布，角度以弧度为单位。
- scale(x, y)：缩放画布。
- transform(a, b, c, d, e, f)：应用矩阵变换。
- setTransform(a, b, c, d, e, f)：重置当前的变换并应用新的变换矩阵。
- resetTransform()：重置当前的变换矩阵为单位矩阵。

8. 像素操作
   用于处理画布上的像素数据。

- createImageData(width, height)：创建一个新的空白图像数据对象。
- getImageData(x, y, width, height)：返回指定区域的图像数据。
- putImageData(imageData, x, y)：在画布上放置图像数据。
- drawImage(image, dx, dy)：将图像绘制到画布上。
- image 可以是 HTMLImageElement、HTMLVideoElement 或 HTMLCanvasElement。
- 还有其他重载方法，支持更多参数，用于控制图片的裁剪和缩放。 9. 状态保存与恢复
- 用于保存和恢复画布的状态（如样式、变换等）。

- save()：保存当前画布的状态。
- restore()：恢复之前保存的画布状态。 10. 其他 API
- clip()：创建从当前路径剪切的区域，后续的绘图操作只会影响这个区域。
- isPointInPath(x, y)：判断指定的坐标是否位于当前路径中。

### 6. script、script async 和 script defer 的区别

`<script>`不带任何属性时的作用。HTML 文件将被解析，直到遇到脚本文件，此时解析将停止并发出请求来获取文件（如果是外部文件）。然后脚本将在解析恢复之前执行。

`async`在 `HTML` 解析期间下载文件，并在下载完成后暂停 `HTML` 解析器来执行该文件。

`defer`在 `HTML` 解析期间下载文件，并且仅在解析器完成后才执行它。`defer`脚本也保证按照它们在文档中出现的顺序执行。

> `defer` 脚本执行要在`HTML`解析之后，`DOMContentLoaded`事件之前

![Script 执行图](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/script_run.png)

### 7. 为什么 script 不推荐放到 head 里面

1. head 标签中的 script 标签：

当浏览器解析 HTML 时，它会从上到下逐行读取代码。如果在 head 标签中放置 script 标签，浏览器会立即下载和执行该脚本，无论页面其余部分是否已加载完成。
这意味着 head 标签中的 script 标签可能会阻塞其他资源的加载，例如样式表、图像和后续的脚本。

2. body 标签中的 script 标签：

与 head 标签不同，body 标签中的 script 标签不会立即执行。浏览器会在加载并解析整个 HTML 文档后才开始执行 body 中的脚本。
这种延迟加载的方式有助于提高网站性能，因为其他资源可以同时下载并解析，而不会被脚本执行所阻塞。
延迟加载的优势在于非阻塞加载：当浏览器下载和执行 body 中的脚本时，其他资源的加载不会受到影响，从而提高了网站的整体性能。

### 8. onLoad 事件与 DOMContentLoaded 事件的区别

`onLoad`事件触发时机：onload 事件在整个页面及其所有资源（如图片、样式表、脚本、iframe 等）完全加载后才会触发。

使用场景：适用于依赖于页面所有外部资源（图片、视频、样式等）都加载完毕后执行的操作。例如，初始化需要所有页面资源都可用的功能，或统计页面完全加载的时间。

`DOMContentLoaded` 事件触发时机：DOMContentLoaded 事件会在 HTML 文档被完全解析且所有的 DOM 元素构建完毕后触发，但不等待外部资源（如图片、样式表、iframe 等）加载完成。

使用场景：适用于依赖于 DOM 结构的操作，但不依赖于其他外部资源的加载。例如，操作页面中的元素或为按钮添加事件监听器等，这时页面的 DOM 元素已经可供 JavaScript 操作，而无需等待所有资源的加载完成。

### 9. `meta` 标签都有哪些值具备哪些作用？

`<meta>` 标签用于在 HTML 文档的 `<head>` 部分提供有关页面的元数据。它不会直接影响页面的内容显示，但它的值会影响搜索引擎优化、浏览器行为、字符编码、视口设置等。不同的 `<meta>` 标签可以实现不同的功能，下面是常见的几类及其用途和适用场景：

```html
<!--字符集声明-->
<meta charset="UTF-8" />
<!-- 视口控制，移动端适配 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- 关键词 -->
<meta name="keywords" content="HTML, CSS, JavaScript" />
<!-- 页面描述 -->
<meta
  name="description"
  content="This is a brief description of the page content."
/>
<!-- 作者 -->
<meta name="author" content="John Doe" />
<!-- CSP 内容安全策略设置 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
<!-- 设置页面权重 -->
<meta name="robots" content="index, follow" />
```

### 10. src、href 、url 之间的区别

| 属性/术语 | 用途                                     | 适用标签                                              | 例子                                     |
| --------- | ---------------------------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `src`     | 指定媒体资源的地址，加载并显示或执行资源 | `<img>`, `<script>`, `<audio>`, `<video>`, `<iframe>` | `<img src="image.jpg">`                  |
| `href`    | 指定链接的目标 URL，通常用于导航超链接   | `<a>`, `<link>`                                       | `<a href="https://example.com">链接</a>` |
| `url`     | 表示资源的地址，通常作为值使用，概念性   | CSS 中使用                                            | `background-image: url('image.jpg');`    |

场景使用

- 使用 **`src`**：当需要加载和显示图像、脚本或其他多媒体资源时。
- 使用 **`href`**：当需要创建导航链接或引入外部资源（如 CSS 样式表）时。
- 使用 **`url`**：在 CSS 和其他上下文中指定资源地址时。

### 11. 为什么最好把 CSS 的 link 标签放在 head 之间？

把 `<link> `标签放在 `<head></head>` 之间是规范要求的内容。此外，这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

### 12. link 和 @import 的区别

- link 是 xhtml 标签，除了引入 css 外，还可以用来定义 RSS；@import 属于 css 范畴，只能加载 css
- link 引用 css 的时候，在页面载入时同时加载。 @import 需要页面完全加载完成后加载
- link 是 xhtml 标签，无兼容问题，@import 是 css2 提出来的，低版本的浏览器不支持
- link 支持 js 去控制 DOM 去改变样式，@import 不支持
