import { gardenNavigation } from "./quartz/components/gardenNavigation";
import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

const gardenExplorer = () =>
  Component.Explorer({
    title: "Browse the garden",
    curated: gardenNavigation,
  });

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.GardenAnalytics, Component.ReadingVine],
  footer: Component.Footer({
    links: {
      "About these notes": "/about-these-notes",
      "Garden map": "/garden-map",
      "Christopher Harper":
        "https://christopherjharper.com",
      chatIR:
        "https://chatir.io",
      Privacy: "/privacy",
      "Source on GitHub": "https://github.com/humorharp/ops-garden",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },

        { Component: Component.ReaderMode() },
      ],
    }),
    gardenExplorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    gardenExplorer(),
  ],
  right: [],
};
