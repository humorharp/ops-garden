import { Root, Element, ElementContent } from "hast";

/** Apply only to visible prose, after heading IDs and search metadata are generated. */
export function brandProse(root: Root | Element) {
  if (
    root.type === "element" &&
    (["script", "style", "pre", "code", "textarea", "svg"].includes(
      root.tagName,
    ) ||
      String(root.properties.className ?? "").includes("chatir-wordmark"))
  )
    return;
  const children: ElementContent[] = [];
  for (const node of root.children) {
    if (node.type === "text") {
      for (const part of node.value.split(/(\bchatIR\b)/g)) {
        children.push(
          part === "chatIR"
            ? {
                type: "element",
                tagName: "span",
                properties: { className: ["chatir-wordmark"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["chatir-wordmark__chat"] },
                    children: [{ type: "text", value: "chat" }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["chatir-wordmark__ir"] },
                    children: [{ type: "text", value: "IR" }],
                  },
                ],
              }
            : { type: "text", value: part },
        );
      }
    } else if (node.type === "element") {
      brandProse(node);
      children.push(node);
    } else if (node.type === "comment") children.push(node);
  }
  root.children = children;
}
