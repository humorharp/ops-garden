import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4 Configuration
 * Christopher Harper — Ops Knowledge Garden
 * https://garden.christopherjharper.com
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ops Knowledge Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "google", tagId: "G-YE0DRC8G1R" },
    locale: "en-US",
    baseUrl: "garden.christopherjharper.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#0d1726",
          lightgray: "#263a50",
          gray: "#7d91a9",
          darkgray: "#c6d3e2",
          dark: "#edf4fd",
          secondary: "#6ab2ef",
          tertiary: "#56c5b5",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0d1726",
          lightgray: "#263a50",
          gray: "#7d91a9",
          darkgray: "#c6d3e2",
          dark: "#edf4fd",
          secondary: "#6ab2ef",
          tertiary: "#56c5b5",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
};

export default config;
