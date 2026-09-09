const nodes = [
  {
    id: "questions",
    slug: "open-questions",
    label: "Open questions",
    x: 450,
    y: 250,
    color: "blue",
    hub: true,
  },
  {
    id: "debrief",
    slug: "the-debrief",
    label: "The debrief",
    x: 335,
    y: 245,
    color: "teal",
    hub: true,
  },
  {
    id: "record",
    slug: "incident-reports-can-be-accurate-and-still-incomplete",
    label: "An incomplete record",
    x: 270,
    y: 95,
    color: "blue",
  },
  {
    id: "form",
    slug: "what-the-form-cannot-see",
    label: "What the form can’t see",
    x: 455,
    y: 60,
    color: "blue",
  },
  {
    id: "answer",
    slug: "stop-being-the-answer",
    label: "Stop being the answer",
    x: 185,
    y: 245,
    color: "teal",
  },
  {
    id: "recognition",
    slug: "recognition-is-evidence-of-attention",
    label: "Recognition & attention",
    x: 265,
    y: 400,
    color: "teal",
  },
  {
    id: "sprinkler",
    slug: "build-the-sprinkler-system",
    label: "Build the sprinkler system",
    x: 560,
    y: 235,
    color: "amber",
    hub: true,
  },
  {
    id: "metrics",
    slug: "operational-metrics",
    label: "Operational metrics",
    x: 650,
    y: 95,
    color: "amber",
  },
  {
    id: "tools",
    slug: "tools",
    label: "Field tools",
    x: 455,
    y: 435,
    color: "violet",
  },
  {
    id: "chatir",
    slug: "chatir",
    label: "Building chatIR",
    x: 640,
    y: 395,
    color: "violet",
  },
  {
    id: "fleet",
    slug: "fleet-safety",
    label: "Fleet safety",
    x: 740,
    y: 280,
    color: "violet",
  },
];
const edges = [
  ["record", "debrief", "blue"],
  ["debrief", "form", "blue"],
  ["form", "questions", "blue"],
  ["answer", "debrief", "teal"],
  ["debrief", "questions", "teal"],
  ["questions", "recognition", "teal"],
  ["questions", "sprinkler", "amber"],
  ["sprinkler", "metrics", "amber"],
  ["sprinkler", "fleet", "amber"],
  ["questions", "tools", "violet"],
  ["tools", "chatir", "violet"],
  ["chatir", "sprinkler", "violet"],
  ["chatir", "fleet", "violet"],
];
export default function ReadingConstellation() {
  return (
    <div class="constellation-panel">
      <div class="map-caption">
        <h2>A constellation of ideas</h2>
        <button type="button" class="constellation-reset">
          Reset positions
        </button>
      </div>
      <p class="constellation-help">
        Follow a title to read.{" "}
        <span class="drag-help">
          Pull a dot and its neighbors follow. Arrow keys work too.
        </span>
      </p>
      <div
        class="constellation-viewport"
        tabIndex={0}
        aria-label="Connected ideas; scroll horizontally on small screens"
      >
        <svg
          class="reading-constellation"
          viewBox="0 0 900 500"
          role="group"
          aria-labelledby="constellation-title constellation-desc"
        >
          <title id="constellation-title">Connected reading ideas</title>
          <desc id="constellation-desc">
            Curated thematic connections between eleven published notes. Larger
            dots mark ideas that connect several topics. Titles link to notes.
          </desc>
          <g class="constellation-edges" fill="none">
            {edges.map(([from, to, color]) => {
              const a = nodes.find((n) => n.id === from)!;
              const b = nodes.find((n) => n.id === to)!;

              return (
                <path
                  key={from + to}
                  class={"route-" + color}
                  data-from={from}
                  data-to={to}
                  d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                />
              );
            })}
          </g>
          {nodes.map((n) => (
            <g
              key={n.id}
              class={"idea-node " + n.color + (n.hub ? " idea-hub" : "")}
              data-node={n.id}
              data-x={n.x}
              data-y={n.y}
              transform={`translate(${n.x} ${n.y})`}
            >
              <circle class="idea-halo" r={n.hub ? 23 : 14} />
              <circle class="idea-dot" r={n.hub ? 10 : 6} />
              <circle
                class="idea-handle"
                r="22"
                tabIndex={0}
                role="button"
                aria-label={"Move " + n.label}
              />
              <a href={"/" + n.slug}>
                <text
                  text-anchor={
                    n.id === "debrief"
                      ? "end"
                      : n.id === "sprinkler"
                        ? "start"
                        : "middle"
                  }
                  x={n.id === "debrief" ? -20 : n.id === "sprinkler" ? 20 : 0}
                  y={n.id === "questions" ? 65 : n.hub ? 43 : 32}
                >
                  {n.label}
                </text>
              </a>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
