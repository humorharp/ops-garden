---
title: chatIR
aliases: [ChatIR, The Product I Am Building]
description: The working product thesis behind chatIR and the boundary around what it should do.
tags: [chatir, ems, safety, ai, product]
type: project
status: growing
created: 2026-06-04
modified: 2026-08-14
---

# chatIR

chatIR is the company and product I am building from many of the ideas in this Garden.

That sentence is cleaner than the actual history.

The product did not arrive as one finished insight. It grew from [[fleet-safety|fleet safety]], debriefing, documentation work, incident interviews, experiments with root-cause frameworks, and years of being frustrated that organizations collected a great deal of incident data without becoming proportionally better at learning from it.

The recurring problem was not an absence of records. It was that the records were fragmented, administratively shaped, and difficult to compare. [[incident-reports-can-be-accurate-and-still-incomplete|A report could be accurate and still omit the conditions a safety team needed for a different kind of question.]]

## The original shape

The basic product flow in my head is still fairly simple:

An incident occurs. Somebody creates the required report. While memory is still relatively fresh, a structured conversation helps recover additional context: conditions, decisions, equipment, policies, workload, handoffs, and the things a fixed form did not know to ask.

That information remains connected to the original event, but it also becomes structured enough to compare across events.

I kept picturing the Obsidian graph.

An incident report is one node. The contributing conditions extracted from it are nodes too. The relationships among them are edges. The event remains whole while its parts become separately visible and comparable.

I arrived at something resembling a knowledge graph before I had the technical vocabulary for it. That has happened more than once while building this.

## Notes, chords, and the full presentation

The metaphors overlap because I was trying to describe the same thing from different angles.

Clinically, the incident type is like a chief complaint. It tells you where to begin, not what the full presentation means. One vital sign can be concerning or ordinary depending on what presents beside it.

Musically, each condition is a note. Fatigue is a note. An unfamiliar equipment layout is a note. A rushed handoff is a note. The combination is a chord with qualities no individual note contains by itself.

The analysis should help the team hear the chord without pretending that one note caused the whole event.

That distinction is not decorative. Recurrence and co-occurrence can direct attention. They do not automatically establish cause.

## What the product should do

The current role I want chatIR to play is connective tissue for operational learning.

It should help a safety or operations team:

- recover context consistently while memory is still available;
- structure information from imported records and new reports in the same analytical model;
- compare recurring conditions across incidents;
- identify missing information and candidate relationships;
- see whether a control was available, used, unavailable, corrected, or overridden;
- ask better questions of their own record.

It should not replace the safety team.

I am deliberately cautious about calling the AI conversation an investigation. The software can support reporting, memory recovery, and analysis. The investigation begins when responsible people review the evidence, validate it against the operation, speak with the humans involved, and decide what it means.

The line I use is: **equip the decision; do not make it.**

## What I am still trying to prove

The largest bet is also the simplest: if operational incident information is recovered and organized well enough, will genuinely useful new connections emerge?

I believe they will. Belief is not validation.

Better intake alone may be valuable even before sophisticated analysis works. Historical diagnostics may reveal recurring conditions without proving that a particular intervention will improve outcomes. A suggested control may sound sensible and still fail when it meets the local operation.

I do not want to hide those uncertainties behind “AI-powered.” They are the work.

Some of the current questions live in [[open-questions#What should AI be allowed to conclude from an operational record?|What should AI be allowed to conclude from an operational record?]]. The broader prevention thesis is in [[build-the-sprinkler-system|Build the Sprinkler System]].

## Current public doorway

[chatir.io](https://chatir.io?utm_source=garden&utm_medium=cta&utm_campaign=chatir&utm_content=chatir) is the product site. [christopherjharper.com](https://christopherjharper.com?utm_source=garden&utm_medium=referral&utm_campaign=garden&utm_content=chatir) has my background and contact information.

This note will keep changing as the product earns—or fails to earn—the claims I currently make about it.

## Connected notes

- [[incident-reports-can-be-accurate-and-still-incomplete|The Report Was Accurate. It Was Still Incomplete.]] — the record problem underneath the product
- [[build-the-sprinkler-system|Build the Sprinkler System]] — the prevention thesis underneath the company
- [[fleet-safety|Fleet Safety]] — the operational project that showed me structured learning could move a measured outcome
- [[the-debrief|The Debrief]] — the question-led method that influenced the conversational interface
- [[open-questions|Open Questions]] — the boundaries I do not want the product story to hide
