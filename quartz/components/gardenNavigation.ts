import type { CuratedNavigation } from "./Explorer";

export const gardenNavigation: CuratedNavigation = {
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
        {
          title: "Build the Sprinkler System",
          slug: "build-the-sprinkler-system",
        },
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
};
