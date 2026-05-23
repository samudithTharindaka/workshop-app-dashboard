---
title: Status Reference
description: Every status across every entity, with colour, meaning, and what to do next.
sidebar_position: 9
---

# Status Reference

A complete catalogue of every status used in the Workshop Management app. Use
this when a pill colour confuses you, when you need to filter a report, or when
you're trying to figure out why an action button isn't appearing.

---

## Visual language

Every status pill in the Portal uses one of six colour treatments. The treatment
encodes the **kind** of state, not the specific status name.

| Treatment | Tailwind base | Meaning | Examples |
|---|---|---|---|
| **Success** | emerald | Completed / paid / ready | *Completed*, *Invoiced*, *Closed*, *Approved*, *Ready to Invoice* |
| **Warning** | amber | Pending / in-progress / needs attention | *Scheduled*, *Estimated*, *Needs Attention* |
| **Info** | sky | Inspection / informational state | *Checked-In*, *In Progress*, *Inspected* |
| **Danger** | rose | Blocked / cancelled / critical | *Cancelled*, *No-Show*, *Critical* |
| **Neutral** | slate | Draft / N/A / default | *Draft*, *N/A* |
| **Brand** | teal | Brand-tagged informational state | *Open jobs*, brand-coloured chips |

Dark mode uses the `/15` opacity tint of the same hue with a lighter text shade.

---

## Service Appointment status

The `status` field on a Service Appointment is a simple select (no workflow).

| Status | Colour | What it means | Available actions |
|---|---|---|---|
| **Scheduled** | Warning (amber) | Booked, vehicle hasn't arrived | Check in, Cancel |
| **Checked-In** | Info (sky) | Vehicle is on premises | Create inspection, Create job card, Cancel |
| **In Progress** | Info (sky) | Job card created and work is underway | Mark complete |
| **Completed** | Success (emerald) | Service finished and vehicle returned | — (terminal) |
| **Cancelled** | Danger (rose) | Booking cancelled before completion | — (terminal) |
| **No-Show** | Danger (rose) | Customer didn't arrive and didn't cancel | — (terminal) |

> Marking an appointment **Cancelled** does not cancel a linked job card.
> Cancel the job card separately if needed.

---

## Vehicle Inspection — line item status

The inspection's checklist rows use a per-line status:

| Status | Colour | When to use |
|---|---|---|
| **OK** | Success (emerald) | Working as expected |
| **Good** | Success (emerald) | Working well, minor wear acceptable |
| **Fair** | Warning (amber) | Working but degraded — note for next service |
| **Worn** | Warning (amber) | Significant wear — replacement soon |
| **Needs Attention** | Warning (amber) | Service required to keep reliability |
| **Critical** | Danger (rose) | Safety issue — must be fixed before vehicle leaves |
| **N/A** | Neutral (slate) | Item doesn't apply to this vehicle |

The quick buttons in the editor map to:
- **OK** button → `OK`
- **Report** button → `Needs Attention`

---

## Job Card status (full 10 states)

The Job Card's status is driven by the **Workshop Job Card** ERPNext Workflow.
See [Workflows](./workflows.md) for the full diagram.

| # | Status | Colour | What it means | Forward actions |
|---|---|---|---|---|
| 1 | **Draft** | Neutral (slate) | Job card created, not yet started | Check In, Cancel |
| 2 | **Checked In** | Info (sky) | Vehicle accepted into the workshop | Inspect, Cancel |
| 3 | **Inspected** | Info (sky) | Inspection has been recorded | Estimate, Cancel |
| 4 | **Estimated** | Warning (amber) | Cost estimate prepared | Approve, Cancel |
| 5 | **Approved** | Success (emerald) | Customer approved the estimate | Start Work, Cancel |
| 6 | **In Progress** | Warning (amber) | Technician working on the vehicle | Ready To Invoice, Cancel |
| 7 | **Ready to Invoice** | Warning (amber) | Work complete, awaiting billing | (Create Sales Invoice → Invoiced) |
| 8 | **Invoiced** | Success (emerald) | A Sales Invoice has been created | Close |
| 9 | **Closed** | Success (emerald) | Job complete and archived | — (terminal) |
| 10 | **Cancelled** | Danger (rose) | Job cancelled before completion | — (terminal) |

> **Invoiced is set automatically** when the *Create sales invoice* button on
> the job card succeeds. It is not a manual transition.

> **Cancel** is available from every non-terminal state (Draft through Ready to
> Invoice). It is not allowed from Invoiced (cancel the Sales Invoice first in
> Desk) or Closed.

---

## Status colour quick-reference card

If you only memorize one thing, it's this:

```
  Success  →  it's done / good
  Warning  →  it needs action
  Info     →  it's in motion
  Danger   →  it's a problem
  Neutral  →  it hasn't started
  Brand    →  it's a brand-tagged signal
```

---

## Where these statuses appear

| Status field | Used in |
|---|---|
| Appointment status | Appointments list, appointment drawer, dashboard *Appointment status mix* |
| Inspection item status | Inspection editor, vehicle service history report |
| Job Card status | Job Cards list (table + kanban), Job Card detail page, dashboard *Job status* widget, *Jobs Ready to Invoice* report, *Job Cards by Status* report |

---

## Customising statuses

You **can** add new states or rename existing ones via Desk:

- **Appointment statuses** — edit the Service Appointment DocType's
  `status` field options in *Customize Form*.
- **Inspection line statuses** — edit the Inspection Item DocType's
  `status` field options.
- **Job Card workflow** — edit `/app/workflow/Workshop Job Card` to add,
  remove, or rename states (and re-map transitions). Read
  [Workflows](./workflows.md) first.

> Customising statuses also means updating the pill colour mapping in the
> Portal source (`statusPillClass()` functions in the view files). Without
> that, new statuses will fall through to the neutral grey pill.

---

## Next steps

- For the full transition diagram and per-role permissions, read
  [Workflows](./workflows.md).
- For troubleshooting why a status won't change, see
  [Troubleshooting](./troubleshooting.md).
