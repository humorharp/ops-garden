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
              viewBox="0 0 900 500"
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
                  d="M30 260 H270 Q286 260 298 248 L444 102 Q456 90 474 90 H870"
                />
                <path
                  class="route-teal"
                  d="M30 276 H277 Q293 276 305 264 L411 158 Q423 146 441 146 H870"
                />
                <path
                  class="route-amber"
                  d="M30 292 H284 Q300 292 312 280 L378 214 Q390 202 408 202 H496 Q512 202 512 218 V302 Q512 318 528 318 H870"
                />
                <path
                  class="route-violet"
                  d="M30 308 H291 Q307 308 319 296 L345 270 Q357 258 375 258 H420 Q436 258 436 274 V414 Q436 430 452 430 H870"
                />
              </g>
              <g class="transit-stations">
                <a
                  href="/the-debrief"
                  aria-label="The Debrief: shared station for operational learning and leadership"
                >
                  <rect
                    x="40"
                    y="211"
                    width="140"
                    height="73"
                    fill="transparent"
                  />
                  <rect
                    class="shared-station"
                    x="78"
                    y="253"
                    width="16"
                    height="30"
                    rx="8"
                  />
                  <text x="44" y="234">
                    The debrief
                  </text>
                </a>
                <a
                  href="/open-questions"
                  aria-label="Open Questions: interchange for all four routes"
                >
                  <rect
                    x="153"
                    y="250"
                    width="146"
                    height="110"
                    fill="transparent"
                  />
                  <rect
                    class="shared-station"
                    x="194"
                    y="251"
                    width="20"
                    height="66"
                    rx="10"
                  />
                  <text x="155" y="346">
                    Open questions
                  </text>
                </a>
                <a
                  href="/incident-reports-can-be-accurate-and-still-incomplete"
                  aria-label="An incomplete record"
                >
                  <rect
                    x="440"
                    y="42"
                    width="200"
                    height="63"
                    fill="transparent"
                  />
                  <circle cx="540" cy="90" r="7" />
                  <text x="540" y="62" text-anchor="middle">
                    An incomplete record
                  </text>
                </a>
                <a
                  href="/what-the-form-cannot-see"
                  aria-label="What the form can’t see"
                >
                  <rect
                    x="665"
                    y="42"
                    width="200"
                    height="63"
                    fill="transparent"
                  />
                  <circle cx="765" cy="90" r="7" />
                  <text x="765" y="62" text-anchor="middle">
                    What the form can’t see
                  </text>
                </a>
                <a
                  href="/stop-being-the-answer"
                  aria-label="Stop being the answer"
                >
                  <rect
                    x="440"
                    y="126"
                    width="200"
                    height="68"
                    fill="transparent"
                  />
                  <circle cx="540" cy="146" r="7" />
                  <text x="540" y="179" text-anchor="middle">
                    Stop being the answer
                  </text>
                </a>
                <a
                  href="/recognition-is-evidence-of-attention"
                  aria-label="Recognition &amp; attention"
                >
                  <rect
                    x="665"
                    y="126"
                    width="200"
                    height="68"
                    fill="transparent"
                  />
                  <circle cx="765" cy="146" r="7" />
                  <text x="765" y="179" text-anchor="middle">
                    Recognition &amp; attention
                  </text>
                </a>
                <a
                  href="/build-the-sprinkler-system"
                  aria-label="Build the sprinkler system"
                >
                  <rect
                    x="520"
                    y="265"
                    width="200"
                    height="68"
                    fill="transparent"
                  />
                  <circle cx="620" cy="318" r="7" />
                  <text x="620" y="285" text-anchor="middle">
                    Build the sprinkler system
                  </text>
                </a>
                <a href="/operational-metrics" aria-label="Operational metrics">
                  <rect
                    x="675"
                    y="298"
                    width="200"
                    height="74"
                    fill="transparent"
                  />
                  <circle cx="775" cy="318" r="7" />
                  <text x="775" y="357" text-anchor="middle">
                    Operational metrics
                  </text>
                </a>
                <a href="/tools" aria-label="Field tools">
                  <rect
                    x="435"
                    y="410"
                    width="200"
                    height="70"
                    fill="transparent"
                  />
                  <circle cx="535" cy="430" r="7" />
                  <text x="535" y="465" text-anchor="middle">
                    Field tools
                  </text>
                </a>
                <a href="/chatir" aria-label="Building chatIR">
                  <rect
                    x="585"
                    y="379"
                    width="200"
                    height="66"
                    fill="transparent"
                  />
                  <circle cx="685" cy="430" r="7" />
                  <text x="685" y="399" text-anchor="middle">
                    Building chatIR
                  </text>
                </a>
                <a href="/fleet-safety" aria-label="Fleet safety">
                  <rect
                    x="715"
                    y="410"
                    width="200"
                    height="70"
                    fill="transparent"
                  />
                  <circle cx="815" cy="430" r="7" />
                  <text x="815" y="465" text-anchor="middle">
                    Fleet safety
                  </text>
                </a>
              </g>{" "}
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
      <section class="shared-reading" aria-labelledby="shared-reading-title">
        <h2 id="shared-reading-title">Where the lines meet</h2>
        <div class="shared-reading-notes">
          <p>
            <a href="/open-questions">Open Questions</a> is the interchange:
            leadership judgment, incomplete records, hidden system debt, and the
            boundaries of AI.
          </p>
          <p>
            <a href="/the-debrief">The Debrief</a> connects leadership and
            operational learning through the practice of asking better
            questions.
          </p>
          <p>
            <a href="/build-the-sprinkler-system">Build the Sprinkler System</a>{" "}
            bridges leadership, prevention, and product-building: how do we stop
            depending on the same people to make the same save?
          </p>
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
