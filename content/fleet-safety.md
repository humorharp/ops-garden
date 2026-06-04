---
title: Fleet Safety
tags: [safety, fleet, dmaic, metrics, ambulance]
---

# Fleet Safety

In my time as Operations Supervisor at Royal Ambulance, Santa Clara County, we reduced ambulance accidents by 30% in Year 1. This is how we did it.

Not theory. The actual methodology.

---

## The Problem With How EMS Handles Accidents

Most EMS agencies respond to accidents reactively. Something happens, someone fills out a form, maybe there's a conversation, maybe there's a retraining, and then everyone moves on and waits for the next one.

The form is the problem. A checkbox form captures what happened. It almost never captures *why* — the real contributing factors, the systemic conditions, the behavioral and environmental context that made the incident possible.

You can't fix what you don't accurately diagnose. And most agencies are diagnosing at the symptom level.

---

## The Framework: DMAIC

We used DMAIC — Define, Measure, Analyze, Improve, Control — borrowed from Lean Six Sigma. You don't need a Six Sigma certification to apply it. You need discipline and honest data.

**Define:** What exactly are we trying to reduce? We got specific. Not "accidents" in general — we broke them down by type. Backing incidents. Intersection incidents. Low-speed lot incidents. Each type has different causes and requires different interventions.

**Measure:** What did we actually have, and how were we capturing it? We implemented Samsara telematics — GPS, accelerometer data, hard braking events, speed profiles. This gave us objective data instead of self-reported incidents. Incidents you don't capture can't be fixed.

**Analyze:** Where were incidents clustering? What conditions preceded them? Time of day, shift length, call volume, specific units, specific locations. We ran fishbone analysis on the high-frequency incident types. The causes were almost never "operator error" alone — they were layered.

**Improve:** Targeted interventions based on actual root causes. This included:
- A behavioral coaching program for high-incident operators (not punitive — coaching)
- Deployment videos for consistent backing and spotting procedures
- Spotter protocol enforcement at specific high-risk locations
- FTO integration so new providers learned safe habits before bad ones formed

**Control:** How do you hold the gains? Monthly review of telematics data, leading indicators tracked alongside lagging ones, and building fleet safety into regular supervisor conversations rather than treating it as a separate safety-department function.

---

## The Telematics Layer

Samsara changed what was possible. Before objective telematics data, you were relying on self-reporting and witness accounts — both unreliable. With telematics you could see hard braking events, speeding patterns, and backing behavior across the entire fleet in near-real-time.

This isn't about surveillance. It's about accurate data. You can't coach someone on behavior you can't observe, and you can't observe every unit every shift. Telematics is the eyes you don't have.

The key is what you do with the data. Raw data without structured review and coaching is just noise. We built a review cadence — supervisors were looking at their units' data, not just waiting for incidents to come to them.

---

## What Actually Moved the Number

Backing incidents were the highest-frequency category. The fix wasn't a memo about using spotters — it was making spotter use a behavioral norm enforced at the crew level, and making the consequences of skipping it visible and immediate via telematics.

The behavioral coaching program mattered more than any policy change. When you sit down with a high-incident operator and show them their own data — not accusatorially, as a shared problem to solve — the conversation is completely different than a disciplinary write-up. Most people want to do the job well. Show them the data, ask what they think is happening, and work it together.

The 30% reduction was real and measured. The methodology is replicable.

---

## The Deeper Point

Every accident has contributing factors that go beyond the individual operator. Equipment condition, shift fatigue, deployment density, policy gaps, training deficits. The individual operator is usually the last line of a much longer causal chain.

Fix the chain. Don't just punish the last link.

This is the same philosophy behind [[ChatIR]] — the AI incident investigation platform I built to apply this methodology at scale across EMS organizations.

---

## Related

- [[operational-metrics|Operational Metrics]] — what to track and why
- [[leadership-philosophy|Leadership Philosophy]] — coaching over punishment
- [[first-90-days|First 90 Days]] — where fleet safety fits in your early priorities
