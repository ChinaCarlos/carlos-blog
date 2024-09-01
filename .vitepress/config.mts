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

    sidebar: generateSidebar({
      /*
       * For detailed instructions, see the links below:
       * https://vitepress-sidebar.jooy2.com/guide/api
       */
      documentRootPath: "/docs", //文档根目录
      // scanStartPath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // frontmatterTitleFieldName: 'title',
      // useFolderTitleFromIndexFile: false, //是否使用层级首页文件名做分级标题
      // useFolderLinkFromIndexFile: false, //是否链接至层级首页文件
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      collapsed: false, //折叠组关闭
      collapseDepth: 2, //折叠组2级菜单
      // sortMenusByName: false,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'], //手动排序，文件夹不用带后缀
      removePrefixAfterOrdering: false, //删除前缀，必须与prefixSeparator一起使用
      prefixSeparator: ".", //删除前缀的符号
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      // excludeFolders: ['secret-folder'],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false, //是否包含层级主页
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
    }),

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
