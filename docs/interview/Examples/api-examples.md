---
outline: deep
---

[![](https://img.shields.io/badge/just_do_it-blue?style=for-the-badge&logo=alipay&logoColor=1677FF&label=%E6%94%AF%E4%BB%98%E5%AE%9D&labelColor=lightgrey)](https://shields.io/badges)

![](https://img.shields.io/badge/any_text-you_like-blue)

![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=ChinaCarlos&theme=aura_dark)

![](http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=ChinaCarlos&theme=aura_dark)

![](http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=ChinaCarlos&theme=aura_dark)

![](http://github-profile-summary-cards.vercel.app/api/cards/stats?username=ChinaCarlos&theme=aura_dark)
![](http://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=ChinaCarlos&theme=aura_dark&utcOffset=8)

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
