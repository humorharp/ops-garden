import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const gardenExplorer = () =>
  Component.Explorer({
    title: "Browse the garden",
    curated: {
      home: { title: "Home", slug: "index" },
      orientation: [
        { title: "Garden Map", slug: "garden-map" },
        { title: "About These Notes", slug: "about-these-notes" },
        { title: "Open Questions", slug: "open-questions" },
      ],
      groups: [
        {
          title: "Leadership & development",
          links: [
            { title: "First 90 Days", slug: "first-90-days" },
            { title: "Leadership Philosophy", slug: "leadership-philosophy" },
            { title: "Stop Being the Answer", slug: "stop-being-the-answer" },
            { title: "Training FTOs", slug: "training-ftos" },
            { title: "Hard Conversations", slug: "hard-conversations" },
            {
              title: "Recognition Is Evidence of Attention",
              slug: "recognition-is-evidence-of-attention",
            },
          ],
        },
        {
          title: "Safety & operational learning",
          links: [
            { title: "Build the Sprinkler System", slug: "build-the-sprinkler-system" },
            { title: "Fleet Safety", slug: "fleet-safety" },
            { title: "The Debrief", slug: "the-debrief" },
            {
              title: "A Problem Passed Around Is Owned by Nobody",
              slug: "a-problem-passed-around-is-owned-by-nobody",
            },
            {
              title: "An Accurate Report Can Still Be Incomplete",
              slug: "incident-reports-can-be-accurate-and-still-incomplete",
            },
          ],
        },
        {
          title: "Systems, tools & chatIR",
          links: [
            { title: "Operational Metrics", slug: "operational-metrics" },
            { title: "Field Tools", slug: "tools" },
            { title: "chatIR", slug: "chatir" },
          ],
        },
      ],
    },
  })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "About these notes": "/about-these-notes",
      "Garden map": "/garden-map",
      "Christopher Harper": "https://christopherjharper.com",
      "Source on GitHub": "https://github.com/humorharp/ops-garden",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
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
        { Component: Component.Darkmode() },
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
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    gardenExplorer(),
  ],
  right: [],
}
