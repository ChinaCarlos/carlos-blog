// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import { inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import vitepressNprogress from "vitepress-plugin-nprogress";
import Layout from "./Layout.vue";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import DemoPreview, { useComponents } from "@vitepress-code-preview/container";
import { Sandbox } from "vitepress-plugin-sandpack";
import busuanzi from "busuanzi.pure.js";

import VisitorPanel from "./components/VisitorPanel.vue";
import "vitepress-plugin-nprogress/lib/css/index.css";
import "virtual:group-icons.css";
import "@vitepress-code-preview/container/dist/style.css";
import "vitepress-plugin-sandpack/dist/style.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp(ctx) {
    const { app, router, siteData } = ctx;
    enhanceAppWithTabs(app);
    vitepressNprogress(ctx);

    useComponents(ctx.app, DemoPreview);

    app.component("Sandbox", Sandbox);
    app.component("VisitorPanel", VisitorPanel);

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
} satisfies Theme;
