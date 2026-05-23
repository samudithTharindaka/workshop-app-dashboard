---
title: Dashboard
description: Read the workshop floor at a glance — KPIs, charts, queues, and recent activity.
sidebar_position: 4
---

# Dashboard

The Workshop Portal opens at the **Dashboard** (`/workshop`). It is a live,
auto-refreshing view of the floor: today's revenue, what's in progress, what's
ready to bill, and which appointments still need attention.

> The dashboard is read-only. To act on something, click through to the relevant
> page — most cards link to their respective section.

---

## Opening the dashboard

| Access | How |
|---|---|
| Sidebar | Click **Dashboard** in the left nav |
| Direct link | Visit `https://<your-site>/workshop` |
| From any screen | Click the **Workshop Portal** logo in the top-left |

The Desk-side dashboard at `/app/garage-dashboard` carries a different layout
optimised for managers — see [Reports](./reports.md).

---

## Top bar

| Control | Purpose |
|---|---|
| **+ New appointment** | Opens the appointment modal — same as on the Appointments page |
| **Refresh** | Force-reload all widgets without waiting for the auto-refresh |
| **Shortcut chips** | Quick links to Job cards, Appointments, Inspections, Vehicles, Customers, Invoices |

The header also shows a **LIVE** indicator (pulsing dot). When it's animating, the
backend is reachable and the dashboard is up-to-date.

---

## KPI cards

Four primary KPIs sit across the top.

| Card | Value | Meaning |
|---|---|---|
| **Today revenue** | Currency | Sum of Sales Invoices posted today |
| **Month revenue** | Currency | Sum for the calendar month |
| **Outstanding** | Currency | Total of unpaid invoices |
| **Open jobs** | Integer | Job cards in any non-terminal state. Sub-line *Ready to invoice: N* highlights how many are in the billing queue |

Each card is a single source of truth — if **Outstanding** is high but **Today
revenue** is low, you have a billing or collection problem to investigate.

---

## Appointment pulse

A compact row of four metrics:

| Metric | What it counts |
|---|---|
| **Today** | Appointments scheduled today |
| **In progress** | Appointments currently *In Progress* |
| **Upcoming** | Future-dated appointments |
| **Month completion** | Percentage of this month's appointments that reached *Completed* |

Use this to spot a quiet day or an unusually high In Progress count (which can
mean technicians are stuck).

---

## Charts

### Appointment status mix
Shows up to 8 statuses with current counts. Quickly tells you the shape of your
backlog — e.g. *15 Scheduled, 6 Checked-In, 4 In Progress, 2 Completed*.

### Revenue trend (sparkline)
A 30-day sparkline with start and end dates underneath. Hover-friendly minimal
line — for deeper analysis use the [Daily Revenue report](./reports.md#daily-revenue).

---

## Operations row

### Job status
A breakdown of job cards by workflow state with a horizontal bar visualising the
relative share. **No job card data.** if you haven't created any.

### Top services (month)
The top labour items by invoiced amount, this calendar month. Helps you identify
your bread-and-butter offerings.

### Top parts (month)
The top stock items by invoiced amount. Useful for purchasing planning.

---

## Activity row

### Recent jobs
The last 10 job cards modified, each as a row of:
- **ID** (mono-spaced, links to the Job Card detail page in Desk)
- **Customer**
- **Status pill** (colour follows the [status reference](./status-reference.md))

### Next appointments
The next few scheduled visits — customer, time. Empty state: *No upcoming
appointments — —*.

---

## Service appointments table (bottom)

A list of appointments filtered by either **Today** or **Upcoming** (toggle in
the header). Columns:

| Column | Notes |
|---|---|
| Appointment | Mono-spaced ID |
| Customer | Resolved display name |
| Scheduled start | Local time |
| Status | Coloured pill |

Click any row to deep-dive into the appointment.

---

## Auto-refresh

The dashboard auto-refreshes about every **2 minutes**. To force-refresh, click
the **Refresh** button. The **LIVE** indicator in the header dims briefly while
new data is fetched.

---

## Tips

- Pin the dashboard URL on shop-floor tablets so the team always sees today's
  numbers.
- If your dashboard shows zero revenue but you know an invoice was posted, check
  that the invoice's **Posting Date** is today and that it's **Submitted** (not
  still in Draft).
- The **Recent jobs** list always points to the Desk form; from there you can
  jump back into the Portal with **Open in Workshop**.

---

## Next steps

- Drill into a section: [Appointments](./appointments.md),
  [Inspections](./inspections.md), [Job Cards](./job-cards.md).
- Compare with the Desk-side **Garage Business Dashboard** for the manager view.
