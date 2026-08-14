# Ops Knowledge Garden — Wiki Pass Implementation Report

Date: 2026-08-14

## Outcome

The public Garden was reshaped from a ten-page web field guide into an eighteen-page curated public wiki. Existing practical pages remain, but they now sit inside a connected body of working thought about supervision, operational systems, safety learning, and the development of chatIR.

The implementation was built and reviewed locally before publication. Chris retained the publication decision and later approved the Garden for publication through the follow-up copy pass recorded below.

## Baseline preserved

The source repository already contained uncommitted edits changing the product name from `ChatIR` to `chatIR` in six authored Markdown files, plus generated Quartz output. Those changes were treated as the baseline and preserved.

No reset, checkout, stash, or destructive Git command was used.

## New public pages

- `about-these-notes.md`
- `garden-map.md`
- `open-questions.md`
- `stop-being-the-answer.md`
- `a-problem-passed-around-is-owned-by-nobody.md`
- `recognition-is-evidence-of-attention.md`
- `incident-reports-can-be-accurate-and-still-incomplete.md`
- `build-the-sprinkler-system.md`

## Existing pages tended

All ten existing public pages received common public-wiki metadata: aliases, descriptions, note type, maturity status, created date, and last-tended date.

The substantive pass:

- rewrote the homepage as a doorway into a curated thinking environment;
- rewrote the chatIR page as a working product thesis with explicit human-review and uncertainty boundaries;
- connected every practical page to the new concept layer;
- added origins, limitations, or unresolved edges where the earlier page sounded final;
- corrected overconfident language around debrief outcomes, telematics, documentation patterns, and training absolutes;
- reduced repeated sales calls to a few appropriate doorways;
- removed a named colleague from the public leadership story;
- retained Royal only in already-public statements about Chris's own work history and verified accident-reduction project.

## Reader-system changes

- Page maturity is visible as Reference, Evergreen, Growing, or Seedling.
- The displayed date is the last-tended date rather than only the original creation date.
- The footer points to About These Notes, the Garden Map, Christopher's site, and the Garden's own GitHub source.
- Quartz graph, backlinks, popovers, search, and ordinary page navigation remain in place. No sliding-pane interface was added.

## Validation targets

- Public pages: 18
- Internal wikilinks: 177
- Unresolved internal wikilinks before installation: 0
- Private filesystem paths in public content: 0
- Named employees, patients, or customers introduced: 0
- Private Obsidian source notes modified: 0
- Public deployment performed during the initial verification: no

## Verification completed

- `npx quartz build` completed successfully and regenerated the public site.
- All 18 expected article HTML files were generated.
- The generated search index contains the new notes.
- The homepage renders its Reference-note badge, last-tended date, About link, and Garden Map link.
- A growing note renders its visible maturity badge.
- A post-build link audit found 177 wikilinks and 0 unresolved targets.
- A post-build privacy scan found 0 private filesystem or provenance-path markers in public Markdown.

`npm run check` does not currently pass. It reports repository-wide TypeScript configuration errors involving existing Quartz SCSS imports and browser globals in many untouched framework files. The production Quartz build succeeds, and this pass did not attempt to repair unrelated framework configuration. Treat that check as a pre-existing maintenance item rather than evidence of a broken Garden build.

## Private provenance used for the new synthesis

Private source paths are listed here for governance and are not copied into public content.

- Stop Being the Answer: `24HourHomeCare/01 Daily Notes/2025-08-29 0909.md`; existing public Leadership Philosophy.
- A Problem Passed Around Is a Problem Owned by Nobody: `24HourHomeCare/01 Daily Notes/2025-10-21 0927 Peak.md`.
- Recognition Is Evidence of Attention: `personal/stoic export.txt` (2021 recognition reflection); `24HourHomeCare/01 Daily Notes/2026-01-14 0910 gratitude.md`.
- The Report Was Accurate. It Was Still Incomplete.: `royal/Daily Notes/2024-10-08 1222 Bateman.md`; `chatir/Content/Professional Knowledge and Publishing Hub.md`.
- Build the Sprinkler System: `personal/stoic export.txt`; `personal/04 Personal/Seeing-Differently.md`; `_meta/maps/accident-reduction.md`; `_meta/evidence/accident-reduction/README.md`.
- chatIR product-thesis revision: `chatir/Daily Notes/2026-05-28 1521.md`; `chatir/Product/Commercial/ChatIR Commercial Decisions - Current.md`.
- Garden purpose and structure: Chris's instructions in the 2026-08-14 working session; `claude/garden/SCHEMA.md`; Andy Matuschak's public “About these notes” page as a reference model, not a template.

## Editorial boundary

The public Garden is an approved, polished-but-not-plastic mirror of selected private thought. Nothing crosses automatically. The public page contains the useful idea and safely cleaned example; the private source remains the provenance and the fuller record.

## Review order used before publication

1. `about-these-notes.md`
2. `index.md`
3. `garden-map.md`
4. `build-the-sprinkler-system.md`
5. `incident-reports-can-be-accurate-and-still-incomplete.md`
6. `chatir.md`
7. The three leadership/operations concept notes
8. The updated existing pages

Chris reviewed the live Garden, requested a final voice-and-accuracy pass, and approved publication after those corrections.

## Copy and voice correction pass

After the initial wiki pass, Chris requested a second audit specifically for AI-written cadence, claims that exceeded the underlying notes, and language that did not sound like him. The resulting correction pass changed fourteen of the eighteen public notes. It did not alter any private Obsidian note.

The correction pass:

- removed the unexplained numbering from the seven Field Tools and replaced the claim that their methods were entirely unborrowed;
- changed “30+” trainees to “about 30,” matching the private source;
- rewrote *First 90 Days* as advice from Chris's experience rather than a universal promotion formula;
- separated metrics, hypotheses, and causes in *Operational Metrics*;
- distinguished Chris's supportive one-on-one debrief practice from immediate team debriefing, investigation, and mental-health care;
- bounded the harassment section by organizational policy, HR or compliance responsibilities, confidentiality limits, due process, and current EEOC public guidance;
- preserved the measured fleet result while removing unsupported attribution of the result to one intervention;
- clarified that telematics added objective signals alongside reports rather than replacing them;
- softened the incident-interview opening to remove unnecessary operational details while preserving the record-versus-investigation point;
- retained “nine times out of ten” as Chris's own recollection, explicitly labeled “in my experience”;
- removed most repeated “not X, but Y” contrasts and several polished aphorisms that made separate notes sound like one synthetic essay writer;
- retained the distinctive language supported by private notes, including chords, vital signs, sprinklers, recognition, warmth, and uncertainty.
- replaced thesis-like navigation language with “thinking,” “idea,” and “working notes” so the Garden does not present itself as a finished formal argument;
- changed the public maturity labels to plain language: Reference note, Living note, Work in progress, and Early note;
- added a literal pointer from the chatIR graph passage to the Graph View displayed beside it.

### Sources added to public copy

- CMS guidance on amendments, corrections, and delayed entries;
- AHRQ TeamSTEPPS guidance on team debriefing;
- EEOC *Promising Practices for Preventing Harassment*.

These sources bound high-stakes public guidance. They do not replace local policy, qualified advice, or human review.

### Second-pass verification

- Public Markdown files: 18
- Internal wikilinks: 177
- Unresolved internal wikilinks: 0
- Files missing required public metadata: 0
- Mojibake markers in source or generated site: 0
- Flagged superseded phrases remaining: 0
- Deliberately retained mirrored rhetorical constructions: 3, all on notes where the phrasing still carries the author's thought
- Quartz production build: successful; 18 Markdown inputs emitted 114 files

### Publication record

- Correction-pass commit: `ef2eb52` — `Refine Garden copy and surface living-note status`
- Publication branch: `origin/main`
- Private Obsidian notes changed: none
- Generated Quartz cache and TypeScript build-info files included in the commit: none
