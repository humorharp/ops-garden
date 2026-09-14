---
title: What the Form Can't See
aliases: [The Instrument Gap, What Your Forms Can't See]
description: Incident forms count what is easy to count. The conditions that produce losses live in the narrative underneath, where nobody reads them at scale. This is the gap chatIR was built for, and its honest limits.
tags: [safety, investigation, incident-reports, learning, chatir, instrumentation]
type: concept
status: growing
created: 2026-08-20
modified: 2026-08-20
---

# What the Form Can't See

I read a full year of an EMS agency's incident records recently. Several hundred of them, start to finish, as one set rather than one at a time. Not an agency I have ever worked for, and not one I am going to describe closely enough to identify.

The structured fields, the dropdowns and checkboxes somebody built so the data would be countable, recorded who was involved in nearly every incident. They recorded how badly it went in none of them. Not rarely. Zero, across the whole export.

The narratives were fine. People described the road, the light, the load, the sequence, the thing that made the call unusual. Crews write more than they get credit for. All of it went into a free-text box that nobody reads several hundred at a time, sitting directly underneath the fields that feed the dashboard and the quarterly board slide.

I want to be careful here, because the obvious reading is wrong. This is not a story about lazy documentation, and it is not a story about a bad vendor. The form did exactly what it was built to do.

## A form counts what is easy to count

Every structured field on an incident form is a decision somebody made, usually years ago, usually under pressure, usually with a reasonable goal. Somebody needed a number for a report. Somebody needed to satisfy a regulator, or an insurer, or a question a board member asked once. So the form grew a field.

Fields that are easy to count get built. Unit number, date, time, employee, a contributing-factor category picked from a short list. Fields that require judgment do not get built, because a field that requires judgment produces inconsistent data, and inconsistent data makes the number at the top of the report unstable. So the form quietly optimizes for countability, and the price of that is that it becomes very good at recording who and when, and nearly useless at recording under what conditions.

Then the free-text box catches everything that did not fit. It is the largest and richest part of the record and it is functionally invisible, because reading it at scale was never possible for a human being with a job.

I call the difference between those two layers the instrument gap. It is not a metaphor. It is the measurable difference between what the record could tell you and what the instrument was built to capture.

## Why reading one at a time cannot close it

For about a decade I worked in EMS, five of those years running operations at Royal Ambulance in the Bay Area. Incident investigation was part of my job and I was not good at it, which I used to take personally and no longer do.

Here are the actual mechanics of it, and as far as I can tell they are the same at every agency I have looked at since. A report reaches you after the event. Sometimes the event just happened, sometimes it happened yesterday. You call the crew, who now remember the version of the story they have told three times. You talk to a supervisor who was not there. You write something reasonable in a box. You issue a corrective action, usually training or a policy reminder, because those are the two tools within reach. The file closes.

Nothing about that process is broken. Every step is defensible. But look at what it is structurally incapable of doing: it can only see one incident. A condition that shows up in six percent of your incidents is invisible at n equals 1. It is invisible at n equals 5. It only becomes a shape when you have the whole pile in front of you at once, and by the time you have the whole pile, eleven months have passed and four hundred reports are between the first one and the last.

We proved this to ourselves once, more or less by accident. I had been handed a mandate to bring vehicle accidents down, and nobody could tell me what our accident rate actually was. That is normal, by the way. Most agencies do not track it that way, because nobody ever asked them to. So before I could improve anything I had to go build the instrument, which in hindsight is the whole thesis of this note arriving about eight years early and me not noticing.

Building it meant pulling a year of accident reports into one spreadsheet and reading them together instead of one at a time. The pattern that came out was tenure, and it was not close. Which, in hindsight, is about the least surprising finding available in fleet safety. New drivers crash more. Everybody knows that. We still had not seen it, in our own record, in a year of reading every single report. Nobody in the room had known that. All of us had read every one of those reports as they came in, individually, and written something reasonable in a box each time. The pattern was not hidden. It simply was not visible from the angle we had been looking.

And frankly, that particular pattern is the kind of thing you could find in a pivot table, if you have the time. Tenure was a column. That is the easy case, and I want to be honest that it was the easy case. The conditions that actually produce losses are almost never columns. They are sentences, buried in a narrative field, phrased forty different ways by forty different people. You cannot pivot on those. That is the harder problem, and it is the one I ended up building for.

We aimed the training differently after that, and accidents came down about 30 percent over the following year, from roughly one per thousand trips to about 0.7. I have told that story a lot of times. The part I keep having to correct in the telling is that it was not an insight. It was an arithmetic operation that we finally got around to performing.

## Five whys, and the person standing at the end of them

I investigated with root cause analysis, mostly five whys, the way most of the industry still does. You ask why until you hit something that feels like bedrock, and you write that down.

Here is what I noticed after doing that a few dozen times. The chain almost always terminated on a person. Not because anyone was hunting for someone to blame. Because a person is the last thing in a chain that can be asked "why," and once you get to the individual there is nowhere further to go without leaving the incident, and leaving the incident is not what the form was built for. So the answer was training, or counseling, or a policy reminder, over and over, for years, at agencies all over the country. It is also a method that puts people on the defensive, understandably, because being asked why five times in a row is not a neutral experience for the person answering.

We did record contributing factors, the way most agencies do. There was a field for them. But a contributing factor written on one incident is a note in a file. We had no way to count one across a hundred incidents, no way to see whether it was rising or falling, and no way to act on it as a thing in its own right. They sat there, faithfully documented, doing nothing at all.

That bothered me enough that I went and read about it, and then went and talked to people who had spent careers on it. Nancy Leveson's argument, put roughly, is that in complex sociotechnical systems accidents emerge from interactions between components that all met their requirements. Nothing failed. If nothing failed, there is no chain to walk backwards, and walking one anyway just produces a scapegoat with better vocabulary. Sidney Dekker gets at the same place from the human side. HFACS gave me a working vocabulary for the layers.

None of that reading told me what to build. **What it did was give me permission to stop trying to find the one cause**, which is the thing I had been failing to do well for years while assuming the failure was mine.

## The interviewer was half of it

The first thing I built was an interviewer. A conversation that could ask the follow-up questions at 0130, while the event was still sharp, instead of waiting for a supervisor to walk in at 0500 and ask a memory that had been softening for five hours. A memory is made of ice. The interview is the thing that gets to it before it thaws.

It works. I still think it is the right answer to that particular problem.

But it is the answer to a problem about one incident, and I could not stop thinking about the EMT who keeps hurting their back. Who does not report it quickly. Who figures they can walk it off, and does, four times.

A better interview does not help that person. Their fifth injury will simply be documented beautifully.

That EMT did not need an AI. They needed somebody to look at all five at once and notice.

That is the other half, and it turned out to be the actual product.

## The part almost nobody does

Here is the thing that still bothers me more than the rest of it.

I wrote a great many corrective actions in those years, and I could not tell you today which of them did anything. They went out like letters with no return address. The finding was the deliverable. Whether the finding produced a change, and whether the change survived contact with a Tuesday night in July, was structurally nobody's job. Not where I worked, and not at any agency I have looked at since.

An organization that produces findings and never measures them is not running a control system. It is running a documentation system that feels like a control system. The feeling is the dangerous part, because it consumes the budget and the attention that a real one would need.

So when I built chatIR, the sentence I forced everything else to serve was this one: it turns incident reports into a living picture of how work actually happens, meaning what keeps recurring, what is worth changing, and whether the change held.

Three clauses, and the third is the one that costs the most to build and gets skipped by everyone selling in this space.

## What the diagnostic actually does

An agency sends the incident records it already has. Whatever exports cleanly. No new data entry, no forms to reconfigure, no software for anyone to log into during the read.

What comes back names the conditions that recur across the set and how often, with the population each number was computed against stated on the page. It says where the evidence is strong and where it is thin, in those words. It proposes candidate controls, framed as candidates rather than instructions, because I am reading your record and you are running your organization. And it sets the measure that will tell you whether the control worked, which is the only part that turns any of it into a loop.

Every claim traces back to a line in the record that was supplied. When the record will not support a conclusion, the report says so rather than reaching for a softer word. That sounds like a small commitment and it is not. Most of the engineering effort of the last several months went into stopping the report from claiming more than the data underneath it could carry, including the times it was claiming more in ways only I would have caught.

## What it cannot do, which matters

Everything chatIR reads is, by definition, an event that already went badly. That is the honest limit of the whole approach, and I would rather write it here than have somebody find it later.

A record of losses is not a record of safety. The shifts where the same conditions lined up and nothing happened are not in the file. Near misses are mostly not in the file either, because near misses do not generate paperwork. So what I can show you is the shape of your failures, which is worth a great deal and is not the same thing as the shape of your operation.

Severity is frequently missing entirely, as in the year I opened this note with. When it is missing, patterns can be ranked by how often they recur and by how much of the record they touch, but they cannot honestly be ranked by how much they cost you. The report says which of those two it is doing.

And it does not decide anything. It equips a decision. The person who knows whether a proposed control is realistic on a Tuesday night in July is not the software and is not me.

## Where this is

The diagnostic is real, two agencies have already run it against their own records, and the system it runs on has been rebuilt around it at [chatir.io](https://chatir.io). I am looking for a small number of EMS agencies willing to be first, at no cost, in exchange for a case study, a reference, or an introduction if the work turns out to be useful.

If you run safety or operations at an agency and you have a folder full of incidents you have never been able to read all at once, that folder is more informative than you think it is. Let's read it together.

## Related

- [[incident-reports-can-be-accurate-and-still-incomplete|The Report Was Accurate. It Was Still Incomplete.]]
- [[build-the-sprinkler-system|Build the Sprinkler System]]
- [[fleet-safety|Fleet Safety]]
- [[chatir|chatIR]]
