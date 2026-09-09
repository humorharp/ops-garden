import { brandText } from "./ChatIRWordmark";
import { QuartzComponentProps } from "./types";
import { resolveRelative } from "../util/path";

// Editorial connections, not a popularity ranking. Only published targets render.
const nextNotes: Record<string, [string, string]> = {
  "what-the-form-cannot-see": [
    "incident-reports-can-be-accurate-and-still-incomplete",
    "Follow the gap between a correct record and a useful explanation.",
  ],
  "incident-reports-can-be-accurate-and-still-incomplete": [
    "the-debrief",
    "The form ends. The questions do not.",
  ],
  "the-debrief": [
    "stop-being-the-answer",
    "Asking better questions also changes how you lead.",
  ],
  "stop-being-the-answer": [
    "build-the-sprinkler-system",
    "Once you stop being the answer, what needs to take your place?",
  ],
  "build-the-sprinkler-system": [
    "a-problem-passed-around-is-owned-by-nobody",
    "Prevention needs someone to own it. A crowded email thread does not count.",
  ],
  "a-problem-passed-around-is-owned-by-nobody": [
    "operational-metrics",
    "With an owner in place, how do you know the work is helping?",
  ],
  "operational-metrics": [
    "recognition-is-evidence-of-attention",
    "The numbers you watch are only part of what people notice you noticing.",
  ],
  "recognition-is-evidence-of-attention": [
    "leadership-philosophy",
    "What your attention says about the kind of leader you are.",
  ],
  "leadership-philosophy": [
    "first-90-days",
    "Put the philosophy to work when you are new to the operation.",
  ],
  "first-90-days": [
    "hard-conversations",
    "Listening comes first. Eventually, so does the conversation you would rather avoid.",
  ],
  "hard-conversations": [
    "training-ftos",
    "Carry that clarity into the way people learn the work.",
  ],
  "training-ftos": [
    "fleet-safety",
    "Training is one part of a system. Here is a concrete place to look at the rest.",
  ],
  "fleet-safety": [
    "chatir",
    "How questions about everyday operations led into building chatIR.",
  ],
  chatir: [
    "open-questions",
    "The unresolved questions matter as much as the product direction.",
  ],
  "open-questions": [
    "what-the-form-cannot-see",
    "Start with one question: what does the record leave out?",
  ],
  tools: [
    "build-the-sprinkler-system",
    "The thinking behind tools that make the next rescue less necessary.",
  ],
};

export default function ReadNext({ fileData, allFiles }: QuartzComponentProps) {
  const connection = nextNotes[fileData.slug ?? ""];
  if (!connection) return null;
  const [slug, reason] = connection;
  const next = allFiles.find((file) => file.slug === slug);
  if (!next?.slug || !next.frontmatter?.title) return null;
  const index = allFiles.find((file) => file.slug === "index");
  return (
    <nav class="read-next" aria-label="Keep reading">
      <p class="read-next-eyebrow">Keep following the thought</p>
      <a
        class="read-next-link internal"
        href={resolveRelative(fileData.slug!, next.slug)}
      >
        <span class="read-next-label">Read next</span>
        <span class="read-next-title">{brandText(next.frontmatter.title)}</span>
        <svg
          class="read-next-arrow"
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path d="M6 16h20M18 8l8 8-8 8" />
        </svg>
      </a>
      <p class="read-next-reason">{brandText(reason)}</p>
      {index?.slug && (
        <a
          class="read-next-all internal"
          href={
            resolveRelative(fileData.slug!, index.slug) + "#selected-writing"
          }
        >
          Or find another line of thought →
        </a>
      )}
    </nav>
  );
}
