---
title: A Problem Passed Around Is a Problem Owned by Nobody
aliases: [Problems Need Owners, The Escalation Loop]
description: Handoffs can create a great deal of activity without creating responsibility for resolution.
tags: [operations, ownership, escalation, systems]
type: concept
status: growing
created: 2026-08-14
modified: 2026-08-14
---

# A Problem Passed Around Is a Problem Owned by Nobody

I was reviewing a set of escalations when I noticed that many of them had the same shape.

A customer called support. Support could not solve the issue, so they sent it to the local office. The office needed information from another department. That department replied to one person but not another. A supervisor became involved. Eventually the customer called again, at which point the whole process more or less started over.

The details changed. The shape did not.

The problem had traveled extensively. It had accumulated messages, notes, transfers, and people who were aware of it.

It still did not have an owner.

## Activity can disguise the absence of progress

Escalations are noisy. They produce visible work: emails, chats, case updates, meetings, follow-ups. That activity makes it easy to believe the system is moving.

And each person may have done exactly what their role expected. Support routed the request. The office sent the email. Billing reviewed the account. A supervisor asked for an update.

The customer still had the problem.

This is one of the strange things about cross-functional work. Every part of the system can complete its task while the system itself fails to produce an outcome.

I used to look at an escalation and ask, “Who did not respond?” Sometimes that is the right question. But it is usually downstream of a more useful one:

> At what point did this problem stop belonging to anyone?

## Routing and ownership are different jobs

A routing system tells people where a problem should go.

An ownership system tells somebody they are responsible for making sure it comes back resolved.

Those are not the same thing.

Sending an email to another department is not a transfer of ownership unless the other person has actually accepted ownership. Otherwise the sender assumes the recipient has it, the recipient assumes they were asked for one piece of information, and the customer waits inside the gap between those assumptions.

I think an escalation needs at least four visible things:

1. **An owner.** One person responsible for carrying it to resolution.
2. **A next action.** Not “looking into it”—the thing that will actually happen next.
3. **A time boundary.** When the next action or update is expected.
4. **A closure condition.** What has to be true before the problem counts as finished.

Several people may do the work. Ownership does not mean one person personally performs every task. It means one person notices if the chain stops moving.

## Reopened work is a useful signal

When the same issue returns, it is tempting to treat it as another contact. I think it is more useful to treat it as evidence about the earlier process.

The first response may have moved the problem without closing it.

A weekly review of a few reopened or repeatedly transferred cases can tell you more than a dashboard of total contacts. I would ask:

- Where did the issue first become ownerless?
- Which handoff depended on an assumption?
- Who was waiting without visibility?
- Was the blocker information, authority, access, or attention?
- Where should the case have ended?

The purpose is to make the loop visible without turning it into another number people learn to game.

That connects directly to how I think about [[operational-metrics|operational metrics]]. A count is rarely the whole presentation. Reopened work, elapsed time between handoffs, and repeated customer contact may describe the health of the system better than the number of tasks each department closed.

## Ownership can fail in both directions

There is an obvious danger in having nobody own the problem.

There is also a less obvious danger in making one conscientious person own every problem forever.

Some employees become the organization's unofficial connective tissue. They know who to call, how to translate between departments, and which follow-up will actually get an answer. The system appears to work because they personally carry its gaps.

That looks like high performance until they leave, burn out, or stop absorbing the work.

This is part of the same problem I am circling in [[build-the-sprinkler-system|Build the Sprinkler System]]: capable people can conceal weak systems by refusing to let the outcome fail.

So the answer is not “find the responsible person and give them everything.” The answer is to design ownership so that it is explicit, transferable, supported, and visible.

## What I would try now

For any process that regularly crosses teams, I would take five recent cases and draw the actual path they traveled.

Not the path in the policy. The path the work really took.

Mark every handoff. Mark who believed they owned the outcome at each step. Mark where the customer or employee was waiting. Mark the point when somebody knew the process was stuck and what they were able to do about it.

Then ask whether the process needs another rule, or simply a moment where ownership becomes unmistakable.

I suspect a lot of organizations have more escalation paths than they have escalation owners.

Those are not interchangeable.

## Connected notes

- [[operational-metrics|Operational Metrics]] — reading reopened work and elapsed time as system signals
- [[stop-being-the-answer|Stop Being the Answer]] — moving authority without abandoning responsibility
- [[build-the-sprinkler-system|Build the Sprinkler System]] — why capable people often absorb structural gaps
- [[hard-conversations|Hard Conversations]] — clarity when an ownership failure involves an actual performance issue
