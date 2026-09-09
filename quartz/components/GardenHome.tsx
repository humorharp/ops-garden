import { brandText, ChatIRWordmark } from "./ChatIRWordmark";
import ReadingConstellation from "./ReadingConstellation";
import RecordIllustration from "./RecordIllustration";
import { gardenNavigation } from "./gardenNavigation";
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
            <a href="https://chatir.io/">
              <ChatIRWordmark />
            </a>
            . Some are practical. Some are still taking shape. This is where
            they meet.
          </p>
          <div class="garden-actions">
            <a class="garden-primary" href="#selected-writing">
              Start reading
            </a>
            <a href="/garden-map">Garden Map</a>
            <a href="#browse-garden">Browse by topic</a>
          </div>
        </div>
        <div class="idea-map-wrap">
          <ReadingConstellation />
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
      <details class="shared-reading">
        <summary>Explore the connections between these notes</summary>
        <div class="shared-reading-notes">
          <p>
            <a href="/open-questions">Open Questions</a> connects all four
            themes: leadership judgment, incomplete records, hidden system debt,
            and the boundaries of AI.
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
      </details>
      <section class="featured-note">
        <RecordIllustration />
        <div class="featured-note-copy">
          <p class="garden-byline">A question at the center</p>
          <h2>
            <a href="/what-the-form-cannot-see">
              {String(
                featured?.frontmatter?.title ?? "What the Form Can’t See",
              )}
            </a>
          </h2>
          <p>
            What do incident forms make visible, and what stays in the
            narrative? A working note on the limits of the record and the
            questions behind <ChatIRWordmark />.
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
                <a href={`/${route.slug}`}>{brandText(route.title)}</a>
              </h3>
              <p>{route.description}</p>
              <a class="read-note" href={`/${route.slug}`}>
                Read the note
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
            <a href="https://chatir.io/">
              <ChatIRWordmark />
            </a>
            .
          </p>
        </div>
      </section>
      <nav
        id="browse-garden"
        class="home-garden-browser"
        aria-labelledby="browse-garden-title"
      >
        <div class="garden-section-title">
          <h2 id="browse-garden-title">Browse the garden</h2>
          <a href="/garden-map">Open the Garden Map</a>
        </div>
        <ul class="garden-orientation">
          {gardenNavigation.orientation.map((link) => (
            <li>
              <a href={`/${link.slug}`}>{brandText(link.title)}</a>
            </li>
          ))}
        </ul>
        <div class="garden-topic-groups">
          {gardenNavigation.groups.map((group) => (
            <details>
              <summary>{brandText(group.title)}</summary>
              <ul>
                {group.links.map((link) => (
                  <li>
                    <a href={`/${link.slug}`}>{brandText(link.title)}</a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </nav>
      <div class="graph-intro">
        <h2>The actual connections</h2>
        <p>
          The graph below follows links between published notes. It is separate
          from the curated connections above.
        </p>
      </div>
    </article>
  );
};
export default GardenHome;
