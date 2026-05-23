---
title: Inspections
description: Run the standard vehicle inspection checklist and turn it into a job card.
sidebar_position: 6
---

# Inspections

A **Vehicle Inspection** is a checklist of what the car needs. Use it to capture
what you find on the walk-around so the customer can approve the work — and so
the job card you build later has a clear scope.

This page covers running an inspection from start to job card.

---

## When to use an inspection

| Situation | Run an inspection? |
|---|---|
| Pre-purchase or trade-in assessment | Yes |
| Customer complaint that needs diagnosis | Yes |
| Scheduled service where you've been asked to look for issues | Yes |
| Customer asks for a single known task (oil change, tire rotation) | Optional — skip and go straight to a Job Card |

If you skip inspection, you can still create a job card directly from the
[appointment](./appointments.md).

---

## Creating an inspection

### From a checked-in appointment (recommended)
1. Open the appointment from the dashboard or Appointments page.
2. Click **Create inspection** in the drawer.
3. The inspection editor opens with appointment, customer, and vehicle
   pre-filled.

### Standalone (from the Inspections page)
1. Sidebar → **Inspections** → **+ New inspection**.
2. Pick a **checked-in appointment without an inspection yet** from the
   dropdown (option text: `<ID> — <Customer> (<Vehicle>)`).
3. Click **Create**.

---

## The inspection editor

The editor opens in a large modal. It has three regions:

1. **Toolbar** — *Load standard checklist* / *Save* / *Close*.
2. **Meta** — appointment, customer, vehicle (disabled), inspection date,
   inspector.
3. **Checklist table** — rows of `section / check item / status / notes`.

> Recommended parts and estimated prices are **not** edited in the Portal. Use
> *Open in Desk* if you need those fields.

---

## Loading the standard checklist

Click **Load standard checklist** to pre-populate the rows. The standard
checklist has six sections:

| Section | Example check items |
|---|---|
| **Engine & Fluids** | Engine oil level, coolant level, transmission fluid, drive belt |
| **Braking System** | Front pads, rear pads, brake fluid, handbrake |
| **Tires & Wheels** | Tread depth (FL/FR/RL/RR), tire pressure, wheel alignment |
| **Battery & Electrical** | Battery health, terminals, headlights, indicators |
| **Suspension & Steering** | Front shocks, rear shocks, steering play, CV joints |
| **Exterior & Interior** | Body damage, glass, wipers, AC, seats |

You can edit any row, add new ones, or remove rows you don't need.

---

## Status options per line

For each check item, set its status. Two paths:

### Quick buttons
- **OK** — sets the row to `OK`.
- **Report** — sets the row to `Needs Attention`.

These cover ~90% of typical rows.

### Full dropdown
For more granular reporting:

| Status | When to use |
|---|---|
| **OK** | Working as expected |
| **Good** | Working well, minor wear acceptable |
| **Fair** | Working but degraded — consider in next service |
| **Worn** | Wear is significant — schedule replacement soon |
| **Needs Attention** | Service required to keep the car reliable |
| **Critical** | Safety issue — must be fixed before the vehicle leaves |
| **N/A** | Item doesn't apply to this vehicle |

---

## Notes

Use **Notes** to capture specifics that turn a checklist into something
useful later:

- *"Front brake pads 2mm — replace before next service."*
- *"Driver-side wiper streaking — needs new blade."*
- *"P0420 OBD code; downstream O2 sensor failing."*

Notes appear on the inspection's printed report and feed the job card complaint
summary.

---

## Saving

Click **Save** at any time. Saving does not close the editor — you can keep
editing and re-save. The amber footer banner confirms each save.

> The editor's data is local until you save. If you close the editor with
> unsaved changes you'll get a confirmation prompt.

---

## Adding a custom row

For items the standard checklist doesn't cover (e.g. *"Aftermarket alarm"*):

1. Scroll to the bottom of the table.
2. Click **+ Add blank line**.
3. Pick a Section, fill in the Check item, set the Status, add a Note.

---

## Removing a row

Hover the row's right edge and click the trash icon. The row is removed
locally; click Save to persist.

---

## Creating a job card from an inspection

When the customer has approved the work:

1. In the inspection editor, look for the amber banner **Ready to create the job
   card?**
2. Click **Create job card from inspection**.
3. Pick **Company** and **Warehouse**.
4. Click **Create**.

The new job card opens. **Service** and **parts** lines are blank — you add them
on the job card (see [Job Cards](./job-cards.md)).

> The Portal intentionally **does not** auto-populate job card lines from
> inspection recommendations. Manually adding them lets you negotiate pricing
> with the customer before committing.

---

## After saving

Inspection metadata is now linked everywhere:

- **Appointment** → its drawer shows the linked inspection.
- **Job card** → links back to the source inspection.
- **Vehicle service history report** → includes this inspection.

---

## Tips

- Run the inspection while the customer is on premises if possible — the *Worn*
  / *Critical* lines often translate directly into approved billable work.
- Photograph any condition you label *Critical* and attach via the Desk form
  (the inspection item's `photo` field).
- For repeat customers, open their last inspection in Desk first — it speeds up
  this one's checklist.

---

## Next steps

- [Build the job card](./job-cards.md) with labour and parts lines.
- Check the [Workflow](./workflows.md) so you know the next workflow action.
