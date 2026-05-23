---
title: Introduction
description: What Workshop Management is, who it's for, and the core concepts you'll meet.
sidebar_position: 1
---

# Introduction

**Workshop Management** is an automotive workshop and garage operations system built
on top of the [Frappe Framework](https://frappeframework.com) and
[ERPNext](https://erpnext.com). It adds the vehicle-service domain — vehicles,
appointments, inspections, job cards — and a modern single-page **Workshop Portal**
for day-to-day floor use.

If you've ever wished your accounting ERP knew the difference between an oil change
and a brake job, this is the missing piece.

---

## Who this is for

| Role | What they do in the app |
|---|---|
| **Service advisor / front desk** | Books appointments, takes the keys, talks to customers, hands off to technicians |
| **Technician / inspector** | Runs inspections, updates job card lines, advances workflow |
| **Workshop manager** | Watches the floor on the kanban, approves estimates, runs the billing queue, reads reports |
| **Back office / admin** | Manages customers, items, accounting, permissions in the Frappe Desk |

You can do nearly everything advisors and technicians need from the **Workshop
Portal**. Admins and accounting still live in **Desk**.

---

## The two surfaces

Workshop Management exposes the same data through two interfaces:

| Surface | URL | Built for | Tech |
|---|---|---|---|
| **Workshop Portal** | `/workshop` | Floor staff, advisors, managers | Vue 3 SPA, served by Frappe |
| **Frappe Desk** | `/app` | Accounting, master data, permissions, reports | Standard ERPNext |

Every Portal screen has an **Open in Desk** link so you can switch to the full form
whenever you need a field the Portal doesn't show.

---

## Core concepts

Five DocTypes carry the workshop business model. Get familiar with them and the
rest of the app will make sense.

### Vehicle
The car being serviced. Linked to a **Customer**. Stores plate, VIN, make, model,
year, odometer reading, notes.

### Service Appointment
A booked visit. Links a customer and one of their vehicles to a date, time, and
service advisor.

### Vehicle Inspection
A walk-around checklist. Each row records a section (Engine, Brakes, Tires, etc.),
the item checked, its status (OK / Needs Attention / etc.), and notes.

### Job Card
The work order — the central document. Holds the customer, vehicle, appointment
and inspection it came from, the labour and parts lines, totals, and the current
workflow status. Generates the Quotation and Sales Invoice.

### Sales Invoice
Standard ERPNext invoice with a `custom_job_card` link so you can always trace
billing back to the work order. Creating one automatically moves the linked job
card to **Invoiced**.

---

## The service lifecycle

```
1. Book          2. Check-in        3. Inspect          4. Work           5. Bill
   Appointment ─► Checked-In ─────► Inspection ──────► Job Card ───────► Quotation
                                                                          / Invoice
```

Each step has a dedicated screen in the Portal. The Job Card flows through a
10-state ERPNext **Workflow** — see [Workflows](./workflows.md) for the full state
diagram.

---

## What's inside the app

- **Real-time dashboard** with KPIs, revenue trend, top services and parts.
- **Appointment board** with inline customer/vehicle creation.
- **Inspection editor** with a pre-built 6-section checklist.
- **Job card workspace** with editable service & parts lines, kanban view, workflow
  buttons, and one-click Quotation / Sales Invoice creation.
- **5 standard reports**: Daily Revenue, Job Cards by Status, Jobs Ready to
  Invoice, Parts Consumption, Vehicle Service History.
- **Custom Garage Dashboard** in Desk for manager-level KPIs.
- **Out-of-the-box ERPNext integration** — stock, accounting, taxes, permissions.

---

## Next steps

1. **Install the app** — see [Installation](./installation.md).
2. **Run first-time setup** — see [Getting Started](./getting-started.md).
3. **Book your first appointment** — see [Appointments](./appointments.md).
