---
title: Operational Metrics
tags: [metrics, data, operations, performance]
---

# Operational Metrics

Data doesn't manage itself. Most EMS supervisors inherit a dashboard full of numbers and no clear sense of which ones actually matter or what to do when they move.

Here's how I think about it.

---

## Metrics Are Vital Signs

A single data point tells part of a story. Its meaning changes depending on what else is happening around it.

A chute time of 3 minutes looks great in isolation. It looks different if your unit is running its 14th call of a 12-hour shift. It looks different again if that unit is consistently first out but your other units are consistently last. Context is everything.

Don't read metrics in isolation. Read the presentation — the full picture across related indicators — and then form a hypothesis about what's driving it.

---

## The Metrics That Actually Matter

**Chute Time (Response Readiness)**

Time from dispatch to unit en route. This is one of the most direct measures of operational readiness. Consistent chute times mean consistent preparation, consistent crew focus, consistent unit condition.

When chute times drift up, the causes are almost never random. Fatigue, morale, unit maintenance issues, and post-call delays all show up here before they show up anywhere else. Chute time is a leading indicator.

We improved chute times at Royal not through policy pressure but by identifying the specific conditions that caused delays and addressing those. Deployment patterns, post-call turnaround expectations, and unit prep standards were the levers.

**Documentation Quality (Addenda Rate)**

Addenda — corrections and additions filed after a report is submitted — are expensive. They mean the report wasn't right the first time. They create legal exposure. They create billing delays. They are a reliable proxy for crew stress, training gaps, and policy clarity.

We reduced addenda rates through a combination of: clearer documentation standards, FTO accountability for documentation habits in new providers, and supervisor spot-checks rather than waiting for QA to flag issues.

If your addenda rate is high, start with your newest providers and your highest-volume units. That's almost always where it's concentrated.

**Incident Rate (Fleet Safety)**

See [[fleet-safety|Fleet Safety]] for the full methodology. The short version: track by incident type, not just total count. Backing incidents, intersection incidents, and lot incidents have different causes and require different interventions.

**Call Volume Distribution**

Are your units running equal loads, or are some crews chronically overloaded while others are underutilized? Uneven distribution drives burnout on one side and atrophy on the other. Neither is useful.

---

## Leading vs. Lagging Indicators

Most EMS metrics are lagging — they tell you something went wrong after it went wrong. Accidents, addenda, complaints, response time failures. These are important but they're the aftermath.

Leading indicators tell you where something is likely to go wrong before it does. Hard braking events, shift overtime rates, high-acuity call clustering, unit downtime. These are the metrics worth building into your regular review.

If you're only looking at lagging indicators, you're managing by rear-view mirror.

---

## The Review Cadence That Works

Daily: glance at anything that flagged overnight. Incident reports, major calls, unit issues.

Weekly: chute times, addenda, fleet events. Look for trends, not one-off anomalies.

Monthly: the full picture. Compare against prior periods. Ask why it moved, not just whether it moved.

The mistake most supervisors make is reviewing data only when something goes wrong. By then you're already in reactive mode. Build the cadence when things are fine so you know what "fine" actually looks like.

---

## Presenting Data to Leadership

Know your audience. Frontline crews care about what affects their shift. Directors care about liability, cost, and community relations. Medical directors care about clinical outcomes and protocol adherence.

Translate the metric into the impact your audience cares about before you walk into the room. "Our addenda rate dropped 18%" is less compelling than "we've reduced billing cycle delays and our QA backlog is down by half."

Same data. Different frame.

---

## Related

- [[fleet-safety|Fleet Safety]] — deep dive on incident metrics
- [[first-90-days|First 90 Days]] — where to start with metrics when you're new
- [[leadership-philosophy|Leadership Philosophy]] — data as a coaching tool, not a weapon
