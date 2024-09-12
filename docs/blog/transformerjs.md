---
highlight: ally-dark
theme: channing-cyan
---

# 在前端使用 Transformers.js

> 在浏览器里面也可以跑模型，无需服务端，如 demo 所示：
> ![chrome-capture-2024-9-13 (2).gif](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/transformerjs-demo.gif)更多 Demo 参考：[Transformers.js Demo Web Site](https://xenova.github.io/transformers.js/#demo)

### 简介

**Transformers.js** 是一个强大的 JavaScript 库，允许开发者直接在浏览器或 Node.js 环境中运行机器学习模型。这个库是 Hugging Face 的 Transformers 的 JavaScript 版本，基于 WebAssembly 和 ONNX 运行时，支持多种任务，如文本分类、问答系统和语言生成等。

通过 **Transformers.js**，你可以将最新的机器学习模型无缝集成到前端应用中，实现各种智能化功能，无需依赖外部服务器。这篇文章将介绍如何安装和使用 Transformers.js，并带你了解如何在浏览器中运行一个简单的 NLP 模型。

### Transformers.js 的优势有哪些？

1.  **无服务器端依赖**：所有的模型推理都是在客户端进行的，因此不需要服务器来运行模型。这有助于提高应用的响应速度，并减少对后端资源的依赖。
1.  **跨平台支持**：Transformers.js 适用于浏览器和 Node.js 环境，支持多种 JavaScript 运行时。
1.  **预训练模型**：Hugging Face 提供了丰富的预训练模型，可以直接使用，如 BERT、GPT、T5 等，方便你快速应用到不同的任务中。
1.  **WebAssembly 性能优化**：得益于 WebAssembly 的支持，Transformers.js 能够在浏览器中以接近原生的速度运行大型模型。

### 支持的任务类型

Transformers.js 的设计在功能上等同于 Hugging Face 的[Transformers](https://github.com/huggingface/transformers) Python 库，这意味着您可以使用非常相似的 API 运行相同的预训练模型。这些模型支持不同模式的常见任务，例如：

- 📝**自然语言处理**：文本分类、命名实体识别、问答、语言建模、摘要、翻译、多项选择和文本生成。
- 🖼️**计算机视觉**：图像分类、对象检测和分割。
- 🗣️**音频**：自动语音识别和音频分类。
- 🐙**多模态**：零样本图像分类。

### 基础使用的安装与设置

要开始使用 Transformers.js，你可以通过 npm 安装它：

```bash
$ npm install @xenova/transformers
```

或者在 HTML 文件中直接引入：

```html
<script type="module">
  import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers";
</script>
```

在引入库之后，你就可以开始加载和运行模型了。

> 在加载以及运行`task`和`model`,推荐使用 javascript `worker`, 因为`model`体积通常都比较大，可以放到`worker`里面去加载执行，以提高网页性能和交互体验。

### 基本用法

下面是一个简单的例子，演示如何加载预训练模型并在浏览器中执行文本分类任务。

#### 1. 加载模型和分词器

```javascript
// 导入库
import { pipeline } from "@xenova/transformers";

// 创建一个情感分析的 pipeline
const classifier = await pipeline(
  "sentiment-analysis",
  "Xenova/robertuito-sentiment-analysis"
);

// 执行情感分析
const result = await classifier("I love Transformers.js!");
console.log(result);
```

在上面的代码中，`pipeline` 方法帮助我们快速加载模型并执行指定的 NLP 任务。这里我们使用的是 Hugging Face 的 `sentiment-analysis`（情感分析）模型，对输入的文本进行情感分类。

> `pipeline` 方法接收三个参数，第一个就是`task`,第二个是`model`，一般是模型的 ID 或者是路径，第三个参数就是配置项

```javascript
 export async function pipeline(
    task,
    model = null,
    {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
        model_file_name = null,
    } = {}
)
```

#### 2. 浏览器中执行

如果你想在浏览器中执行，可以将上面的代码放入 HTML 文件的 `<script>` 标签中：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transformers.js Example</title>
  </head>
  <body>
    <h1>Transformers.js in Browser</h1>
    <script type="module">
      import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers';
        // 创建一个情感分析的 pipeline
        const classifier = await pipeline('sentiment-analysis'，'Xenova/robertuito-sentiment-analysis');
        // 执行情感分析
        const result = await classifier('I love Transformers.js!');
        console.log(result);
    </script>
  </body>
</html>
```

打开页面后，你将在控制台中看到情感分析的结果，类似于：

```json
[{ "label": "POS", "score": 0.8311682939529419 }]
```

> 打开页面执行` await pipeline('sentiment-analysis'，'Xenova/robertuito-sentiment-analysis')` 首先会去下载`model`,存储到缓存中，第二次打开页面就不会去下载了，等待模型下载完毕之后，就可以在浏览器中运行了

![image.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/transformerjs-demo-1.png)

![image.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/transformerjs-demo-2.png)

### 举例实现一个简单的物体检测

利用`task: object-detection`和`model:Xenova/detr-resnet-50` 来实现一个图片中的物体检测

1. 第一步加载`model`，缓存到本地中

```javascript
const downloadProgress = (progressData) => {
  const tempProgressMap = cloneDeep(downloadProgressMap.value);
  const name = progressData.file;

  if (progressData.status === "initiate") {
    tempProgressMap[name] = {
      progress: 0,
      status: progressData.status,
      name,
    };
  } else if (progressData.status === "download") {
    tempProgressMap[name] = {
      progress: 0,
      status: progressData.status,
      name,
    };
  } else if (progressData.status === "progress") {
    tempProgressMap[name] = {
      status: progressData.status,
      progress: Number(progressData.progress).toFixed(2) || 0,
      name,
    };
  } else if (progressData.status === "done") {
    tempProgressMap[name] = {
      status: progressData.status,
      progress: progressData.progress || 100,
      name,
    };
  }

  downloadProgressMap.value = tempProgressMap;
};

const downloadModel = async () => {
  detector.value = await pipeline("object-detection", "Xenova/detr-resnet-50", {
    progress_callback: downloadProgress,
  });
};

const generatorSvgRect = (items = []) => {
  svg.value.innerHTML = "";
  chartCanvas.value?.destroy();

  let viewbox = svg.value.viewBox.baseVal;

  let colours = [];
  let borderColours = [];

  for (let i = 0; i < items.length; ++i) {
    const box = items[i].box;

    let svgns = "http://www.w3.org/2000/svg";
    let rect = document.createElementNS(svgns, "rect");

    rect.setAttribute("x", viewbox.width * box.xmin);
    rect.setAttribute("y", viewbox.height * box.ymin);
    rect.setAttribute("width", viewbox.width * (box.xmax - box.xmin));
    rect.setAttribute("height", viewbox.height * (box.ymax - box.ymin));

    const colour = COLOURS[i % COLOURS.length];
    rect.style.stroke = `rgba(${colour}, 1)`;
    rect.style.fill = `rgba(${colour}, 0.1)`;

    colours.push(`rgba(${colour}, 0.5)`);
    borderColours.push(`rgba(${colour}, 1)`);
    svg.value?.appendChild(rect);
  }

  const chartData = {
    labels: items.map((x) => x.label),
    datasets: [
      {
        data: items.map((x) => x.score),
        backgroundColor: colours,
        borderColor: borderColours,
      },
    ],
  };

  chartCanvas.value = new Chart(canvas.value, {
    type: "bar",
    data: structuredClone(chartData),
    options: CHART_OPTIONS,
  });
  checkLoading.value = false;
};

onMounted(() => {
  downloadModel();
});
```

![chrome-capture-2024-9-13.gif](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/transformerjs-demo-3.gif)

2. 使用下载的`model`传入检测对象，输出检测结果：

```javascript
const parseImgByModel = async () => {
  checkLoading.value = true;
  isChecked.value = false;
  try {
    const items = await detector.value(getImageDataFromImage(img.value), {
      threshold: 0.9,
      percentage: true,
    });
    checkResult.value = items;
    generatorSvgRect(items);
    isChecked.value = true;
  } catch (e) {
    console.log("error:", e);
    checkLoading.value = false;
    isChecked.value = false;
  }
};
```

![chrome-capture-2024-9-13 (1).gif](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/transformerjs-demo-4.gif)

在控制台打印`items`，会得到类似下面的检测结果：

```json
[
  {
    "score": 0.999142050743103,
    "label": "zebra",
    "box": {
      "xmin": 0.6655174493789673,
      "ymin": 0.6905319392681122,
      "xmax": 0.7424403429031372,
      "ymax": 0.8798677027225494
    }
  },
  {
    "score": 0.9989916682243347,
    "label": "zebra",
    "box": {
      "xmin": 0.20152437686920166,
      "ymin": 0.656862810254097,
      "xmax": 0.43021059036254883,
      "ymax": 0.9027213305234909
    }
  },
  {
    "score": 0.8711901307106018,
    "label": "giraffe",
    "box": {
      "xmin": 0.004110679030418396,
      "ymin": 0.41190996766090393,
      "xmax": 0.40871627628803253,
      "ymax": 0.7098571956157684
    }
  },
  {
    "score": 0.943113386631012,
    "label": "giraffe",
    "box": {
      "xmin": 0.009957998991012573,
      "ymin": 0.40999987721443176,
      "xmax": 0.4076057970523834,
      "ymax": 0.7950896918773651
    }
  },
  {
    "score": 0.9353795647621155,
    "label": "giraffe",
    "box": {
      "xmin": 0.002116173505783081,
      "ymin": 0.515501081943512,
      "xmax": 0.2728206217288971,
      "ymax": 0.8136957287788391
    }
  },
  {
    "score": 0.9982846975326538,
    "label": "zebra",
    "box": {
      "xmin": 0.3438493311405182,
      "ymin": 0.639092743396759,
      "xmax": 0.5931173264980316,
      "ymax": 0.8505837321281433
    }
  },
  {
    "score": 0.9986143112182617,
    "label": "giraffe",
    "box": {
      "xmin": 0.6440882682800293,
      "ymin": 0.2601037323474884,
      "xmax": 1.0125010013580322,
      "ymax": 0.8650422990322113
    }
  }
]
```

`Vue` 组件 Demo 实现源码：

```html
<template>
  <h3>对象检测</h3>
  <el-row
    :gutter="20"
    v-for="progressItem in tempProgressList"
    :key="progressItem.name"
    style="height: 44px"
  >
    <el-col :span="4" style="line-height: 44px; text-align: left"
      ><span>{{ progressItem.name }}</span></el-col
    >
    <el-col :span="20">
      <div class="progress-bar">
        <el-progress
          size
          :percentage="Number(progressItem.progress)"
          :stroke-width="10"
          :status="
            progressItem.status === 'done' || progressItem.status === 'ready'
              ? 'success'
              : ''
          "
          :format="format"
        />
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="margin-top: 24px">
    <el-col :span="12">
      <div class="left-area">
        <img ref="img" src="/img/savanna.jpg" alt="" />
        <svg
          @mousemove="mousemoveHandle"
          ref="svg"
          preserveAspectRatio="none"
          viewBox="0 0 240 160"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </el-col>
    <el-col :span="12">
      <canvas ref="canvas" style="height: 350px"></canvas>
    </el-col>
  </el-row>
  <el-row style="margin-top: 140px; width: 100%"
    ><el-button
      type="primary"
      @click="parseImgByModel"
      :loading="checkLoading"
      :disabled="!isCanChecked"
      >检测结果</el-button
    ></el-row
  >
  <vue-json-pretty :data="checkResult" v-show="isChecked" />
</template>

<script setup name="HomeView">
  import VueJsonPretty from "vue-json-pretty";
  import "vue-json-pretty/lib/styles.css";
  import { computed, onMounted, ref } from "vue";
  import { pipeline } from "@xenova/transformers";
  import { Chart, registerables } from "chart.js";
  import { getImageDataFromImage } from "../utils";
  import { cloneDeep } from "lodash-es";

  Chart.register(...registerables);

  const format = (percentage) =>
    percentage === 100 ? "Done" : `${percentage}%`;

  const detector = ref();
  const img = ref();
  const svg = ref();
  const canvas = ref();
  const chartCanvas = ref();
  const downloadProgressMap = ref({});
  const checkLoading = ref(false);
  const checkResult = ref({});
  const isChecked = ref(false);

  const tempProgressList = computed(() => {
    return Object.keys(downloadProgressMap.value).map(
      (key) => downloadProgressMap.value[key]
    );
  });
  const isCanChecked = computed(() => {
    const list = Object.keys(downloadProgressMap.value).map(
      (key) => downloadProgressMap.value[key]
    );
    return list.every((item) => item.status === "done");
  });

  const COLOURS = [
    "255, 99, 132",
    "54, 162, 235",
    "255, 206, 86",
    "75, 192, 192",
    "153, 102, 255",
    "255, 159, 64",
  ];

  const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        min: 0,
        max: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        bottom: -5,
      },
    },
  };

  const downloadProgress = (progressData) => {
    const tempProgressMap = cloneDeep(downloadProgressMap.value);
    const name = progressData.file;

    if (progressData.status === "initiate") {
      tempProgressMap[name] = {
        progress: 0,
        status: progressData.status,
        name,
      };
    } else if (progressData.status === "download") {
      tempProgressMap[name] = {
        progress: 0,
        status: progressData.status,
        name,
      };
    } else if (progressData.status === "progress") {
      tempProgressMap[name] = {
        status: progressData.status,
        progress: Number(progressData.progress).toFixed(2) || 0,
        name,
      };
    } else if (progressData.status === "done") {
      tempProgressMap[name] = {
        status: progressData.status,
        progress: progressData.progress || 100,
        name,
      };
    }

    downloadProgressMap.value = tempProgressMap;
  };

  const downloadModel = async () => {
    detector.value = await pipeline(
      "object-detection",
      "Xenova/detr-resnet-50",
      {
        progress_callback: downloadProgress,
      }
    );
  };

  const generatorSvgRect = (items = []) => {
    svg.value.innerHTML = "";
    chartCanvas.value?.destroy();

    let viewbox = svg.value.viewBox.baseVal;

    let colours = [];
    let borderColours = [];

    for (let i = 0; i < items.length; ++i) {
      const box = items[i].box;

      let svgns = "http://www.w3.org/2000/svg";
      let rect = document.createElementNS(svgns, "rect");

      rect.setAttribute("x", viewbox.width * box.xmin);
      rect.setAttribute("y", viewbox.height * box.ymin);
      rect.setAttribute("width", viewbox.width * (box.xmax - box.xmin));
      rect.setAttribute("height", viewbox.height * (box.ymax - box.ymin));

      const colour = COLOURS[i % COLOURS.length];
      rect.style.stroke = `rgba(${colour}, 1)`;
      rect.style.fill = `rgba(${colour}, 0.1)`;

      colours.push(`rgba(${colour}, 0.5)`);
      borderColours.push(`rgba(${colour}, 1)`);
      svg.value?.appendChild(rect);
    }

    const chartData = {
      labels: items.map((x) => x.label),
      datasets: [
        {
          data: items.map((x) => x.score),
          backgroundColor: colours,
          borderColor: borderColours,
        },
      ],
    };

    chartCanvas.value = new Chart(canvas.value, {
      type: "bar",
      data: structuredClone(chartData),
      options: CHART_OPTIONS,
    });
    checkLoading.value = false;
  };

  const mousemoveHandle = (e) => {
    let rects = svg.value.querySelectorAll("rect");
    let colours = [];
    let borderColours = [];

    if (!rects.length) return;

    rects.forEach((rect, i) => {
      let colour = COLOURS[i % COLOURS.length];

      let toDisplay = e.target.tagName !== "rect";
      if (!toDisplay) {
        let bb = rect.getBoundingClientRect();
        toDisplay =
          e.clientX >= bb.left &&
          e.clientX <= bb.right &&
          e.clientY >= bb.top &&
          e.clientY <= bb.bottom;
      }

      if (toDisplay) {
        // Set back to original
        rect.style.fillOpacity = 0.1;
        rect.style.opacity = 1;
        colours.push(`rgba(${colour}, 0.5)`);
        borderColours.push(`rgba(${colour}, 1)`);
      } else {
        rect.style.fillOpacity = 0;
        rect.style.opacity = 0;
        colours.push(`rgba(${colour}, 0.05)`);
        borderColours.push(`rgba(${colour}, 0.5)`);
      }
    });

    chartCanvas.value.data.datasets[0].backgroundColor = colours;
    chartCanvas.value.data.datasets[0].borderColor = borderColours;
  };

  const parseImgByModel = async () => {
    checkLoading.value = true;
    isChecked.value = false;
    try {
      const items = await detector.value(getImageDataFromImage(img.value), {
        threshold: 0.9,
        percentage: true,
      });
      checkResult.value = items;
      generatorSvgRect(items);
      isChecked.value = true;
    } catch (e) {
      console.log("error:", e);
      checkLoading.value = false;
      isChecked.value = false;
    }
  };

  onMounted(() => {
    downloadModel();
  });
</script>

<style lang="scss" scoped>
  .progress-bar {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
    margin-bottom: 30px;
  }
  .left-area {
    position: relative;

    img,
    svg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 702px;
      height: 468px;
    }
    svg {
      z-index: 10;
    }
  }
</style>
```

或 index.html 源代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>Transformers.js Demo</title>
  </head>

  <body>
    <div class="contain-item">
      <div class="position-relative">
        <img
          id="od-viewer"
          class="w-100 h-100 p-4"
          src="./images/savanna.jpg"
          crossorigin="anonymous"
        />
        <svg
          id="od-overlay"
          preserveAspectRatio="none"
          class="position-absolute w-100 h-100 left-0 start-0 p-4"
          style="z-index: 1;"
          viewBox="0 0 240 160"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>

      <div class="col-lg-6 mt-lg-5" style="width: 560px">
        <canvas id="od-canvas" style="height:250px"></canvas>
      </div>
    </div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script type="module">
    import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

    const imgDom = document.getElementById("od-viewer");
    const svgDom = document.getElementById("od-overlay");
    const canvasDom = document.getElementById("od-canvas");

    const DEFAULT_DATA = {
      labels: ["label", "label", "label", "label", "label"],
      datasets: [
        {
          borderWidth: 1,
        },
      ],
    };

    const COLOURS = [
      "255, 99, 132",
      "54, 162, 235",
      "255, 206, 86",
      "75, 192, 192",
      "153, 102, 255",
      "255, 159, 64",
    ];

    const CHART_OPTIONS = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          min: 0,
          max: 1,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          bottom: -5,
        },
      },
    };

    const chart = new Chart(canvasDom, {
      type: "bar",
      data: structuredClone(DEFAULT_DATA),
      options: CHART_OPTIONS,
    });

    svgDom.addEventListener("mousemove", (e) => {
      let rects = svgDom.querySelectorAll("rect");
      let colours = [];
      let borderColours = [];

      rects.forEach((rect, i) => {
        let colour = COLOURS[i % COLOURS.length];

        // Display if hovering over background (tagName === 'svg')
        let toDisplay = e.target.tagName !== "rect";
        if (!toDisplay) {
          // Perform additional check
          let bb = rect.getBoundingClientRect();

          // Check if box intersects with current mouse positition
          toDisplay =
            e.clientX >= bb.left &&
            e.clientX <= bb.right &&
            e.clientY >= bb.top &&
            e.clientY <= bb.bottom;
        }

        if (toDisplay) {
          // Set back to original
          rect.style.fillOpacity = 0.1;
          rect.style.opacity = 1;
          colours.push(`rgba(${colour}, 0.5)`);
          borderColours.push(`rgba(${colour}, 1)`);
        } else {
          // Hovering over a rect, so set all other rects to 0 opacity
          rect.style.fillOpacity = 0;
          rect.style.opacity = 0;
          colours.push(`rgba(${colour}, 0.05)`);
          borderColours.push(`rgba(${colour}, 0.5)`);
        }
      });

      chart.data.datasets[0].backgroundColor = colours;
      chart.data.datasets[0].borderColor = borderColours;
      chart.update();
    });

    function formatBytes(bytes, decimals = 0) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) return "0 Bytes";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
      const rounded = (bytes / Math.pow(1000, i)).toFixed(decimals);
      return rounded + " " + sizes[i];
    }

    function getImageDataFromImage(original) {
      const canvas = document.createElement("canvas");
      canvas.width = original.naturalWidth;
      canvas.height = original.naturalHeight;

      const ctx = canvas.getContext("2d");
      // ctx.patternQuality = 'bilinear';
      // ctx.quality = 'bilinear';
      // ctx.antialias = 'default';
      // ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(original, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL();
    }

    const downloadProgress = (progress) => {
      // console.log("progress:", progress);
    };

    let detector = await pipeline("object-detection", "Xenova/detr-resnet-50", {
      progress_callback: downloadProgress,
    });

    const output = await detector(getImageDataFromImage(imgDom), {
      threshold: 0.9,
      percentage: true,
    });
    //----------------------------------------------
    console.log("output:", output);

    // Clear previous output, just in case
    svgDom.innerHTML = "";

    let viewbox = svgDom.viewBox.baseVal;

    let colours = [];
    let borderColours = [];

    let items = output;
    for (let i = 0; i < items.length; ++i) {
      const box = items[i].box;

      let svgns = "http://www.w3.org/2000/svg";
      let rect = document.createElementNS(svgns, "rect");

      rect.setAttribute("x", viewbox.width * box.xmin);
      rect.setAttribute("y", viewbox.height * box.ymin);
      rect.setAttribute("width", viewbox.width * (box.xmax - box.xmin));
      rect.setAttribute("height", viewbox.height * (box.ymax - box.ymin));

      const colour = COLOURS[i % COLOURS.length];
      rect.style.stroke = `rgba(${colour}, 1)`;
      rect.style.fill = `rgba(${colour}, 0.1)`;

      colours.push(`rgba(${colour}, 0.5)`);
      borderColours.push(`rgba(${colour}, 1)`);
      svgDom.appendChild(rect);
    }

    chart.data.labels = items.map((x) => x.label);
    chart.data.datasets[0] = {
      data: items.map((x) => x.score),
      backgroundColor: colours,
      borderColor: borderColours,
    };
    chart.update();
  </script>
</html>
```

> 以上只是举了一个简单的例子，更多的 Demo 示例见：[Transformers.js Deom Site](https://xenova.github.io/transformers.js/#demo)

### 查找可以使用的模型

打开[huggingface](https://huggingface.co/models?library=transformers.js&sort=trending&search=sentiment-analysis+) 网站，勾选`Transformers.js`标签，根据`task`类型来进一步搜索需要的`model`,常见的`task`如：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/77f84a57f0d2491e8d1fb6389444ddca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Y2X55Oc5biD5LiB:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzU0NDQ4MTIxODY5MzU5NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726261052&x-orig-sign=fVMVOwI3ljJD%2BBAxmKwvKg53MVM%3D)

| Task 任务                    | ID                                        | Description 描述                                     |
| ---------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Fill-Mask                    | fill-mask                                 | 屏蔽句子中的一些单词并预测哪些单词应该替换这些屏蔽。 |
| Question Answering           | question-answering                        | 从给定文本中检索问题的答案。                         |
| Sentence Similarity          | sentence-similarity                       | 确定两个文本的相似程度。                             |
| Summarization                | summarization                             | 生成文档的较短版本，同时保留其重要信息。             |
| Table Question Answering     | table-question-answering                  | 回答有关给定表中信息的问题。                         |
| Text Classification          | text-classification or sentiment-analysis | 为给定文本分配标签或类。                             |
| Text Generation              | text-generation                           | 通过预测序列中的下一个单词来生成新文本。             |
| Text-to-text Generation      | text2text-generation                      | 将一个文本序列转换为另一个文本序列。                 |
| Token Classification         | token-classification or ner               | 为文本中的每个标记分配标签。                         |
| Translation                  | translation                               | 将文本从一种语言转换为另一种语言。                   |
| Zero-Shot Classification     | zero-shot-classification                  | 将文本分类为训练期间看不到的类别。                   |
| Feature Extraction           | feature-extraction                        | 将原始数据转换为数字特征。                           |
| Depth Estimation             | depth-estimation                          | 预测图像中存在的对象的深度。                         |
| Image Classification         | image-classification                      | 为整个图像分配标签或类别。                           |
| Image Segmentation           | image-segmentation                        | 将图像划分为多个片段，其中每个像素都映射到一个对象。 |
| Image-to-Image               | image-to-image                            | 转换源图像以匹配目标图像的特征。                     |
| Mask Generation              | mask-generation                           | 为图像中的对象生成蒙版。                             |
| Object Detection             | object-detection                          | 识别图像中某些已定义类别的对象。                     |
| Image Feature Extraction     | image-feature-extraction                  | 将原始数据转换为数字特征，同时保留原始图像中的信息。 |
| Audio Classification         | audio-classification                      | 为给定音频分配标签或类别。                           |
| Automatic Speech Recognition | automatic-speech-recognition              | 将给定音频转录为文本。                               |
| Text-to-Speech               | text-to-speech or text-to-audio           | 根据文本输入生成听起来自然的语音。                   |

### 自定义模型

1. 你不仅可以使用 Hugging Face 提供的预训练模型，还可以加载自己训练的模型。将模型上传到 Hugging Face 的模型库后，你可以直接通过模型 ID 加载自定义模型。

```javascript
const customModel = await pipeline(
  "text-generation",
  "your-username/your-model-name"
);
```

2. 将您的模型转换为 ONNX
   建议使用官网推荐的[转换脚本](https://github.com/xenova/transformers.js/blob/main/scripts/convert.py)通过单个命令将 PyTorch、TensorFlow 或 JAX 模型转换为 ONNX。在幕后，它使用[🤗 Optimum](https://huggingface.co/docs/optimum)来执行模型的转换和量化

```bash
$ python -m scripts.convert --quantize --model_id <model_name_or_path>
```

### 使用场景

Transformers.js 在以下场景中具有很大的应用潜力：

1.  **智能搜索**：通过问答系统或关键词提取技术，增强网站的搜索功能。
1.  **自动翻译**：通过翻译模型实现即时的语言翻译，提升用户体验。
1.  **实时文本分析**：可以用于情感分析、话题分类，帮助用户分析输入文本。
1.  **聊天机器人**：结合生成模型，实现智能对话系统。

### 总结

**Transformers.js** 是一个非常实用的工具，帮助开发者轻松将前沿的 NLP 技术集成到前端应用中。它的无服务器、跨平台特性，加上 Hugging Face 提供的大量预训练模型，使得机器学习应用变得更加易于开发和部署。无论是情感分析、问答系统，还是文本生成，Transformers.js 都提供了简单易用的 API，助力开发者快速实现智能化功能。

通过本文的介绍，你可以开始尝试使用 Transformers.js 进行自然语言处理，感受前沿技术带来的便利。如果你想了解更多内容，建议查阅 Hugging Face 的官方文档以及 Transformers.js 的详细使用手册。

Happy coding with Transformers.js! 😊

---

**参考资料**：

- [Transformers.js GitHub](https://github.com/xenova/transformers)
- [Hugging Face 官方网站](https://huggingface.co/)
