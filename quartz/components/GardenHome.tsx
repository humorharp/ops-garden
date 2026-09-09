import { QuartzComponent, QuartzComponentProps } from "./types";

const routes = [
  {
    name: "Operational learning",
    color: "blue",
    slug: "incident-reports-can-be-accurate-and-still-incomplete",
    title: "The Report Was Accurate. It Was Still Incomplete.",
    description:
      "A record can serve its original purpose and still leave another question unanswered.",
  },
  {
    name: "Leadership",
    color: "teal",
    slug: "stop-being-the-answer",
    title: "Stop Being the Answer",
    description:
      "What changes when helping the team means developing judgment instead of supplying answers?",
  },
  {
    name: "Systems",
    color: "amber",
    slug: "build-the-sprinkler-system",
    title: "Build the Sprinkler System",
    description:
      "Getting good at recovery can make the need for prevention harder to see.",
  },
  {
    name: "Building",
    color: "violet",
    slug: "chatir",
    title: "The questions behind chatIR",
    description:
      "Working notes on the product, its boundaries, and what still needs to be learned.",
  },
];

const GardenHome: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const featured = allFiles.find(
    (file) => file.slug === "what-the-form-cannot-see",
  );
  return (
    <article class="garden-home">
      <section class="garden-intro">
        <div class="garden-intro-copy">
          <p class="garden-byline">Christopher Harper’s professional garden</p>
          <h1>
            Follow a question.
            <br />
            See where it connects.
          </h1>
          <p class="garden-deck">
            Notes on people, operations, and the systems we build around them.
          </p>
          <p>
            Ideas from EMS, leadership, reading, and building{" "}
            <a href="https://chatir.io/">chatIR</a>. Some are practical. Some
            are still taking shape. This is where they meet.
          </p>
          <div class="garden-actions">
            <a class="garden-primary" href="#selected-writing">
              Start reading
            </a>
            <a href="/about-these-notes">About this garden</a>
          </div>
        </div>
        <div class="transit-panel">
          <div class="map-caption">
            <h2>A few ways through</h2>
            <span>Curated reading routes</span>
          </div>
          <div
            class="transit-map-viewport"
            tabindex={0}
            aria-label="Reading route map; scroll horizontally on small screens"
          >
            <svg
              viewBox="0 0 560 390"
              role="group"
              aria-labelledby="transit-title transit-desc"
            >
              <title id="transit-title">Four connected reading routes</title>
              <desc id="transit-desc">
                Leadership, operational learning, systems, and building meet
                around the question of how organizations learn. Each named stop
                links to an essay. These are editorial reading routes; the
                note-link graph appears below.
              </desc>
              <g
                fill="none"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  class="route-blue"
                  d="M24 264 H168 Q184 264 196 252 L322 126 Q334 114 334 96 V28"
                />
                <path
                  class="route-teal"
                  d="M24 278 H174 Q190 278 202 266 L344 124 Q356 112 372 112 H532"
                />
                <path
                  class="route-amber"
                  d="M24 292 H180 Q196 292 208 280 L328 160 Q340 148 356 148 H438 Q454 148 454 164 V238 Q454 254 470 254 H532"
                />
                <path
                  class="route-violet"
                  d="M24 306 H186 Q202 306 214 294 L314 194 Q326 182 342 182 H378 Q394 182 394 198 V334 Q394 350 410 350 H532"
                />
              </g>
              <g class="transit-stations">
                <a
                  href="/incident-reports-can-be-accurate-and-still-incomplete"
                  aria-label="Operational learning: The Report Was Accurate. It Was Still Incomplete."
                >
                  <rect
                    x="35"
                    y="213"
                    width="220"
                    height="62"
                    fill="transparent"
                  />
                  <circle cx="92" cy="264" r="7" />
                  <text x="36" y="236">
                    An incomplete record
                  </text>
                </a>
                <a
                  href="/what-the-form-cannot-see"
                  aria-label="Operational learning: What the Form Can't See"
                >
                  <rect
                    x="30"
                    y="34"
                    width="317"
                    height="53"
                    fill="transparent"
                  />
                  <circle cx="334" cy="60" r="7" />
                  <text x="310" y="65" text-anchor="end">
                    What the form can’t see
                  </text>
                </a>
                <a
                  href="/stop-being-the-answer"
                  aria-label="Leadership: Stop Being the Answer"
                >
                  <rect
                    x="352"
                    y="66"
                    width="192"
                    height="60"
                    fill="transparent"
                  />
                  <circle cx="490" cy="112" r="7" />
                  <text x="540" y="88" text-anchor="end">
                    Stop being the answer
                  </text>
                </a>
                <a href="/the-debrief" aria-label="Leadership: The Debrief">
                  <rect
                    x="34"
                    y="308"
                    width="152"
                    height="65"
                    fill="transparent"
                  />
                  <circle cx="92" cy="278" r="7" />
                  <text x="36" y="349">
                    The debrief
                  </text>
                </a>
                <a
                  href="/build-the-sprinkler-system"
                  aria-label="Systems: Build the Sprinkler System"
                >
                  <rect
                    x="328"
                    y="267"
                    width="216"
                    height="38"
                    fill="transparent"
                  />
                  <circle cx="490" cy="254" r="7" />
                  <text x="540" y="286" text-anchor="end">
                    Build the sprinkler system
                  </text>
                </a>
                <a href="/chatir" aria-label="Building: chatIR">
                  <rect
                    x="402"
                    y="311"
                    width="140"
                    height="53"
                    fill="transparent"
                  />
                  <circle cx="490" cy="350" r="7" />
                  <text x="540" y="326" text-anchor="end">
                    Building chatIR
                  </text>
                </a>
                <a href="/open-questions" aria-label="Open Questions">
                  <rect
                    x="144"
                    y="141"
                    width="171"
                    height="48"
                    fill="transparent"
                  />
                  <text x="152" y="170">
                    Open questions ↗
                  </text>
                </a>
              </g>
            </svg>
          </div>
          <ul class="route-legend">
            {routes.map((route) => (
              <li>
                <a
                  class={`route-label ${route.color}`}
                  href={`#route-${route.color}`}
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section class="featured-note">
        <div>
          <p class="garden-byline">A question at the center</p>
          <h2>
            <a href="/what-the-form-cannot-see">
              {String(
                featured?.frontmatter?.title ?? "What the Form Can’t See",
              )}
            </a>
          </h2>
        </div>
        <div>
          <p>
            What do incident forms make visible, and what stays in the
            narrative? A working note on the limits of the record and the
            questions behind chatIR.
          </p>
          <a href="/what-the-form-cannot-see">Read the working note</a>
        </div>
      </section>
      <section id="selected-writing" class="selected-writing">
        <div class="garden-section-title">
          <h2>Choose a line of thought</h2>
          <a href="/garden-map">Browse the whole garden</a>
        </div>
        <div class="route-articles">
          {routes.map((route) => (
            <article
              id={`route-${route.color}`}
              class={`route-article ${route.color}`}
            >
              <p class={`route-label ${route.color}`}>{route.name}</p>
              <h3>
                <a href={`/${route.slug}`}>{route.title}</a>
              </h3>
              <p>{route.description}</p>
              <a class="read-note" href={`/${route.slug}`}>
                Read the note <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section class="garden-outposts">
        <div>
          <h2>Bring it back to the work.</h2>
          <p>
            The <a href="/tools">field tools</a> turn some of these ideas into
            something you can use. <a href="/open-questions">Open questions</a>{" "}
            collects what I haven’t resolved. The links between notes preserve
            how the thinking develops.
          </p>
        </div>
        <div>
          <p>
            For my background and earlier projects, visit{" "}
            <a href="https://christopherjharper.com/">christopherjharper.com</a>
            . For the software growing from part of this work, explore{" "}
            <a href="https://chatir.io/">chatIR</a>.
          </p>
        </div>
      </section>
      <div class="graph-intro">
        <h2>The actual connections</h2>
        <p>
          The graph below follows links between published notes. It is separate
          from the curated reading routes above.
        </p>
      </div>
    </article>
  );
};
export default GardenHome;
