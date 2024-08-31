// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import vitepressNprogress from "vitepress-plugin-nprogress";
import Layout from "./Layout.vue";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

import "./style.css";
import "vitepress-plugin-nprogress/lib/css/index.css";
import "virtual:group-icons.css";

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
  },
} satisfies Theme;
