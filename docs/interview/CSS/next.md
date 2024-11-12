---
title: CSS 面试基础知识(下篇)
tags: front interview
theme: solarized-dark
---

# CSS 面试基础知识(下篇)

### 1. 如何实现水平垂直居中？

1.  使用`text-align: center` 仅适用行内元素水平居中, 垂直高度可以使用`line-height`

2.  使用`position:absolute` + `margin: 负值` 适用定宽高

3.  使用`position:absolute` + `transform: translate(-50%, -50%)` 适用不定宽高

```css
.box {
  width: 300px;
  height: 300px;
  background: red;
  position: relative;
}

.inner {
  background: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 100px;
}
```

4. 使用`position:absolute` + `margin: auto` 适用定宽高

```css
.child {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

5. 使用 flex 布局，适用不定宽高

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

6. 使用 flex 布局，适用不定宽高

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

7. `table` 布局

```html
<div class="wp">
  <div class="box">123123</div>
</div>

<style>
  .wp {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .box {
    display: inline-block;
  }
</style>
```

8. `grid` 布局

```html
<div class="wp">
  <div class="box">123123</div>
</div>

<style>
  .wp {
    display: grid;
  }
  .box {
    align-self: center;
    justify-self: center;
  }
</style>
```

### 2. 如何实现三栏布局的实现？（左右固定宽度，中间自适应）

首先需要基础的`DOM`结构：

```html
<div class="page">
  <div class="left">left</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>
```

1. flex 布局（推荐）

```css
.page {
  display: flex;
  width: 100vw;
  height: 200px;
  background-color: red;
}

.left,
.right {
  width: 200px;
  background-color: aquamarine;
}

.center {
  flex: 1;
  background-color: goldenrod;
}
```

2. grid 布局

```css
.page {
  /* 使用网格布局 定义三列布局：两侧200px固定宽度，中间自适应 */
  display: grid;
  grid-template-columns: 200px auto 200px;
  width: 100vw;
  height: 200px;
  background-color: red;
}

.left,
.right {
  width: 200px;
  background-color: aquamarine;
}

.center {
  flex: 1;
  background-color: goldenrod;
}
```

3. 圣杯布局

- 中间内容 content 根据页面宽度变化而变化，将其设置为 100%，设置 page 的 padding 属性为 200px，使得页面左右两边流出 200px 大小的区域
- 将 left , right 设置为左浮动使其脱离文档流
- 这是 content 占据整个页面宽度，left,right 不得不被挤下来
- 给 left 设置 margin-left 属性为-200px 使得其向左移动 200px 占据右边部分，此时设置为相对定位再让- left 向左移动'100%'也就是 content 的宽度，此时的 left 则到页面的左部分
- 给 right 设置'margin-left'属性为负值使其进入到 content 中，再设置为相对定位右移至页面右部分

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>layout</title>
  </head>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    .page {
      height: 200px;
      padding: 0 200px;
    }

    .page > div {
      float: left;
    }

    .left,
    .right {
      width: 200px;
      background-color: aquamarine;
    }

    .left {
      margin-left: -200px;
      position: relative;
      left: -100%;
    }

    .right {
      margin-left: -200px;
      position: relative;
      right: -200px;
    }

    .center {
      width: 100%;
      background-color: goldenrod;
    }
  </style>

  <body>
    <div class="page">
      <div class="center">center</div>
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>
```

4. 双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .page {
        height: 200px;
      }

      .left,
      .right {
        height: 200px;
        width: 200px;
        background-color: green;
      }

      .page > div {
        float: left;
      }

      .content {
        width: 100%;
        height: 200px;
        background-color: #f04747;
      }

      .inner {
        margin: 0 200px;
        height: 100%;
      }

      .left {
        margin-left: -100%;
      }

      .right {
        margin-left: -200px;
      }
    </style>
  </head>

  <body>
    <div class="page">
      <div class="content">
        <div class="inner">主体内容</div>
      </div>
      <div class="left">广告位</div>
      <div class="right">广告位</div>
    </div>
  </body>
</html>
```

::: warning 区别：
在解决中间栏内容被覆盖时，圣杯布局是设置父元素的 padding 来空出中间内容，而双飞翼布局则是在内容栏在嵌套一个 div 放置主体内容设置 margin 来空出中间的位置。
:::

5. table 布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .page {
        width: 100%;
        height: 200px;
        display: table;
        table-layout: fixed;
      }

      .page > div {
        display: table-cell;
      }

      .left,
      .right {
        height: 200px;
        width: 200px;
        background-color: green;
      }

      .content {
        width: 100%;
        height: 200px;
        background: yellow;
      }
    </style>
  </head>

  <body>
    <div class="page">
      <div class="left">广告位</div>
      <div class="content">主体内容</div>
      <div class="right">广告位</div>
    </div>
  </body>
</html>
```

### 3. 详细的聊聊 flex 布局

Flexbox（弹性布局）是一种 CSS 布局模式，专为在页面中分配空间和对齐项目而设计，特别适用于响应式布局和不同屏幕尺寸的设备。

![flex.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/flex.png)

#### 1. Flex 容器属性

Flex 容器的属性主要用于定义容器本身的布局方式和子项的排列规则。

##### `display: flex;`

将一个元素设置为弹性容器，使其子元素成为弹性项目。

##### `flex-direction`

定义主轴方向，决定了子元素的排列方式。

- **`row`**：水平排列，从左到右。
- **`row-reverse`**：水平反转排列，从右到左。
- **`column`**：垂直排列，从上到下。
- **`column-reverse`**：垂直反转排列，从下到上。

##### `flex-wrap`

定义子元素是否换行。

- **`nowrap`**：不换行（默认）。
- **`wrap`**：自动换行。
- **`wrap-reverse`**：换行并反转。

##### `justify-content`

定义子元素在主轴（横向）上的对齐方式。

- **`flex-start`**：从主轴起点开始排列。
- **`flex-end`**：从主轴终点开始排列。
- **`center`**：居中对齐。
- **`space-between`**：两端对齐，项目之间间隔相等。
- **`space-around`**：项目两侧间隔相等。

##### `align-items`

定义子元素在交叉轴（纵向）上的对齐方式。

- **`flex-start`**：从交叉轴起点开始。
- **`flex-end`**：从交叉轴终点开始。
- **`center`**：居中对齐。
- **`baseline`**：基线对齐。
- **`stretch`**：子元素拉伸填满容器（默认）。

##### `align-content`

定义多行内容在交叉轴上的对齐方式，仅当项目换行时有效。
![flex_align_content.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/flex_align_content.png)

- **`flex-start`**：从交叉轴起点对齐。
- **`flex-end`**：从交叉轴终点对齐。
- **`center`**：交叉轴居中对齐。
- **`space-between`**：项目间距相等，两端对齐。
- **`space-around`**：项目两侧间距相等。
- **`stretch`**：项目拉伸填满交叉轴。

##### 2. Flex 项目属性

Flex 项目的属性用于控制每个子元素在弹性布局中的行为。

##### `flex-grow`

定义项目的放大比例，值为正整数，默认为 `0`（不放大）。

##### `flex-shrink`

定义项目的缩小比例，值为正整数，默认为 `1`（允许缩小）。当容器空间不足时，项目会按照该属性值的比例缩小。

##### `flex-basis`

定义项目的初始大小，可以为具体长度（px、%等）或 `auto`（内容大小）。

##### `order`

定义项目的展示顺序，定义的越大越排在后面。

##### `flex`

是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的简写，用法：`flex: <flex-grow> <flex-shrink> <flex-basis>;`

##### `align-self`

允许单个项目在交叉轴上独立对齐，覆盖 `align-items` 的设定。可选值与 `align-items` 一致。

### 4. 如何用 CSS 实现一个瀑布流

> 实现效果图：

![waterfall](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/interview/images/waterfall.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>实现瀑布流</title>
  </head>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    .page {
      width: 100vw;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
    }

    .column {
      width: 200px;

      display: flex;
      flex-direction: column;
    }

    .item {
      width: 200px;
      height: 100px;
      background-color: antiquewhite;
      border-radius: 16px;
      margin-bottom: 20px;
    }

    .item1 {
      height: 200px;
      background-color: aqua;
    }

    .item2 {
      height: 300px;
      background-color: blueviolet;
    }
  </style>

  <body>
    <div class="page">
      <div class="column">
        <div class="item"></div>
        <div class="item item1 "></div>
        <div class="item item2"></div>
        <div class="item item1 "></div>
        <div class="item item2"></div>
        <div class=" item item1 "></div>
        <div class=" item item1 "></div>
        <div class="item item2"></div>
        <div class=" item item1 "></div>
        <div class="item item2"></div>
        <div class=" item item1 "></div>
        <div class="item item2"></div>
        <div class=" item item1 "></div>
        <div class="item item2"></div>
        <div class=" item item1 "></div>
      </div>
      <div class="column">
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
      </div>

      <div class="column">
        <div class="item item2"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item item2"></div>
      </div>

      <div class="column">
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item item2"></div>
        <div class=" itemitem1 "></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
      </div>

      <div class="column">
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class="item"></div>
        <div class="item item2"></div>
        <div class="item"></div>
        <div class=" itemitem1 "></div>
        <div class=" itemitem1 "></div>
      </div>
    </div>
  </body>
</html>
```
