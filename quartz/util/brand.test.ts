import { test } from "node:test";
import assert from "node:assert/strict";
import { Root } from "hast";
import { toHtml } from "hast-util-to-html";
import { brandProse } from "./brand";

test("brands prose without touching links, code, identifiers, or introducing whitespace", () => {
  const tree: Root = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "a",
        properties: { href: "https://chatir.io/?q=chatIR", id: "chatIR" },
        children: [{ type: "text", value: "Explore chatIR today" }],
      },
      {
        type: "element",
        tagName: "code",
        properties: {},
        children: [{ type: "text", value: "chatIR" }],
      },
      { type: "text", value: " chatIRish is a different token." },
    ],
  };
  brandProse(tree);
  const once = toHtml(tree);
  assert.match(once, /href="https:\/\/chatir.io\/\?q=chatIR" id="chatIR"/);
  assert.match(
    once,
    />chat<\/span><span class="chatir-wordmark__ir">IR<\/span>/,
  );
  assert.match(once, /<code>chatIR<\/code>/);
  assert.match(once, /chatIRish is a different token/);
  brandProse(tree);
  assert.equal(toHtml(tree), once, "formatting is idempotent");
});
