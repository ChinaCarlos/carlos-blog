// .vitepress/config.mts
import { defineConfig } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.3_@types+node@22.5.1_search-insights@2.17.0/node_modules/vitepress/dist/node/index.js";
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress-plugin-group-icons@1.0.4/node_modules/vitepress-plugin-group-icons/dist/index.mjs";
import { createDetypePlugin } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress-plugin-detype@0.6.0_vitepress-plugin-tabs@0.5.0_vitepress@1.3.4_vue@3.4.38/node_modules/vitepress-plugin-detype/dist/index.js";
import { tabsMarkdownPlugin } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.4_vue@3.4.38/node_modules/vitepress-plugin-tabs/dist/index.js";
import vueJsx from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.2_vue@3.4.38/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { viteDemoPreviewPlugin } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/@vitepress-code-preview+plugin@1.0.6/node_modules/@vitepress-code-preview/plugin/dist/index.js";
import { fileURLToPath, URL } from "node:url";
import { demoPreviewPlugin } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/@vitepress-code-preview+plugin@1.0.6/node_modules/@vitepress-code-preview/plugin/dist/index.js";
import container from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/markdown-it-container@4.0.0/node_modules/markdown-it-container/index.mjs";
import { renderSandbox } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress-plugin-sandpack@1.1.4_@lezer+common@1.2.1_vite@5.4.2_vitepress@1.3.4_vue@3.4.38/node_modules/vitepress-plugin-sandpack/dist/esm/index.mjs";
import { generateSidebar } from "file:///Users/carlos/Desktop/my-blog/node_modules/.pnpm/vitepress-sidebar@1.25.0/node_modules/vitepress-sidebar/dist/index.js";

// .vitepress/theme/sidebarOptions.ts
var sideBarData = [
  // 博客
  {
    documentRootPath: "/docs",
    scanStartPath: "blog",
    resolvePath: "blog/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  },
  {
    documentRootPath: "/docs",
    scanStartPath: "interview/Examples",
    resolvePath: "interview/Examples/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  },
  {
    documentRootPath: "/docs",
    scanStartPath: "interview/CSS",
    resolvePath: "interview/CSS/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  },
  {
    documentRootPath: "/docs",
    scanStartPath: "interview/Algorithm",
    resolvePath: "interview/Algorithm/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  },
  {
    documentRootPath: "/docs",
    scanStartPath: "interview/JavaScript",
    resolvePath: "interview/JavaScript/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  },
  {
    documentRootPath: "/docs/",
    scanStartPath: "interview/HTML",
    resolvePath: "interview/HTML/",
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: "title",
    hyphenToSpace: true,
    underscoreToSpace: true,
    collapsed: false,
    collapseDepth: 2
  }
];

// .vitepress/config.mts
var __vite_injected_original_import_meta_url = "file:///Users/carlos/Desktop/my-blog/.vitepress/config.mts";
var { detypeMarkdownPlugin, detypeVitePlugin } = createDetypePlugin();
var config_default = defineConfig({
  srcDir: "docs",
  title: "China Carlos's Blog",
  description: "Carlos's Blog Web Site",
  ignoreDeadLinks: true,
  head: [
    ["link", { rel: "icon", href: "/blog.svg" }],
    [
      "script",
      {
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "a389c094-c38f-4892-a805-600abb846e29"
      }
    ]
  ],
  //启用深色模式
  appearance: "dark",
  themeConfig: {
    logo: "/logo.svg",
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u6211\u7684\u535A\u5BA2", link: "/blog/vitepress" },
      {
        text: "\u524D\u7AEF\u9762\u8BD5",
        items: [
          { text: "\u6211\u7684\u6398\u91D1", link: "https://juejin.cn/user/3544481218693597" },
          { text: "HTML", link: "/interview/HTML/index" },
          { text: "CSS", link: "/interview/CSS/prev" },
          { text: "JavaScript", link: "/interview/JavaScript/prev" },
          { text: "Typescript", link: "/interview/Typescript/index" },
          { text: "\u6D4F\u89C8\u5668\u7F51\u7EDC\u7BC7", link: "/interview/Network/index" },
          { text: "\u524D\u7AEF\u5DE5\u7A0B\u5316", link: "/interview/FrontendEngineering/index" },
          { text: "Vue2/3\u6846\u67B6", link: "/interview/Vue/index" },
          { text: "React\u6846\u67B6", link: "/interview/React/index" },
          { text: "\u7B97\u6CD5&\u6570\u636E\u7ED3\u6784", link: "/interview/Algorithm/dataStructure" },
          { text: "PWA\u5E94\u7528", link: "/interview/PWA/index" },
          { text: "\u5FAE\u524D\u7AEF", link: "/interview/MicroFrontEnd/index" },
          { text: "\u4F4E\u4EE3\u7801", link: "/interview/LowCode/index" },
          { text: "Nodejs", link: "/interview/Nodejs/index" },
          { text: "\u524D\u7AEF\u5DE5\u5177", link: "/interview/FrontEndTool/index" }
        ]
      },
      { text: "\u5173\u4E8E\u6211", link: "/pages/about" },
      {
        text: "\u535A\u5BA2\u7EDF\u8BA1",
        link: "https://us.umami.is/share/Y2BYxCAm7R0DG2Xi/carlosme.fun"
      }
    ],
    sidebar: generateSidebar(sideBarData),
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "\u76EE\u5F55"
    },
    //自定义上下页名
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/ChinaCarlos" }],
    // 主题
    darkModeSwitchLabel: "\u6DF1\u6D45\u6A21\u5F0F",
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    // 搜索
    search: {
      provider: "local"
    },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright \xA9 2023-present China Carlos"
    }
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    config(md) {
      const docRoot = fileURLToPath(new URL("../", __vite_injected_original_import_meta_url));
      md.use(groupIconMdPlugin);
      md.use(tabsMarkdownPlugin);
      md.use(detypeMarkdownPlugin);
      md.use(demoPreviewPlugin, { docRoot });
      md.use(container, "sandbox", {
        render(tokens, idx) {
          return renderSandbox(tokens, idx, "sandbox");
        }
      });
    }
  },
  vite: {
    plugins: [
      detypeVitePlugin(),
      groupIconVitePlugin(),
      viteDemoPreviewPlugin(),
      vueJsx()
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi52aXRlcHJlc3MvdGhlbWUvc2lkZWJhck9wdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2FybG9zL0Rlc2t0b3AvbXktYmxvZy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY2FybG9zL0Rlc2t0b3AvbXktYmxvZy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Nhcmxvcy9EZXNrdG9wL215LWJsb2cvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IHtcbiAgZ3JvdXBJY29uTWRQbHVnaW4sXG4gIGdyb3VwSWNvblZpdGVQbHVnaW4sXG59IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVEZXR5cGVQbHVnaW4gfSBmcm9tIFwidml0ZXByZXNzLXBsdWdpbi1kZXR5cGVcIjtcbmltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gXCJ2aXRlcHJlc3MtcGx1Z2luLXRhYnNcIjtcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcbmltcG9ydCB7IHZpdGVEZW1vUHJldmlld1BsdWdpbiB9IGZyb20gXCJAdml0ZXByZXNzLWNvZGUtcHJldmlldy9wbHVnaW5cIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgZGVtb1ByZXZpZXdQbHVnaW4gfSBmcm9tIFwiQHZpdGVwcmVzcy1jb2RlLXByZXZpZXcvcGx1Z2luXCI7XG5pbXBvcnQgY29udGFpbmVyIGZyb20gXCJtYXJrZG93bi1pdC1jb250YWluZXJcIjtcbmltcG9ydCB7IHJlbmRlclNhbmRib3ggfSBmcm9tIFwidml0ZXByZXNzLXBsdWdpbi1zYW5kcGFja1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVTaWRlYmFyIH0gZnJvbSBcInZpdGVwcmVzcy1zaWRlYmFyXCI7XG5pbXBvcnQgeyBzaWRlQmFyRGF0YSB9IGZyb20gXCIuL3RoZW1lL3NpZGViYXJPcHRpb25zXCI7XG5cbmNvbnN0IHsgZGV0eXBlTWFya2Rvd25QbHVnaW4sIGRldHlwZVZpdGVQbHVnaW4gfSA9IGNyZWF0ZURldHlwZVBsdWdpbigpO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzcmNEaXI6IFwiZG9jc1wiLFxuICB0aXRsZTogXCJDaGluYSBDYXJsb3MncyBCbG9nXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNhcmxvcydzIEJsb2cgV2ViIFNpdGVcIixcbiAgaWdub3JlRGVhZExpbmtzOiB0cnVlLFxuICBoZWFkOiBbXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2Jsb2cuc3ZnXCIgfV0sXG4gICAgW1xuICAgICAgXCJzY3JpcHRcIixcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcImh0dHBzOi8vY2xvdWQudW1hbWkuaXMvc2NyaXB0LmpzXCIsXG4gICAgICAgIFwiZGF0YS13ZWJzaXRlLWlkXCI6IFwiYTM4OWMwOTQtYzM4Zi00ODkyLWE4MDUtNjAwYWJiODQ2ZTI5XCIsXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG4gIC8vXHU1NDJGXHU3NTI4XHU2REYxXHU4MjcyXHU2QTIxXHU1RjBGXG4gIGFwcGVhcmFuY2U6IFwiZGFya1wiLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286IFwiL2xvZ28uc3ZnXCIsXG4gICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgIHRleHQ6IFwiVXBkYXRlZCBhdFwiLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6IFwiZnVsbFwiLFxuICAgICAgICB0aW1lU3R5bGU6IFwibWVkaXVtXCIsXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL2RlZmF1bHQtdGhlbWUtY29uZmlnXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6IFwiXHU5OTk2XHU5ODc1XCIsIGxpbms6IFwiL1wiIH0sXG4gICAgICB7IHRleHQ6IFwiXHU2MjExXHU3Njg0XHU1MzVBXHU1QkEyXCIsIGxpbms6IFwiL2Jsb2cvdml0ZXByZXNzXCIgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdTUyNERcdTdBRUZcdTk3NjJcdThCRDVcIixcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2MjExXHU3Njg0XHU2Mzk4XHU5MUQxXCIsIGxpbms6IFwiaHR0cHM6Ly9qdWVqaW4uY24vdXNlci8zNTQ0NDgxMjE4NjkzNTk3XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiSFRNTFwiLCBsaW5rOiBcIi9pbnRlcnZpZXcvSFRNTC9pbmRleFwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkNTU1wiLCBsaW5rOiBcIi9pbnRlcnZpZXcvQ1NTL3ByZXZcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJKYXZhU2NyaXB0XCIsIGxpbms6IFwiL2ludGVydmlldy9KYXZhU2NyaXB0L3ByZXZcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJUeXBlc2NyaXB0XCIsIGxpbms6IFwiL2ludGVydmlldy9UeXBlc2NyaXB0L2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2RDRGXHU4OUM4XHU1NjY4XHU3RjUxXHU3RURDXHU3QkM3XCIsIGxpbms6IFwiL2ludGVydmlldy9OZXR3b3JrL2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1MjREXHU3QUVGXHU1REU1XHU3QTBCXHU1MzE2XCIsIGxpbms6IFwiL2ludGVydmlldy9Gcm9udGVuZEVuZ2luZWVyaW5nL2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiVnVlMi8zXHU2ODQ2XHU2N0I2XCIsIGxpbms6IFwiL2ludGVydmlldy9WdWUvaW5kZXhcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJSZWFjdFx1Njg0Nlx1NjdCNlwiLCBsaW5rOiBcIi9pbnRlcnZpZXcvUmVhY3QvaW5kZXhcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJcdTdCOTdcdTZDRDUmXHU2NTcwXHU2MzZFXHU3RUQzXHU2Nzg0XCIsIGxpbms6IFwiL2ludGVydmlldy9BbGdvcml0aG0vZGF0YVN0cnVjdHVyZVwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlBXQVx1NUU5NFx1NzUyOFwiLCBsaW5rOiBcIi9pbnRlcnZpZXcvUFdBL2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1RkFFXHU1MjREXHU3QUVGXCIsIGxpbms6IFwiL2ludGVydmlldy9NaWNyb0Zyb250RW5kL2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiXHU0RjRFXHU0RUUzXHU3ODAxXCIsIGxpbms6IFwiL2ludGVydmlldy9Mb3dDb2RlL2luZGV4XCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiTm9kZWpzXCIsIGxpbms6IFwiL2ludGVydmlldy9Ob2RlanMvaW5kZXhcIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJcdTUyNERcdTdBRUZcdTVERTVcdTUxNzdcIiwgbGluazogXCIvaW50ZXJ2aWV3L0Zyb250RW5kVG9vbC9pbmRleFwiIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgeyB0ZXh0OiBcIlx1NTE3M1x1NEU4RVx1NjIxMVwiLCBsaW5rOiBcIi9wYWdlcy9hYm91dFwiIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1MzVBXHU1QkEyXHU3RURGXHU4QkExXCIsXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly91cy51bWFtaS5pcy9zaGFyZS9ZMkJZeENBbTdSMERHMlhpL2Nhcmxvc21lLmZ1blwiLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgc2lkZWJhcjogZ2VuZXJhdGVTaWRlYmFyKHNpZGVCYXJEYXRhKSxcbiAgICAvLyBcdTY1ODdcdTdBRTBcdTUzRjNcdTRGQTdcdTU5MjdcdTdFQjJcdTc2RUVcdTVGNTVcbiAgICBvdXRsaW5lOiB7XG4gICAgICBsZXZlbDogWzIsIDZdLFxuICAgICAgbGFiZWw6IFwiXHU3NkVFXHU1RjU1XCIsXG4gICAgfSxcbiAgICAvL1x1ODFFQVx1NUI5QVx1NEU0OVx1NEUwQVx1NEUwQlx1OTg3NVx1NTQwRFxuICAgIGRvY0Zvb3Rlcjoge1xuICAgICAgcHJldjogXCJcdTRFMEFcdTRFMDBcdTk4NzVcIixcbiAgICAgIG5leHQ6IFwiXHU0RTBCXHU0RTAwXHU5ODc1XCIsXG4gICAgfSxcbiAgICAvLyBcdTc5M0VcdTRFQTRcdTk0RkVcdTYzQTVcbiAgICBzb2NpYWxMaW5rczogW3sgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vQ2hpbmFDYXJsb3NcIiB9XSxcbiAgICAvLyBcdTRFM0JcdTk4OThcbiAgICBkYXJrTW9kZVN3aXRjaExhYmVsOiBcIlx1NkRGMVx1NkQ0NVx1NkEyMVx1NUYwRlwiLFxuXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogXCJcdThGRDRcdTU2REVcdTk4NzZcdTkwRThcIixcbiAgICAvLyBcdTY0MUNcdTdEMjJcbiAgICBzZWFyY2g6IHtcbiAgICAgIHByb3ZpZGVyOiBcImxvY2FsXCIsXG4gICAgfSxcbiAgICAvLyBcdTk4NzVcdTgxMUFcbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6IFwiUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlwiLFxuICAgICAgY29weXJpZ2h0OiBcIkNvcHlyaWdodCBcdTAwQTkgMjAyMy1wcmVzZW50IENoaW5hIENhcmxvc1wiLFxuICAgIH0sXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgaW1hZ2U6IHtcbiAgICAgIGxhenlMb2FkaW5nOiB0cnVlLFxuICAgIH0sXG4gICAgY29uZmlnKG1kKSB7XG4gICAgICBjb25zdCBkb2NSb290ID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi4vXCIsIGltcG9ydC5tZXRhLnVybCkpO1xuXG4gICAgICBtZC51c2UoZ3JvdXBJY29uTWRQbHVnaW4pO1xuICAgICAgbWQudXNlKHRhYnNNYXJrZG93blBsdWdpbik7XG4gICAgICBtZC51c2UoZGV0eXBlTWFya2Rvd25QbHVnaW4pO1xuICAgICAgbWQudXNlKGRlbW9QcmV2aWV3UGx1Z2luLCB7IGRvY1Jvb3QgfSk7XG5cbiAgICAgIG1kLnVzZShjb250YWluZXIsIFwic2FuZGJveFwiLCB7XG4gICAgICAgIHJlbmRlcih0b2tlbnMsIGlkeCkge1xuICAgICAgICAgIHJldHVybiByZW5kZXJTYW5kYm94KHRva2VucywgaWR4LCBcInNhbmRib3hcIik7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuICB2aXRlOiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgZGV0eXBlVml0ZVBsdWdpbigpLFxuICAgICAgZ3JvdXBJY29uVml0ZVBsdWdpbigpLFxuICAgICAgdml0ZURlbW9QcmV2aWV3UGx1Z2luKCksXG4gICAgICB2dWVKc3goKSxcbiAgICBdLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9teS1ibG9nLy52aXRlcHJlc3MvdGhlbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jYXJsb3MvRGVza3RvcC9teS1ibG9nLy52aXRlcHJlc3MvdGhlbWUvc2lkZWJhck9wdGlvbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Nhcmxvcy9EZXNrdG9wL215LWJsb2cvLnZpdGVwcmVzcy90aGVtZS9zaWRlYmFyT3B0aW9ucy50c1wiO2V4cG9ydCBjb25zdCBzaWRlQmFyRGF0YSA9IFtcbiAgLy8gXHU1MzVBXHU1QkEyXG4gIHtcbiAgICBkb2N1bWVudFJvb3RQYXRoOiBcIi9kb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJibG9nXCIsXG4gICAgcmVzb2x2ZVBhdGg6IFwiYmxvZy9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICB1c2VUaXRsZUZyb21Gcm9udG1hdHRlcjogdHJ1ZSxcbiAgICBmcm9udG1hdHRlclRpdGxlRmllbGROYW1lOiBcInRpdGxlXCIsXG4gICAgaHlwaGVuVG9TcGFjZTogdHJ1ZSxcbiAgICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gIH0sXG5cbiAge1xuICAgIGRvY3VtZW50Um9vdFBhdGg6IFwiL2RvY3NcIixcbiAgICBzY2FuU3RhcnRQYXRoOiBcImludGVydmlldy9FeGFtcGxlc1wiLFxuICAgIHJlc29sdmVQYXRoOiBcImludGVydmlldy9FeGFtcGxlcy9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICB1c2VUaXRsZUZyb21Gcm9udG1hdHRlcjogdHJ1ZSxcbiAgICBmcm9udG1hdHRlclRpdGxlRmllbGROYW1lOiBcInRpdGxlXCIsXG4gICAgaHlwaGVuVG9TcGFjZTogdHJ1ZSxcbiAgICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gIH0sXG4gIHtcbiAgICBkb2N1bWVudFJvb3RQYXRoOiBcIi9kb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJpbnRlcnZpZXcvQ1NTXCIsXG4gICAgcmVzb2x2ZVBhdGg6IFwiaW50ZXJ2aWV3L0NTUy9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICB1c2VUaXRsZUZyb21Gcm9udG1hdHRlcjogdHJ1ZSxcbiAgICBmcm9udG1hdHRlclRpdGxlRmllbGROYW1lOiBcInRpdGxlXCIsXG4gICAgaHlwaGVuVG9TcGFjZTogdHJ1ZSxcbiAgICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gIH0sXG4gIHtcbiAgICBkb2N1bWVudFJvb3RQYXRoOiBcIi9kb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJpbnRlcnZpZXcvQWxnb3JpdGhtXCIsXG4gICAgcmVzb2x2ZVBhdGg6IFwiaW50ZXJ2aWV3L0FsZ29yaXRobS9cIixcbiAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICB1c2VUaXRsZUZyb21Gcm9udG1hdHRlcjogdHJ1ZSxcbiAgICBmcm9udG1hdHRlclRpdGxlRmllbGROYW1lOiBcInRpdGxlXCIsXG4gICAgaHlwaGVuVG9TcGFjZTogdHJ1ZSxcbiAgICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gIH0sXG4gIHtcbiAgICBkb2N1bWVudFJvb3RQYXRoOiBcIi9kb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJpbnRlcnZpZXcvSmF2YVNjcmlwdFwiLFxuICAgIHJlc29sdmVQYXRoOiBcImludGVydmlldy9KYXZhU2NyaXB0L1wiLFxuICAgIHVzZVRpdGxlRnJvbUZpbGVIZWFkaW5nOiB0cnVlLFxuICAgIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLFxuICAgIGZyb250bWF0dGVyVGl0bGVGaWVsZE5hbWU6IFwidGl0bGVcIixcbiAgICBoeXBoZW5Ub1NwYWNlOiB0cnVlLFxuICAgIHVuZGVyc2NvcmVUb1NwYWNlOiB0cnVlLFxuICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgY29sbGFwc2VEZXB0aDogMixcbiAgfSxcbiAge1xuICAgIGRvY3VtZW50Um9vdFBhdGg6IFwiL2RvY3MvXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJpbnRlcnZpZXcvSFRNTFwiLFxuICAgIHJlc29sdmVQYXRoOiBcImludGVydmlldy9IVE1ML1wiLFxuICAgIHVzZVRpdGxlRnJvbUZpbGVIZWFkaW5nOiB0cnVlLFxuICAgIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLFxuICAgIGZyb250bWF0dGVyVGl0bGVGaWVsZE5hbWU6IFwidGl0bGVcIixcbiAgICBoeXBoZW5Ub1NwYWNlOiB0cnVlLFxuICAgIHVuZGVyc2NvcmVUb1NwYWNlOiB0cnVlLFxuICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgY29sbGFwc2VEZXB0aDogMixcbiAgfSxcbl07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtTLFNBQVMsb0JBQW9CO0FBQy9UO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsU0FBUywwQkFBMEI7QUFDbkMsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNkJBQTZCO0FBQ3RDLFNBQVMsZUFBZSxXQUFXO0FBQ25DLFNBQVMseUJBQXlCO0FBQ2xDLE9BQU8sZUFBZTtBQUN0QixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHVCQUF1Qjs7O0FDYnlTLElBQU0sY0FBYztBQUFBO0FBQUEsRUFFM1Y7QUFBQSxJQUNFLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLHlCQUF5QjtBQUFBLElBQ3pCLHlCQUF5QjtBQUFBLElBQ3pCLDJCQUEyQjtBQUFBLElBQzNCLGVBQWU7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLElBQ25CLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxFQUNqQjtBQUFBLEVBRUE7QUFBQSxJQUNFLGtCQUFrQjtBQUFBLElBQ2xCLGVBQWU7QUFBQSxJQUNmLGFBQWE7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
