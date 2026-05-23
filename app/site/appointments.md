---
title: Appointments
description: Book, check in, and manage service appointments.
sidebar_position: 5
---

# Appointments

A **Service Appointment** is a booked visit. It links a customer + vehicle to a
date, time, and (optionally) a service advisor. Every job in the workshop starts
here.

This page covers booking, checking-in, the appointment lifecycle, and common
edge cases.

---

## When to use what

| Situation | Action |
|---|---|
| Customer phones to book a service | Create an appointment |
| Customer walks in without a booking | Create an appointment, then immediately check it in |
| Customer cancels | Open the appointment, click **Cancel** |
| Customer no-shows | Set status to **No-Show** |
| Work finishes | Click **Mark complete** |

---

## Booking a new appointment

### From the dashboard
Click **+ New appointment** in the top right of the dashboard.

### From the appointments page
Sidebar → **Appointments** → **+ New appointment**.

### The booking modal

| Field | Required | Notes |
|---|---|---|
| **Customer** | Yes | Searchable dropdown. Click **+** beside it to inline-create a new customer (name, mobile, email — nothing else needed). |
| **Vehicle** | Yes | Filtered to the chosen customer's vehicles. Click **+** to inline-create a new vehicle (plate, make, model, year, VIN, color). |
| **Scheduled start** | Yes | Date + time picker |
| **Scheduled end** | Yes | Date + time picker. Make this realistic — the dashboard counts on it |
| **Advisor** | No | User ID of the advisor who'll own this job. Optional but recommended |
| **Remarks** | No | Free-text notes for the technician (complaint, courtesy car booked, etc.) |

Click **Create**. The appointment lands in the list with status **Scheduled**
and a toast confirms the action.

### Inline customer creation
If the customer isn't on file:

1. Click **+** next to the **Customer** field.
2. Enter:
   - **Customer name** *(required)*
   - **Mobile** *(strongly recommended for SMS confirmations later)*
   - **Email**
3. Click **Create customer**. The dropdown auto-populates.

### Inline vehicle creation
Same flow for the **Vehicle** dropdown:

1. Pick the customer first (vehicle dropdown is disabled until then).
2. Click **+** beside **Vehicle**.
3. Enter plate, make, model, year, color, VIN. Plate is the only required field.
4. Click **Create vehicle**.

> If the **Vehicle** dropdown is empty even after picking a customer, the
> customer simply has no vehicles on file yet. Use the inline **+**.

---

## Filters and search

The Appointments page has a filter bar at the top:

| Filter | Behaviour |
|---|---|
| **Status** | Any single status, or *All statuses* |
| **Date from / to** | Inclusive range on `scheduled_start` |
| **Customer** | Narrow to one customer |
| **Free-text search** | Matches name, mobile, vehicle plate |

Filters combine with AND. Clearing a filter is a single click.

---

## Check-in

When the customer arrives:

1. Open the appointment from the list.
2. Click **Check in** in the detail drawer.
3. Status moves **Scheduled → Checked-In**.
4. Two new buttons appear: **Create inspection** and **Create job card**.

---

## Creating an inspection from an appointment

Best practice: run the inspection before opening a job card so the customer can
approve the work.

1. From the checked-in appointment drawer, click **Create inspection**.
2. The inspection page opens with the appointment already linked.
3. Follow [Inspections](./inspections.md) to run the checklist.

---

## Creating a job card from an appointment

For walk-ins where no inspection is needed (e.g. scheduled oil change):

1. From the checked-in appointment drawer, click **Create job card**.
2. Pick the **Company** and **Warehouse**.
3. Click **Create**. The job card opens at status **Draft**.

The appointment now links to the job card; status moves to **In Progress**.

---

## Marking complete

Once the job card is invoiced and the vehicle is handed back, the appointment
itself moves to **Completed**:

1. Open the appointment.
2. Click **Mark complete**.

This is mostly a record-keeping action — the job card lifecycle (see
[Job Cards](./job-cards.md)) drives most of the workflow.

---

## Cancelling

Any non-terminal appointment can be cancelled:

1. Open the appointment.
2. Click **Cancel appointment** at the bottom of the drawer.
3. Confirm in the popup.

Status moves to **Cancelled**. If a linked job card exists, it stays untouched —
cancel that separately if needed.

---

## Statuses

| Status | What it means |
|---|---|
| **Scheduled** | Booked, vehicle hasn't arrived |
| **Checked-In** | Vehicle is on premises, ready for work |
| **In Progress** | Job card has been created and work has started |
| **Completed** | Service finished and vehicle handed back |
| **Cancelled** | Booking cancelled before completion |
| **No-Show** | Customer didn't arrive and didn't cancel |

Full reference: [Status Reference](./status-reference.md).

---

## Best practices

- **Always set a realistic scheduled end.** It feeds the dashboard's *Upcoming* /
  *In progress* counts.
- **Assign an advisor.** Even when the same person books and checks in, an
  advisor on every appointment makes manager reports useful.
- **Use Remarks for the complaint.** Technicians read the appointment drawer
  before opening the inspection — the complaint summary saves a phone call.
- **Don't leave Checked-In appointments lingering.** Either create an
  inspection / job card, or move them to Cancelled. Stale Checked-In rows skew
  the floor count.

---

## Linked records

From any appointment you can deep-link to:

- **Inspection** (if created) — opens in the inspection editor.
- **Job Card** (if created) — opens in the Job Card detail page.
- **Open full form in Desk** — for any field the Portal doesn't expose.

---

## Next steps

- Run a [Vehicle Inspection](./inspections.md) on the checked-in vehicle.
- Or jump straight to creating a [Job Card](./job-cards.md).
