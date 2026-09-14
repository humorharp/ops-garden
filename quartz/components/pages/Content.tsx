import { brandProse } from "../../util/brand";
// @ts-ignore: bundled by Quartz as a browser script
import constellationScript from "../scripts/constellation.inline";
// @ts-ignore: bundled by Quartz as a browser script
import readingGlassScript from "../scripts/reading-glass.inline";
import { ComponentChildren } from "preact";
import { htmlToJsx } from "../../util/jsx";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../types";
import GardenHome from "../GardenHome";
import ReadNext from "../ReadNext";
import { Root, Element } from "hast";

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props;
  if (fileData.slug === "index") return <GardenHome {...props} />;
  const bodyTree = structuredClone(tree) as Root;
  const firstHeading = bodyTree.children.find(
    (node) => node.type === "element" && node.tagName === "h1",
  );
  if (firstHeading?.type === "element") {
    const headingText = firstHeading.children
      .map((node) => (node.type === "text" ? node.value : ""))
      .join("")
      .trim();
    if (
      headingText.replace(/[\u2018\u2019]/g, "'") ===
      String(fileData.frontmatter?.title ?? "").replace(/[\u2018\u2019]/g, "'")
    ) {
      // Keep existing fragment destinations without repeating the page title.
      firstHeading.tagName = "div";
      firstHeading.properties = { ...firstHeading.properties, hidden: true };
    }
  }
  // Local design trial: each section bounds its own sticky heading.
  if (fileData.slug === "what-the-form-cannot-see") {
    const children = bodyTree.children;
    bodyTree.children = [];
    let section: Element | undefined;
    for (const child of children) {
      if (child.type === "element" && child.tagName === "h2") {
        section = {
          type: "element",
          tagName: "section",
          properties: { className: ["reading-section"] },
          children: [],
        };
        bodyTree.children.push(section);
      }
      if (section) section.children.push(child as Element["children"][number]);
      else bodyTree.children.push(child);
    }
  }
  brandProse(bodyTree);
  const content = htmlToJsx(fileData.filePath!, bodyTree) as ComponentChildren;
  const classes: string[] = fileData.frontmatter?.cssclasses ?? [];
  const classString = ["popover-hint", "garden-essay", ...classes].join(" ");
  return (
    <>
      <article class={classString}>{content}</article>
      <ReadNext {...props} />
    </>
  );
};

Content.afterDOMLoaded = constellationScript + "\n" + readingGlassScript;
export default (() => Content) satisfies QuartzComponentConstructor;
