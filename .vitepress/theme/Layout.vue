<template>
  <Layout>
    <template #doc-footer-before>
      <BackTop></BackTop>
    </template>
    <template #doc-after>
      <div style="margin-top: 24px">
        <Giscus
          :key="page.filePath"
          repo="ChinaCarlos/carlos-blog"
          repo-id="R_kgDOMq5AVg"
          category="Show and tell"
          category-id="DIC_kwDOMq5AVs4CiHAN"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          lang="zh-CN"
          crossorigin="anonymous"
          :theme="isDark ? 'dark' : 'light'"
        />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import BackTop from './components/backTop.vue';
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();

const { Layout } = DefaultTheme;

watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});
</script>