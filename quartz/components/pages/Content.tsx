// @ts-ignore: bundled by Quartz as a browser script
import constellationScript from "../scripts/constellation.inline";
import { ComponentChildren } from "preact";
import { htmlToJsx } from "../../util/jsx";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../types";
import GardenHome from "../GardenHome";
import ReadNext from "../ReadNext";
import { Root } from "hast";

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
  const content = htmlToJsx(fileData.filePath!, bodyTree) as ComponentChildren;
  const classes: string[] = fileData.frontmatter?.cssclasses ?? [];
  const classString = ["popover-hint", ...classes].join(" ");
  return (
    <>
      <article class={classString}>{content}</article>
      <ReadNext {...props} />
    </>
  );
};

Content.afterDOMLoaded = constellationScript;
export default (() => Content) satisfies QuartzComponentConstructor;
