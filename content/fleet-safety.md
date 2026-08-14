---
title: Fleet Safety
aliases: [Ambulance Accident Reduction, The Driving Safety Project]
description: The system behind a measured 30 percent reduction in ambulance accidents during the first year.
tags: [safety, fleet, dmaic, metrics, ambulance]
type: case-study
status: evergreen
created: 2026-06-04
modified: 2026-08-14
---

# Fleet Safety

We reduced ambulance accidents by 30% in Year 1. This is how.

Not theory. The actual methodology.

---

## The Problem With How EMS Handles Accidents

The reactive pattern I saw in EMS was familiar: something happens, someone fills out a form, maybe there is a conversation, maybe there is retraining, and then everyone moves on and waits for the next one.

The form is not useless. It is usually doing the job it was designed to do: notify the organization and preserve a specific set of facts. The problem is expecting that same form to carry the entire investigation. [[incident-reports-can-be-accurate-and-still-incomplete|A record can be accurate and still omit the conditions needed for operational learning.]]

You can't fix what you don't accurately diagnose. And most agencies are diagnosing at the symptom level.

---

## The Framework: DMAIC

We used DMAIC — Define, Measure, Analyze, Improve, Control — borrowed from Lean Six Sigma. You don't need a Six Sigma certification to apply it. You need discipline and honest data.

**Define:** What exactly are we trying to reduce? We got specific. Not "accidents" in general — we broke them down by type. Backing incidents. Intersection incidents. Low-speed lot incidents. Each type has different causes and requires different interventions.

**Measure:** What did we actually have, and how were we capturing it? We implemented fleet telematics — GPS, accelerometer data, hard braking events, speed profiles. This gave us objective data instead of self-reported incidents. Incidents you don't capture can't be fixed.

**Analyze:** Where were incidents clustering? What conditions preceded them? Time of day, shift length, call volume, specific units, specific locations. We ran fishbone analysis on the high-frequency incident types. The contributing conditions were almost never "operator error" alone—they were layered.

**Improve:** Targeted interventions based on the contributing conditions we could support. This included:
- A behavioral coaching program for high-incident operators (not punitive — coaching)
- Deployment videos for consistent backing and spotting procedures
- Spotter protocol enforcement at specific high-risk locations
- FTO integration so new providers learned safe habits before bad ones formed

**Control:** How do you hold the gains? Monthly review of telematics data, leading indicators tracked alongside lagging ones, and building fleet safety into regular supervisor conversations rather than treating it as a separate safety-department function.

---

## The Telematics Layer

Telematics changed what was possible. Before it, we relied heavily on incident reports and witness accounts. Those records remained important, but telematics added a different view: hard-braking events, speeding patterns, and backing behavior across the fleet in near-real time.

The surveillance concern is real. The distinction is what the organization does with the data. Used primarily as a disciplinary feed, telematics teaches people to fear the measurement. Used as one source in a transparent coaching and safety process, it can make behavior visible that no supervisor could observe across every unit and shift.

The key is what you do with the data. Raw data without structured review and coaching is just noise. We built a review cadence — supervisors were looking at their units' data, not just waiting for incidents to come to them.

---

## What Actually Moved the Number

Backing incidents were the highest-frequency category. The fix wasn't a memo about using spotters — it was making spotter use a behavioral norm enforced at the crew level, and making the consequences of skipping it visible and immediate via telematics.

The behavioral coaching program mattered more than any policy change. When you sit down with a high-incident operator and show them their own data — not accusatorially, as a shared problem to solve — the conversation is completely different than a disciplinary write-up. Most people want to do the job well. Show them the data, ask what they think is happening, and work it together.

The 30% reduction was real and measured: the rate moved from 1.0 to 0.7 accidents per 1,000 trips during the first year. The method can be repeated. The result should not be treated as a promise that every fleet will produce the same number.

---

## The Deeper Point

Every accident has contributing factors that go beyond the individual operator. Equipment condition, shift fatigue, deployment density, policy gaps, training deficits. The individual operator is usually the last line of a much longer causal chain.

Fix the chain. Do not only punish the last link.

This project is where [[build-the-sprinkler-system|the sprinkler-system idea]] became measurable for me. It is also part of the lineage of [[chatIR|chatIR]], which is my attempt to make this kind of structured incident learning easier to repeat without pretending the software can conduct the human investigation.

---

## Related

- [[operational-metrics|Operational Metrics]] — what to track and why
- [[leadership-philosophy|Leadership Philosophy]] — coaching over punishment
- [[first-90-days|First 90 Days]] — where fleet safety fits in your early priorities
- [[incident-reports-can-be-accurate-and-still-incomplete|The Report Was Accurate. It Was Still Incomplete.]] — why the form and the investigation serve different purposes
- [[build-the-sprinkler-system|Build the Sprinkler System]] — the broader prevention thesis
- [[chatir|chatIR]] — the product growing from this methodology

The [[tools|Vehicle Accident Investigation Form and Incident Findings Report]] are the paper companions to this method.
