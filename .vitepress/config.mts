import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { createDetypePlugin } from "vitepress-plugin-detype";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteDemoPreviewPlugin } from "@vitepress-code-preview/plugin";
import { fileURLToPath, URL } from "node:url";
import { demoPreviewPlugin } from "@vitepress-code-preview/plugin";

const { detypeMarkdownPlugin, detypeVitePlugin } = createDetypePlugin();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  title: "China Carlos's Blog",
  description: "Carlos's Blog Web Site",
  head: [["link", { rel: "icon", href: "/blog.svg" }]],
  themeConfig: {
    logo: "/logo.svg",
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Examples",
        link: "/markdown-examples",
      },
      {
        text: "前端面试",
        items: [
          { text: "HTML基础知识", link: "/item-1" },
          { text: "CSS", link: "/item-2" },
          { text: "JavaScript", link: "/item-3" },
          { text: "数据结构", link: "/item-3" },
          { text: "算法", link: "/item-3" },
          { text: "Vue3框架", link: "/item-3" },
          { text: "React框架", link: "/item-3" },
          { text: "工程构建", link: "/item-3" },
          { text: "PWA应用", link: "/item-3" },
          { text: "微前端", link: "/item-3" },
          { text: "低代码", link: "/item-3" },
          { text: "Nodejs", link: "/item-3" },
          { text: "前端工具", link: "/item-3" },
        ],
      },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          {
            text: "Markdown Examples",
            link: "/markdown-examples",
          },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    outline: {
      level: [2, 6],
      label: "目录",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],

    search: {
      provider: "local",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present China Carlos",
    },
  },
  markdown: {
    config(md) {
      const docRoot = fileURLToPath(new URL("../", import.meta.url));

      md.use(groupIconMdPlugin);
      md.use(tabsMarkdownPlugin);
      md.use(detypeMarkdownPlugin);
      md.use(demoPreviewPlugin, { docRoot });
    },
  },
  vite: {
    plugins: [
      detypeVitePlugin(),
      groupIconVitePlugin(),
      viteDemoPreviewPlugin(),
      vueJsx(),
    ],
  },
});
