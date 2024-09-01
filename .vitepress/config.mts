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
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";
import { generateSidebar } from "vitepress-sidebar";

const { detypeMarkdownPlugin, detypeVitePlugin } = createDetypePlugin();

import { sideBarData } from "./theme/sidebarOptions";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  title: "China Carlos's Blog",
  description: "Carlos's Blog Web Site",
  head: [["link", { rel: "icon", href: "/blog.svg" }]],
  //启用深色模式
  appearance: "dark",
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
      { text: "首页", link: "/" },
      // { text: "我的博客", link: "/" },
      {
        text: "前端面试",
        items: [
          { text: "Examples", link: "/Examples/api-examples" },
          { text: "HTML基础知识", link: "/HTML/part1" },
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
      // { text: "关于我", link: "/" },
    ],

    sidebar: generateSidebar(sideBarData),

    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],
    darkModeSwitchLabel: "深浅模式",
    returnToTopLabel: "返回顶部",

    search: {
      provider: "local",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present China Carlos",
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config(md) {
      const docRoot = fileURLToPath(new URL("../", import.meta.url));

      md.use(groupIconMdPlugin);
      md.use(tabsMarkdownPlugin);
      md.use(detypeMarkdownPlugin);
      md.use(demoPreviewPlugin, { docRoot });

      md.use(container, "sandbox", {
        render(tokens, idx) {
          return renderSandbox(tokens, idx, "sandbox");
        },
      });
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
