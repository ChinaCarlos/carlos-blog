---
title: 如何编写自定义ESlint Rules
---

![eslint-rules](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/eslint-rules.png)
# 如何编写自定义ESlint Rules

> 本文档主要介绍如何编写一个自定义ESlint Rule，以及如何使用ESlint的API来编写一个自定义ESlint Rule。



## 1. 什么是 ESLint？

### 1.1 `ESLint` 的定义
`ESLint` 是一个 **可扩展的 JavaScript 静态代码分析工具**，用于识别和报告代码中的问题，帮助开发者写出更高质量的代码。

### 1.2 `ESLint` 的作用
#### 提高代码质量
- 避免常见的语法错误，例如未定义的变量、意外的全局变量等。
- 检查代码是否符合团队的代码规范（如 Airbnb、Standard）。

#### 保持代码一致性
- 通过自定义规则确保代码风格一致，提升代码可读性和可维护性。

#### 促进开发效率
- 通过自动修复部分问题，减少手动修改的工作量。
- 提前发现潜在的 Bug，降低后期调试和维护成本。


## 2. `ESLint` 解决了哪些问题？

### 2.1 编码错误检测

- 例如检测未定义的变量，或意外的全局变量，避免潜在的 Bug。

```javascript
// 使用未定义的变量
console.log(undeclaredVariable); // ESLint: 'undeclaredVariable' is not defined.
```

### 2.2 代码风格一致性

- 例如避免使用不符合规范的语法，如不允许使用 `var` 声明变量。

```javascript
// 不符合风格要求的代码
var x = 10; // ESLint: Unexpected var, use let or const instead.
```

### 2.3 最佳实践指导

- 提醒开发者遵循更安全、性能更高的编程方式，如使用严格相等 `===` 而非宽松相等 `==`。

```javascript
// 不推荐的代码
if (value == 0) {
  // ESLint: Expected '===' and instead saw '=='.
}
```

### 2.4 团队协作的规范化
- 确保不同开发者的代码风格一致，减少代码审查中的争议和不必要的修改。


```javascript
// 统一团队代码风格
function myFunction() {
  // Function code
} 
// ESLint: Unexpected function declaration, use arrow function instead.
```


## 3. `ESLint Rules` 的工作原理

![eslint-rules-ast](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/eslint-run.png)

### 3.1 核心思想：基于 `AST（抽象语法树）分析代码`

`ESLint` 不直接操作代码，而是通过 **解析代码生成抽象语法树（AST）**，然后逐一分析其中的节点，判断是否符合预设规则。

![eslint-rules-exec](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/eslint-rules-exec.png)

### 3.2  ESLint 的工作流程

#### 1. 读取源代码
ESLint 首先接受一段源代码作为输入，通常通过文件或代码字符串提供。

---

#### 2. 解析源代码为 AST（抽象语法树）
`ESLint` 使用解析器（默认是 [`Espree`](https://astexplorer.net/)）将源代码解析为抽象语法树（AST）。  
- `AST` 是源代码的结构化表示，包含了所有的语法节点。  
- `ESLint` 还支持其他解析器（如 `@babel/eslint-parser` 和 `typescript-eslint/parser`），用于处理现代 `JavaScript` 或 `TypeScript` 语法。

---

#### 3. 加载规则
根据 ESLint 配置文件（如 `.eslintrc.js`），加载需要应用的规则。  
- 规则分为内置规则、插件规则和自定义规则。  
- 每条规则定义了针对特定 AST 节点的检查逻辑。

---

#### 4. 规则执行
ESLint 遍历 AST 的每个节点，按照已加载的规则逐一检查。  
- 如果某个节点违反规则，会记录一条错误或警告。  
- 一些规则支持自动修复问题。

---

#### 5. 生成报告
将检查结果汇总生成报告，包含以下信息：  
- 违反的规则名称和描述。  
- 问题在代码中的位置（行号和列号）。  
- 问题的严重性（错误或警告）。

---

#### 6. （可选）修复问题
对于支持自动修复的规则，ESLint 可以根据规则建议对代码进行自动修复：  
- 使用 `--fix` 参数启用自动修复。  
- 只能修复问题的特定部分，无法解决所有问题。

---

通过这些步骤，ESLint 能高效地帮助开发者识别和解决代码问题，同时保持代码质量的一致性。

### 3.3 代码流程示例

> 为了更好的理解ESLint的运行机制，下面我们通过一个示例来演示ESLint Rules的运行流程。以遇到箭头函数时，报告信息为例。


::: code-group

```javascript [test.js]
const getName =() => {}
```


```javascript [arrow-function-hello-rule.js]
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "检测箭头函数并报告",
      category: "Best Practices",
      recommended: false
    },
    fixable: false,
    schema: [
      {
        type: "object",
        properties: {
          ignoreFiles: {
            type: "array",
            items: { type: "string" },
            default: []
          }
        },
        additionalProperties: false  // 禁止传入其他未定义的配置
      }
    ]
  },
  create(context) {
    const options = context.options[0] || {};
    const ignoreFiles = options.ignoreFiles || [];

    const filename = context.getFilename();
    if (ignoreFiles.some((file) => filename.includes(file))) {
      return {};
    }

    return {
      ArrowFunctionExpression(node) {
        context.report({
          node,
          message: "hello 箭头函数"
        });
      }
    };
  }
};

```

:::


#### 1. 首先ESlint 会读取`test.js`文件, 并解析为AST

[AST 解析Demo](https://astexplorer.net/#/gist/cffd4e1c4f01793b4c8b0b7047d99863/5163dd7fd4b25ecd7c21305bc49b16656513be25)

![ast-parse-demo.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/ast-parse-demo.png)



#### 2. 然后ESlint 会加载`arrow-function-hello-rule.js`文件并执行这个文件

- 监听器对象中，`meta` 字段定义了规则的元数据，包括规则类型、描述、类别、推荐性、是否支持自动修复等。
- 执行`arrow-function-hello-rule.js`文件时，会返回一个监听器对象，监听不同类型的AST节点。
- 监听器对象中，`create` 字段定义了规则逻辑并返回监听器对象，监听不同类型的AST节点。
- 监听器对象中，`context` 字段提供了与当前ESLint运行环境相关的信息，包含对规则运行时环境的访问。
- 在`create` 字段中，`ArrowFunctionExpression` 字段监听了箭头函数节点，当AST中出现箭头函数节点时，会执行`ArrowFunctionExpression` 这个函数里面的逻辑， 像我们这里就是`context.report()`方法，报告箭头函数。




#### 3. 对于`arrow-function-hello-rule.js`每个字段的含义

> 每个字段都有其特定的含义，下面我们逐一介绍每个字段的作用。按照eslint的规则文件内的结构，从上到下依次介绍。

##### `meta` 字段

###### `type`
- `"problem"`: 规则类型，表示规则会报告问题。
- `"suggestion"`: 规则类型，表示规则会给出建议。
- `"layout"`: 规则类型，表示规则检查代码布局。

###### `docs`
- **`description`**: 规则的简短描述。
- **`category`**: 规则所属类别，如 `"Possible Errors"`, `"Best Practices"`, `"Stylistic Issues"`, `"ECMAScript 6"` 等。
- **`recommended`**: 布尔值，是否推荐该规则。

###### `fixable`
- `"code"`: 支持自动修复代码。
- `"whitespace"`: 仅支持自动修复空白问题。
- `false`: 不支持自动修复。

###### `schema`
- **`type`**: 配置项类型，可为 `"object"`, `"array"`, `"string"`, `"boolean"` 等。
- **`properties`**: 对象类型的属性定义。
- **`items`**: 数组类型每项的定义。
- **`default`**: 默认值。
- **`additionalProperties`**: 是否允许配置项中有额外的未定义属性，`true` 允许，`false` 不允许。

##### `create` 字段

- **作用**: 定义规则逻辑并返回监听器对象，监听不同类型的AST节点。
- **节点类型**: 常见的有 `CallExpression`, `ArrowFunctionExpression`, `FunctionDeclaration` 等。

##### `context` 字段

- **作用**: 提供与当前ESLint运行环境相关的信息，包含对规则运行时环境的访问。
- **常用方法**：
  - **`context.report()`**: 用于报告违反规则的地方，可以指定位置、错误信息以及修复建议。
  - **`context.getFilename()`**: 获取当前正在被检查的文件的路径。
  - **`context.options`**: 获取外部传入的配置项，可以通过该字段访问用户在配置文件中设置的规则参数。
  - **`context.getSourceCode()`**: 获取当前文件的源代码对象。




## 4. 如何开发一个自定义ESlint Rules

> 回归正题，根据上面的介绍，我们知道了ESlint的运行机制，那么我们就可以开始开发一个自定义ESlint Rules了。本次我要开发一个规则，用来检测一个文件只能有一个React 组件，rule 名称： `single-component-per-file`

### 4.1 搭建项目

创建 `ESLint` `插件，ESLint` 推荐使用 `Yeoman generator`。首先需要安装 `Yeoman，安装命令如下：`

  ::: code-group

  ```sh [npm]
  npm install -g yo
  ```

  ```sh [pnpm]
  pnpm install -g yo
  ```

  ```sh [yarn]
  yarn add -g yo
  ```

  ```sh [bun]
  bun add -g yo
  ```
  :::

`Yeoman` 是一款通用的初始化工具，想要初始化 `ESLint` 插件，需要安装 `ESLint` 模板，安装命令如下：

  ::: code-group

  ```sh [npm]
  npm install -g  generator-eslint
  ```

  ```sh [pnpm]
  pnpm install -g  generator-eslint
  ```

  ```sh [yarn]
  yarn add -g  generator-eslint
  ```
  :::

 :::warning 提示： 
  运行全局安装的命令，需要使用`sudo`命令，否则会报错。
 :::


  接下来，新建一个目录，目录名字按照自己喜好就行，命令如下:

  ::: danger 注意：
   需要遵循eslint plugin的命名规范 一般是 `eslint-plugin-xxx`
  :::

  ```bash
  # 创建目录
  mkdir eslint-plugin-custom
  # 进入目录
  cd eslint-plugin-custom
  # 初始化项目
  yo eslint-plugin
  ```

  切换到上面新建的目录，执行`yo eslint:plugin`命令会进入交互界面，询问作者、插件名字等，输入如图所示的内容即可。

  ![eslint-plugin-create-dir.png](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/eslint-plugin-create-dir.png)

  ::: danger `npm install`如果提示权限报错：
   ```bash
   sudo chown -R 501:20 "/Users/carlos/.npm" 
   ```                                      
  :::

执行完之后，会生成一个`eslint-plugin-custom`的目录，目录结构如下：

```markdown
├── README.md               # 项目说明文档，包含项目介绍、安装步骤、使用方法等。
├── eslint.config.mjs        # ESLint 配置文件，定义项目的代码检查规则。等同`.eslintrc.js`
├── lib                      # 存放主要功能代码的目录
│   ├── index.js             # 项目的主代码文件，通常包含核心功能实现。
│   └── rules                # 存放自定义 ESLint 规则的目录。
├── package-lock.json        # 锁定依赖版本，确保项目依赖一致性。
├── package.json             # 项目的元数据文件，包含名称、版本、依赖等信息。
└── tests                    # 存放测试文件的目录
    └── lib
        └── rules            # 存放自定义 ESLint 规则测试文件的目录。
```





### 4.2 分析我们要编写的ESlint Rules的逻辑

首选要明确React 组件的定义申明方式有哪些：

```jsx
import React from 'react'

// 函数式组件：最常见的组件定义方式，返回 JSX。
const ComponentOne = () => {
  return <div>hello ComponentOne</div>
}

// 传统函数组件：使用传统的函数表达式来定义组件
const ComponentOneOther = function() {
  return <div>hello ComponentOneOther</div>
}

// 函数声明式组件：通过声明函数来创建组件
function ComponentTwo () {
  return <div>hello ComponentTwo</div>
}

// 类组件：通过继承 React.Component 来定义，适合需要生命周期方法的组件
class ComponentThree extends React.Component {
  render() {
     return <div>hello ComponentThree</div>
  }
}

// React.memo：用于优化渲染，避免不必要的重新渲染
const ComponentFour = React.memo(() => <div>Hello ComponentFour</div>);

// React.forwardRef：用于转发 ref，使组件可以接收到父组件传递的 ref
const ComponentFive = React.forwardRef((props, ref) => <div ref={ref}>Hello ComponentFive</div>);
```

通过检测一个文件中是否存在多个上述`React`组件，来判断一个文件是否符合规范。


### 4.3 看是如何解析React组件的

 - 在编写ESlint Rules时，需要遵循ESlint的规则文件的结构，按照ESlint的规则文件的结构来编写。
 - 查看`AST` 是如何解析各种申明React 组件的方式，可以参考： [各种 React组件AST解析](https://astexplorer.net/#/gist/53024029dea314276d9056f8f27cd2e5/f83e625dff5be8ba7ab52686e4ee290db923b742)

![react-component-ast](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/react-ast-parse.png)

:::: details 具体`AST`解析结果如下：
```json
{
  "type": "Program",
  "start": 0,
  "end": 572,
  "range": [
    0,
    572
  ],
  "body": [
    {
      "type": "ImportDeclaration",
      "start": 0,
      "end": 25,
      "range": [
        0,
        25
      ],
      "specifiers": [
        {
          "type": "ImportDefaultSpecifier",
          "start": 7,
          "end": 12,
          "range": [
            7,
            12
          ],
          "local": {
            "type": "Identifier",
            "start": 7,
            "end": 12,
            "range": [
              7,
              12
            ],
            "name": "React"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 18,
        "end": 25,
        "range": [
          18,
          25
        ],
        "value": "react",
        "raw": "'react'"
      }
    },
    {
      "type": "VariableDeclaration",
      "start": 28,
      "end": 97,
      "range": [
        28,
        97
      ],
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 34,
          "end": 97,
          "range": [
            34,
            97
          ],
          "id": {
            "type": "Identifier",
            "start": 34,
            "end": 46,
            "range": [
              34,
              46
            ],
            "name": "ComponentOne"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "start": 49,
            "end": 97,
            "range": [
              49,
              97
            ],
            "id": null,
            "expression": false,
            "generator": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 55,
              "end": 97,
              "range": [
                55,
                97
              ],
              "body": [
                {
                  "type": "ReturnStatement",
                  "start": 59,
                  "end": 95,
                  "range": [
                    59,
                    95
                  ],
                  "argument": {
                    "type": "JSXElement",
                    "start": 66,
                    "end": 95,
                    "range": [
                      66,
                      95
                    ],
                    "openingElement": {
                      "type": "JSXOpeningElement",
                      "start": 66,
                      "end": 71,
                      "range": [
                        66,
                        71
                      ],
                      "attributes": [],
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 67,
                        "end": 70,
                        "range": [
                          67,
                          70
                        ],
                        "name": "div"
                      },
                      "selfClosing": false
                    },
                    "closingElement": {
                      "type": "JSXClosingElement",
                      "start": 89,
                      "end": 95,
                      "range": [
                        89,
                        95
                      ],
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 91,
                        "end": 94,
                        "range": [
                          91,
                          94
                        ],
                        "name": "div"
                      }
                    },
                    "children": [
                      {
                        "type": "JSXText",
                        "start": 71,
                        "end": 89,
                        "range": [
                          71,
                          89
                        ],
                        "value": "hello ComponentOne",
                        "raw": "hello ComponentOne"
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "VariableDeclaration",
      "start": 100,
      "end": 184,
      "range": [
        100,
        184
      ],
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 106,
          "end": 184,
          "range": [
            106,
            184
          ],
          "id": {
            "type": "Identifier",
            "start": 106,
            "end": 123,
            "range": [
              106,
              123
            ],
            "name": "ComponentOneOther"
          },
          "init": {
            "type": "FunctionExpression",
            "start": 126,
            "end": 184,
            "range": [
              126,
              184
            ],
            "id": null,
            "expression": false,
            "generator": false,
            "async": false,
            "params": [],
            "body": {
              "type": "BlockStatement",
              "start": 137,
              "end": 184,
              "range": [
                137,
                184
              ],
              "body": [
                {
                  "type": "ReturnStatement",
                  "start": 141,
                  "end": 182,
                  "range": [
                    141,
                    182
                  ],
                  "argument": {
                    "type": "JSXElement",
                    "start": 148,
                    "end": 182,
                    "range": [
                      148,
                      182
                    ],
                    "openingElement": {
                      "type": "JSXOpeningElement",
                      "start": 148,
                      "end": 153,
                      "range": [
                        148,
                        153
                      ],
                      "attributes": [],
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 149,
                        "end": 152,
                        "range": [
                          149,
                          152
                        ],
                        "name": "div"
                      },
                      "selfClosing": false
                    },
                    "closingElement": {
                      "type": "JSXClosingElement",
                      "start": 176,
                      "end": 182,
                      "range": [
                        176,
                        182
                      ],
                      "name": {
                        "type": "JSXIdentifier",
                        "start": 178,
                        "end": 181,
                        "range": [
                          178,
                          181
                        ],
                        "name": "div"
                      }
                    },
                    "children": [
                      {
                        "type": "JSXText",
                        "start": 153,
                        "end": 176,
                        "range": [
                          153,
                          176
                        ],
                        "value": "hello ComponentOneOther",
                        "raw": "hello ComponentOneOther"
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "FunctionDeclaration",
      "start": 187,
      "end": 254,
      "range": [
        187,
        254
      ],
      "id": {
        "type": "Identifier",
        "start": 196,
        "end": 208,
        "range": [
          196,
          208
        ],
        "name": "ComponentTwo"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 212,
        "end": 254,
        "range": [
          212,
          254
        ],
        "body": [
          {
            "type": "ReturnStatement",
            "start": 216,
            "end": 252,
            "range": [
              216,
              252
            ],
            "argument": {
              "type": "JSXElement",
              "start": 223,
              "end": 252,
              "range": [
                223,
                252
              ],
              "openingElement": {
                "type": "JSXOpeningElement",
                "start": 223,
                "end": 228,
                "range": [
                  223,
                  228
                ],
                "attributes": [],
                "name": {
                  "type": "JSXIdentifier",
                  "start": 224,
                  "end": 227,
                  "range": [
                    224,
                    227
                  ],
                  "name": "div"
                },
                "selfClosing": false
              },
              "closingElement": {
                "type": "JSXClosingElement",
                "start": 246,
                "end": 252,
                "range": [
                  246,
                  252
                ],
                "name": {
                  "type": "JSXIdentifier",
                  "start": 248,
                  "end": 251,
                  "range": [
                    248,
                    251
                  ],
                  "name": "div"
                }
              },
              "children": [
                {
                  "type": "JSXText",
                  "start": 228,
                  "end": 246,
                  "range": [
                    228,
                    246
                  ],
                  "value": "hello ComponentTwo",
                  "raw": "hello ComponentTwo"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "ClassDeclaration",
      "start": 257,
      "end": 367,
      "range": [
        257,
        367
      ],
      "id": {
        "type": "Identifier",
        "start": 263,
        "end": 277,
        "range": [
          263,
          277
        ],
        "name": "ComponentThree"
      },
      "superClass": {
        "type": "MemberExpression",
        "start": 286,
        "end": 301,
        "range": [
          286,
          301
        ],
        "object": {
          "type": "Identifier",
          "start": 286,
          "end": 291,
          "range": [
            286,
            291
          ],
          "name": "React"
        },
        "property": {
          "type": "Identifier",
          "start": 292,
          "end": 301,
          "range": [
            292,
            301
          ],
          "name": "Component"
        },
        "computed": false,
        "optional": false
      },
      "body": {
        "type": "ClassBody",
        "start": 302,
        "end": 367,
        "range": [
          302,
          367
        ],
        "body": [
          {
            "type": "MethodDefinition",
            "start": 307,
            "end": 365,
            "range": [
              307,
              365
            ],
            "static": false,
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 307,
              "end": 313,
              "range": [
                307,
                313
              ],
              "name": "render"
            },
            "kind": "method",
            "value": {
              "type": "FunctionExpression",
              "start": 313,
              "end": 365,
              "range": [
                313,
                365
              ],
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 316,
                "end": 365,
                "range": [
                  316,
                  365
                ],
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 323,
                    "end": 361,
                    "range": [
                      323,
                      361
                    ],
                    "argument": {
                      "type": "JSXElement",
                      "start": 330,
                      "end": 361,
                      "range": [
                        330,
                        361
                      ],
                      "openingElement": {
                        "type": "JSXOpeningElement",
                        "start": 330,
                        "end": 335,
                        "range": [
                          330,
                          335
                        ],
                        "attributes": [],
                        "name": {
                          "type": "JSXIdentifier",
                          "start": 331,
                          "end": 334,
                          "range": [
                            331,
                            334
                          ],
                          "name": "div"
                        },
                        "selfClosing": false
                      },
                      "closingElement": {
                        "type": "JSXClosingElement",
                        "start": 355,
                        "end": 361,
                        "range": [
                          355,
                          361
                        ],
                        "name": {
                          "type": "JSXIdentifier",
                          "start": 357,
                          "end": 360,
                          "range": [
                            357,
                            360
                          ],
                          "name": "div"
                        }
                      },
                      "children": [
                        {
                          "type": "JSXText",
                          "start": 335,
                          "end": 355,
                          "range": [
                            335,
                            355
                          ],
                          "value": "hello ComponentThree",
                          "raw": "hello ComponentThree"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    },
    {
      "type": "VariableDeclaration",
      "start": 370,
      "end": 441,
      "range": [
        370,
        441
      ],
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 376,
          "end": 440,
          "range": [
            376,
            440
          ],
          "id": {
            "type": "Identifier",
            "start": 376,
            "end": 389,
            "range": [
              376,
              389
            ],
            "name": "ComponentFour"
          },
          "init": {
            "type": "CallExpression",
            "start": 392,
            "end": 440,
            "range": [
              392,
              440
            ],
            "callee": {
              "type": "MemberExpression",
              "start": 392,
              "end": 402,
              "range": [
                392,
                402
              ],
              "object": {
                "type": "Identifier",
                "start": 392,
                "end": 397,
                "range": [
                  392,
                  397
                ],
                "name": "React"
              },
              "property": {
                "type": "Identifier",
                "start": 398,
                "end": 402,
                "range": [
                  398,
                  402
                ],
                "name": "memo"
              },
              "computed": false,
              "optional": false
            },
            "arguments": [
              {
                "type": "ArrowFunctionExpression",
                "start": 403,
                "end": 439,
                "range": [
                  403,
                  439
                ],
                "id": null,
                "expression": true,
                "generator": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "JSXElement",
                  "start": 409,
                  "end": 439,
                  "range": [
                    409,
                    439
                  ],
                  "openingElement": {
                    "type": "JSXOpeningElement",
                    "start": 409,
                    "end": 414,
                    "range": [
                      409,
                      414
                    ],
                    "attributes": [],
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 410,
                      "end": 413,
                      "range": [
                        410,
                        413
                      ],
                      "name": "div"
                    },
                    "selfClosing": false
                  },
                  "closingElement": {
                    "type": "JSXClosingElement",
                    "start": 433,
                    "end": 439,
                    "range": [
                      433,
                      439
                    ],
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 435,
                      "end": 438,
                      "range": [
                        435,
                        438
                      ],
                      "name": "div"
                    }
                  },
                  "children": [
                    {
                      "type": "JSXText",
                      "start": 414,
                      "end": 433,
                      "range": [
                        414,
                        433
                      ],
                      "value": "Hello ComponentFour",
                      "raw": "Hello ComponentFour"
                    }
                  ]
                }
              }
            ],
            "optional": false
          }
        }
      ],
      "kind": "const"
    },
    {
      "type": "VariableDeclaration",
      "start": 475,
      "end": 572,
      "range": [
        475,
        572
      ],
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 481,
          "end": 571,
          "range": [
            481,
            571
          ],
          "id": {
            "type": "Identifier",
            "start": 481,
            "end": 494,
            "range": [
              481,
              494
            ],
            "name": "ComponentFive"
          },
          "init": {
            "type": "CallExpression",
            "start": 497,
            "end": 571,
            "range": [
              497,
              571
            ],
            "callee": {
              "type": "MemberExpression",
              "start": 497,
              "end": 513,
              "range": [
                497,
                513
              ],
              "object": {
                "type": "Identifier",
                "start": 497,
                "end": 502,
                "range": [
                  497,
                  502
                ],
                "name": "React"
              },
              "property": {
                "type": "Identifier",
                "start": 503,
                "end": 513,
                "range": [
                  503,
                  513
                ],
                "name": "forwardRef"
              },
              "computed": false,
              "optional": false
            },
            "arguments": [
              {
                "type": "ArrowFunctionExpression",
                "start": 514,
                "end": 570,
                "range": [
                  514,
                  570
                ],
                "id": null,
                "expression": true,
                "generator": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 515,
                    "end": 520,
                    "range": [
                      515,
                      520
                    ],
                    "name": "props"
                  },
                  {
                    "type": "Identifier",
                    "start": 522,
                    "end": 525,
                    "range": [
                      522,
                      525
                    ],
                    "name": "ref"
                  }
                ],
                "body": {
                  "type": "JSXElement",
                  "start": 530,
                  "end": 570,
                  "range": [
                    530,
                    570
                  ],
                  "openingElement": {
                    "type": "JSXOpeningElement",
                    "start": 530,
                    "end": 545,
                    "range": [
                      530,
                      545
                    ],
                    "attributes": [
                      {
                        "type": "JSXAttribute",
                        "start": 535,
                        "end": 544,
                        "range": [
                          535,
                          544
                        ],
                        "name": {
                          "type": "JSXIdentifier",
                          "start": 535,
                          "end": 538,
                          "range": [
                            535,
                            538
                          ],
                          "name": "ref"
                        },
                        "value": {
                          "type": "JSXExpressionContainer",
                          "start": 539,
                          "end": 544,
                          "range": [
                            539,
                            544
                          ],
                          "expression": {
                            "type": "Identifier",
                            "start": 540,
                            "end": 543,
                            "range": [
                              540,
                              543
                            ],
                            "name": "ref"
                          }
                        }
                      }
                    ],
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 531,
                      "end": 534,
                      "range": [
                        531,
                        534
                      ],
                      "name": "div"
                    },
                    "selfClosing": false
                  },
                  "closingElement": {
                    "type": "JSXClosingElement",
                    "start": 564,
                    "end": 570,
                    "range": [
                      564,
                      570
                    ],
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 566,
                      "end": 569,
                      "range": [
                        566,
                        569
                      ],
                      "name": "div"
                    }
                  },
                  "children": [
                    {
                      "type": "JSXText",
                      "start": 545,
                      "end": 564,
                      "range": [
                        545,
                        564
                      ],
                      "value": "Hello ComponentFive",
                      "raw": "Hello ComponentFive"
                    }
                  ]
                }
              }
            ],
            "optional": false
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}

```
::::

### 4.4 编写ESlint Rules

- 在`lib/rules`目录下创建一个`single-component-per-file.js`文件，用来检测一个文件只能有一个React 组件。
- 在`tests/lib/rules`目录下创建一个`single-component-per-file.test.js`文件，用来测试`single-component-per-file.js`文件。

通过`AST`对文件内容各个语法节点进行解析，来判断一个文件中是否存在多个React 组件。如果超过二个，则ESlint报错。


::: code-group

```javascript [single-component-per-file.js]
/**
 * @fileoverview 每个文件只允许包含一个 React 组件
 * @author xc-fe
 *
 * 规则实现思路：
 * 1. 遍历 AST，收集所有可能的组件定义
 * 2. 识别三种主要的组件类型：
 *    - 函数组件（包括函数声明和箭头函数）
 *    - 类组件（继承自 React.Component）
 *    - 变量声明的组件
 * 3. 排除 Hooks（以 use 开头的函数）
 * 4. 如果文件中有多个组件，报告错误
 */

'use strict';

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '每个文件只允许包含一个 React 组件',
      recommended: 'error',
    },
    messages: {
      multipleComponents: "文件中包含多个组件。组件 '{{componentName}}' 应该移动到单独的文件中。",
    },
    schema: [], // 规则不需要额外的配置选项
  },

  create(context) {
    // 存储文件中发现的所有组件
    const components = [];

    /**
     * 检查节点是否可能返回 JSX
     * 通过检查返回语句中是否包含 JSX 元素来判断一个函数是否是组件
     *
     * @param {Object} node - 要检查的 AST 节点
     * @returns {boolean} 是否可能返回 JSX
     *
     * 处理以下情况：
     * 1. 直接返回 JSX 元素或片段
     * 2. 在函数体内的 return 语句
     * 3. 在代码块中的 return 语句
     */
    function mightReturnJSX(node) {
      // 空节点直接返回 false
      if (!node) return false;

      switch (node.type) {
        // 检查是否是 JSX 元素或片段
        case 'JSXElement':
        case 'JSXFragment':
          return true;

        // 检查 return 语句
        case 'ReturnStatement':
          // 递归检查返回值
          return node.argument ? mightReturnJSX(node.argument) : false;

        // 检查代码块
        case 'BlockStatement':
          // 遍历代码块中的所有语句，查找 return 语句
          return node.body.some(
            statement => statement.type === 'ReturnStatement' && mightReturnJSX(statement)
          );

        // 其他类型的节点不是 JSX
        default:
          return false;
      }
    }

    /**
     * 检查节点是否是 React 组件
     *
     * @param {Object} node - 要检查的 AST 节点
     * @returns {boolean} 是否是 React 组件
     *
     * 识别以下类型的组件：
     * 1. 函数声明组件
     * 2. 箭头函数组件
     * 3. 函数表达式组件
     * 4. 类组件（继承自 React.Component）
     */
    function isComponent(node) {
      // 检查函数组件
      if (
        node.type === 'FunctionDeclaration' ||
        node.type === 'ArrowFunctionExpression' ||
        node.type === 'FunctionExpression'
      ) {
        // 通过检查返回值判断是否是组件
        return mightReturnJSX(node.body);
      }

      // 检查类组件
      if (node.type === 'ClassDeclaration') {
        const superClass = node.superClass;
        // 检查是否继承自 React.Component
        if (superClass && superClass.type === 'MemberExpression') {
          const object = superClass.object;
          return (
            object.type === 'Identifier' &&
            object.name === 'React' &&
            superClass.property.type === 'Identifier' &&
            superClass.property.name === 'Component'
          );
        }
      }

      return false;
    }

    // 返回访问者对象
    return {
      // 处理函数声明的组件
      FunctionDeclaration(node) {
        // Hook 检查：忽略以 use 开头的函数
        if (node.id && /^use[A-Z]/.test(node.id.name)) {
          return;
        }
        // 检查是否是大写字母开头的组件
        if (node.id && /^[A-Z]/.test(node.id.name) && isComponent(node)) {
          components.push({
            node,
            name: node.id.name,
          });
        }
      },

      // 处理变量声明的组件
      VariableDeclarator(node) {
        // Hook 检查：忽略以 use 开头的变量
        if (node.id.type === 'Identifier' && /^use[A-Z]/.test(node.id.name)) {
          return;
        }
        // 检查是否是大写字母开头的组件
        if (node.id.type === 'Identifier' && /^[A-Z]/.test(node.id.name)) {
          if (node.init && isComponent(node.init)) {
            components.push({
              node,
              name: node.id.name,
            });
          }
        }
      },

      // 处理类组件
      ClassDeclaration(node) {
        // 检查是否是大写字母开头的组件
        if (node.id && /^[A-Z]/.test(node.id.name) && isComponent(node)) {
          components.push({
            node,
            name: node.id.name,
          });
        }
      },

      // 在遍历完整个程序后检查组件数量
      'Program:exit'() {
        // 如果找到多个组件，从第二个开始报错
        if (components.length > 1) {
          for (let i = 1; i < components.length; i++) {
            context.report({
              node: components[i].node,
              messageId: 'multipleComponents',
              data: {
                componentName: components[i].name,
              },
            });
          }
        }
      },
    };
  },
};

```

```javascript [single-component-per-file.test.js]
const { RuleTester } = require('eslint');
const rule = require('../single-component-per-file.js');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('single-component-per-file', rule, {
  valid: [
    // Fragment 组件
    {
      code: `
        function MyComponent() {
          return <>Hello</>;
        }
      `,
    },
    // 函数组件
    {
      code: `
        function MyComponent() {
          return <div>Hello</div>;
        }
      `,
    },
    // 类组件
    {
      code: `
        class MyComponent extends React.Component {
          render() {
            return <div>Hello</div>;
          }
        }
      `,
    },
    // 箭头函数组件
    {
      code: `
        const MyComponent = () => <div>Hello</div>;
      `,
    },
    // 函数表达式组件
    {
      code: `
        const MyComponent = function() {
          return <div>Hello</div>;
        }
      `,
    },
    // 空返回值
    {
      code: `
        function MyComponent() {
          return;
        }
      `,
    },
    // 非组件函数
    {
      code: `
        function notAComponent() {
          return 'hello';
        }
        
        function MyComponent() {
          return <div>Hello</div>;
        }
      `,
    },
    // 非 React.Component 的类
    {
      code: `
        class NotAComponent extends SomeOtherClass {
          render() {
            return <div>Hello</div>;
          }
        }
      `,
    },
    // 类组件没有继承
    {
      code: `
        class NotAComponent {
          render() {
            return <div>Hello</div>;
          }
        }
      `,
    },
    // 类组件继承错误的类
    {
      code: `
        class NotAComponent extends React.NotComponent {
          render() {
            return <div>Hello</div>;
          }
        }
      `,
    },
    // Hook 和组件共存
    {
      code: `
        function useCustomHook() {
          return useState(0);
        }
        
        function MyComponent() {
          return <div>Hello</div>;
        }
      `,
    },
    // 多个 Hook
    {
      code: `
        function useHook1() {
          return useState(0);
        }
        
        function useHook2() {
          return useEffect(() => {});
        }
      `,
    },
    // Hook 返回 JSX（但仍然不是组件）
    {
      code: `
        function useCustomElement() {
          return <div>Hook Element</div>;
        }
        
        function MyComponent() {
          return <div>Component</div>;
        }
      `,
    },
    // 复杂块语句的组件
    {
      code: `
        function MyComponent() {
          const x = 1;
          if (x > 0) {
            console.log('test');
            return <div>Block</div>;
          }
          let y = 2;
          return <span>Default</span>;
        }
      `,
    },
    // 空块语句的组件
    {
      code: `
        function MyComponent() {
          const x = 1;
          {
            // 空块
          }
          return <div>Hello</div>;
        }
      `,
    },
    // 未初始化的变量
    {
      code: `
        let MyComponent;
        MyComponent = function() {
          return <div>Later Init</div>;
        }
      `,
    },
    // 箭头函数组件的不同形式
    {
      code: `
        const MyComponent = props => {
          const { name } = props;
          return <div>{name}</div>;
        }
      `,
    },
    // 条件返回的组件
    {
      code: `
        const MyComponent = () => {
          if (Math.random() > 0.5) {
            return <div>True</div>;
          }
          return <span>False</span>;
        }
      `,
    },
  ],
  invalid: [
    // 多个函数组件
    {
      code: `
        function ComponentOne() {
          return <div>One</div>;
        }
        
        function ComponentTwo() {
          return <div>Two</div>;
        }
      `,
      errors: [
        {
          messageId: 'multipleComponents',
          data: { componentName: 'ComponentTwo' },
        },
      ],
    },
    // 混合组件类型
    {
      code: `
        const ComponentOne = () => <div>One</div>;
        
        class ComponentTwo extends React.Component {
          render() {
            return <div>Two</div>;
          }
        }
      `,
      errors: [
        {
          messageId: 'multipleComponents',
          data: { componentName: 'ComponentTwo' },
        },
      ],
    },
    // 多个不同类型的组件
    {
      code: `
        function ComponentOne() {
          return <div>One</div>;
        }
        
        const ComponentTwo = () => <div>Two</div>;
        
        class ComponentThree extends React.Component {
          render() {
            return <div>Three</div>;
          }
        }
      `,
      errors: [
        {
          messageId: 'multipleComponents',
          data: { componentName: 'ComponentTwo' },
        },
        {
          messageId: 'multipleComponents',
          data: { componentName: 'ComponentThree' },
        },
      ],
    },
  ],
});
```

:::

因为我们要编译JSX语法还有打包(如果有必要的话)需要通过babel去转换，所以需要安装一些包：
```bash
npm install @babel/cli@^7.23.4 @babel/core@^7.23.7 @babel/eslint-parser@^7.23.3 @babel/preset-env@^7.26.0 @babel/preset-react@^7.26.3 babel-jest@^29.7.0 eslint@8.55.0 husky@^8.0.3 jest@29.7.0 lint-staged@^15.2.2 only-allow@^1.2.1 rimraf@5.0.5 --save-dev
```

安装完之后，在`package.json`文件中添加以下配置：

::: code-group

```json [package.json]
// script 标签
  "scripts": {
    "preinstall": "npx only-allow pnpm", // 防止使用npm,yarn安装依赖 只能使用pnpm
    "clean": "rimraf lib", // 清除lib目录
    "test": "jest", // 运行测试
    "prepublishOnly": "npm run lint && npm run test", // 在发布之前运行测试和构建
    "lint": "eslint src/**/*.js", // 运行eslint
    "prepare": "husky install", // 安装husky
    "pre-commit": "lint-staged && npm run test" // 在提交之前运行lint-staged和测试
  },
   "peerDependencies": {
    "eslint": ">=8.0.0" // 对等依赖 eslint 版本必须大于8.0.0
  },
  // 利用git hooks在提交之前运行lint-staged和单元测试
   "lint-staged": {
    "*.js": [
      "eslint --fix",
      "prettier --write"
    ]
  },
  // jest 配置 单元测试配置
    "jest": {
    "testEnvironment": "node",
    "testRegex": "(__tests__/.*)\\.test\\.js$",
    "testPathIgnorePatterns": [
      "/node_modules/",
      "lib/.*"
    ],
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "moduleFileExtensions": [
      "js",
      "json"
    ],
    "collectCoverage": true,
    "coverageReporters": [
      "text",
      "lcov"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 85,
        "functions": 90,
        "lines": 85,
        "statements": 85
      }
    }
  },

```

```bash [.husky/_/husky.sh]
#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  if [ $exitCode = 127 ]; then
    echo "husky - command not found in PATH=$PATH"
  fi

  exit $exitCode
fi

```

```bash [.husky/pre-commit]
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run pre-commit

```

:::


- 在`package.json`文件中添加`scripts`配置`preinstall` 命令，防止使用`npm`,`yarn`安装依赖 只能使用`pnpm`
- 在`package.json`文件中添加`scripts`配置`prepare` 命令， 安装`husky`,使用`git hooks`
- 在`package.json`文件中添加`jest`配置，单元测试配置，`npm run test` 命令可以运行单元测试,即使测试用例通过了，但是覆盖率不达标，则无法提交代码
- 在`package.json`文件中添加`lint-staged`配置，配合`husky`,在提交之前运行lint-staged和单元测试

执行`npm run test` 命令，运行单元测试，查看测试用例是否通过，以及代码覆盖率，代码覆盖情况文件在`coverage`目录下：

```markdown
------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   91.17 |    92.59 |     100 |   93.75 |                   
 single-component-per-file.js |   91.17 |    92.59 |     100 |   93.75 | 70,136            
------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        0.472 s
Ran all test suites.
```

![eslint-coverage](https://raw.githubusercontent.com/ChinaCarlos/carlos-blog/main/docs/blog/images/eslint-coverage.png)


### 4.5 配置eslint rules 入口文件

1. **集中管理**：可以统一管理所有规则和插件，便于团队协作和维护。

2. **规则复用**：为多个项目或代码库提供通用规则，避免重复配置。

3. **可扩展性**：新增或更新规则时，只需在入口文件中修改，简化管理。

4. **可配置性**：提供不同配置模式（如推荐配置、全部规则配置），根据需求灵活切换。

```javascript [lib/index.js]
module.exports = {
  // 所有规则的配置
  rules: {
    // 确保每个文件只包含一个 React 组件
    "single-component-per-file": require("./rules/single-component-per-file"),
  },
  // 预设配置
  configs: {
    // 推荐配置：包含推荐的规则设置
    recommended: {
      // 声明使用的插件
      plugins: ["custom"],
      // 规则配置
      rules: {
        // 强制每个文件只能包含一个组件，设置为 error 级别
        "custom/single-component-per-file": "error",
      },
    },
    // 所有规则配置：启用所有可用的规则
    all: {
      // 声明使用的插件
      plugins: ["custom"],
      // 规则配置
      rules: {
        // 强制每个文件只能包含一个组件，设置为 error 级别
        "custom/single-component-per-file": "error",
      },
    },
  },
};

```

:::warning  为什么不用`TypeScript`开发ESlint Rules
- TypeScript 的类型系统在 ESLint 中无法直接使用，需要通过 `@typescript-eslint/parser` 解析器来解析 TypeScript 代码。通过`tsc`命令将TypeScript代码编译为JavaScript代码，然后使用ESLint解析JavaScript代码。
- 用`TypeScript`开发ESlint Rules，不好调试。
- 增加了维护成本,收益却没有那么大
:::

## 5. 如何发包

首先修改一下`package.json`文件:

```json [package.json]
{
  "name": "eslint-plugin-custom",  // 项目或包的名称
  "version": "1.0.0",  // 项目的版本号
  "description": "一个演示如何编写一个eslint rules 的项目",  // 项目的简短描述
  "keywords": [  // 用于包搜索的关键词
    "eslint",
    "eslintplugin",
    "eslint-plugin"
  ],
  "author": "carlos",  // 项目的作者名称
  "main": "./lib/index.js",  // 项目的入口文件
  "files": [  // 列出包含在发布包中的文件或目录
    "lib"
  ]
}
```
然后，按照下列操作步骤进行发包：

- 1. 确定修改内容，更新版本号以及在`CHANGELOG.md`填写更新日志
- 2. 登录`npm`账号，执行`npm login` 命令，登录`npm`（npm 源要切回`npm`）
- 3. 执行`npm run publish` 命令，发布包

## 6. 如何使用这个eslint plugin

1. 首先，安装插件：

```bash
pnpm add -D eslint-plugin-custom
```

2. 然后在项目的 ESLint 配置文件中使用它。您有几种配置方式：

方式一：在 `.eslintrc.js` 中使用推荐配置：

```javascript [.eslintrc.js]
module.exports = {
  plugins: ['custom'],
  extends: ['plugin:custom/recommended'],
};
```

方式二：在 `.eslintrc.js` 中手动配置规则：

```javascript [.eslintrc.js]
module.exports = {
  plugins: ['custom'],
  rules: {
    'custom/single-component-per-file': 'error',
  },
};
```

3. 最后， 重启编辑器， 就可以看到效果了。


## 7. 如何开发调试

1. 首先在插件目录下执行如下命令，这会将本地的插件链接到本地的 npm 全局目录。

```bash
npm link
```

2. 然后在项目目录下执行如下命令，这会将本地的插件链接到本地的项目目录。

```bash
npm link eslint-plugin-custom
```
3. 修改eslint配置文件，添加如下配置：

```javascript [.eslintrc.js]
module.exports = {
  plugins: ['custom'],
  rules: {
    'custom/single-component-per-file': 'error',
  },
};
```

4.  重启编辑器， 就可以看到效果了。

> 其他调试方式： 
1. 可以直接在`node_modules`中找到插件，然后修改插件的代码，然后重启编辑器，就可以看到效果了。
2. 通过`webstrom`的`Run`菜单，选择`Debug ESLint Rules`，然后选择插件的规则，然后就可以调试插件的规则了。(vscode 也有类似的功能，需要自己去查询一下)
3. 通过`npm` 安装本地包
```json
{
  "dependencies": {
    "local-package": "file:./path/to/local-package"
  }
}
```





