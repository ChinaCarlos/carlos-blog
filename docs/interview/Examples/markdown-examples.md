# Markdown Extension Examples 中文

[![沙漠中的岩石图片](https://markdown.com.cn/assets/img/shiprock.c3b9a023.jpg "Shiprock")](https://www.baidu.com)

::: sandbox {template=vue3-ts}

```js /src/person.ts
const name = "Tom";
export { name };
```

```vue /src/App.vue
<script setup lang="ts">
import { ref } from "vue";
import { name } from "./person.ts";

const person = ref<string>(name);
</script>

<template>
  <h1>Hi, I am {{ person }}</h1>
</template>
```

:::

:::demo

```vue
<template>
  <div>{{ title }}</div>
</template>
<script lang="ts" setup>
import { ref, defineComponent } from "vue";
const title = ref("hello vue components");
</script>
```

:::

> vitepress-plugin-detype vitepress-plugin-tabs 插件的使用

```ts{1-3,5},=detype{1}=
type Foo = {
  foo: string
}

const fooList: Foo[] = []
for (let i = 0; i < 100; i++) {
  const f = { foo: '' + i }
  fooList.push(f)

  const f2 = { bar: '' }
  // @ts-expect-error ignore!
  fooList.push(f2)
}
```

## Install

::: code-group

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [yarn]
yarn add vitepress-plugin-group-icons
```

```sh [pnpm]
pnpm add vitepress-plugin-group-icons
```

```sh [bun]
bun add vitepress-plugin-group-icons
```

:::

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />
This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
