/** Visible presentation only: keep metadata, URLs and search indexing plain text. */
export function ChatIRWordmark({ display = false }: { display?: boolean }) {
  return (
    <span
      class={`chatir-wordmark${display ? " chatir-wordmark--display" : ""}`}
    >
      <span class="chatir-wordmark__chat">chat</span>
      <span class="chatir-wordmark__ir">IR</span>
    </span>
  );
}

export function brandText(text: string | undefined) {
  return text
    ?.split(/(\bchatIR\b)/g)
    .map((part, i) => (part === "chatIR" ? <ChatIRWordmark key={i} /> : part));
}
