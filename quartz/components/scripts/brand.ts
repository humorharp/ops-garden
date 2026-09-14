/** Format newly created UI labels only. No page-wide mutation or HTML injection. */
export function brandLabel(element: HTMLElement) {
  if (
    ["SCRIPT", "STYLE", "CODE", "PRE"].includes(element.tagName) ||
    element.classList.contains("chatir-wordmark")
  )
    return;
  for (const child of Array.from(element.childNodes)) {
    if (
      child.nodeType === Node.TEXT_NODE &&
      /\bchatIR\b/.test(child.textContent ?? "")
    ) {
      const fragment = document.createDocumentFragment();
      for (const text of (child.textContent ?? "").split(/(\bchatIR\b)/g)) {
        if (text !== "chatIR") {
          fragment.append(document.createTextNode(text));
          continue;
        }
        const mark = document.createElement("span");
        mark.className = "chatir-wordmark";
        for (const [part, value] of [
          ["chat", "chat"],
          ["ir", "IR"],
        ]) {
          const letter = document.createElement("span");
          letter.className = `chatir-wordmark__${part}`;
          letter.textContent = value;
          mark.append(letter);
        }
        fragment.append(mark);
      }
      child.replaceWith(fragment);
    } else if (child instanceof HTMLElement) brandLabel(child);
  }
}
