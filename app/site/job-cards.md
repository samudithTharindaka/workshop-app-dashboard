---
title: Job Cards
description: The central work order — labour, parts, workflow, quotation, invoice.
sidebar_position: 7
---

# Job Cards

A **Job Card** is the work order — the central document for every service. It
holds the labour lines, part lines, totals, links to the source appointment and
inspection, and drives the workflow that ends in a Sales Invoice.

Understanding the Job Card is the most important thing on this site. Spend a
few minutes here.

---

## The Job Card detail page

URL: `/workshop/job-cards/<JOB-ID>`.

The page has six regions, top to bottom:

1. **Hero card** — customer avatar/initials, vehicle, mono-spaced job ID, status
   pill, posting date.
2. **Primary actions row** — workflow buttons available right now.
3. **Workshop details** — company, warehouse, advisor, appointment & inspection
   links, complaint summary.
4. **Service items table** — labour lines, editable.
5. **Part items table** — parts lines, editable.
6. **Totals + Create documents** — live total + Quotation / Sales Invoice
   creation.

The list page (`/workshop/job-cards`) shows all job cards in either **table** or
**kanban** view (toggle in the header).

---

## Creating a job card

Two entry points:

### From a checked-in appointment
- Open the appointment → **Create job card**.
- Pick Company + Warehouse → **Create**.
- Job card opens at status **Draft** (if no inspection ran first) or
  **Checked In** (if started from an inspection).

### From an inspection
- In the inspection editor → **Create job card from inspection**.
- Same Company + Warehouse modal.
- The inspection is linked automatically.

> You can't create a job card from scratch on the Portal — it must originate from
> an appointment or inspection so the audit trail is complete. The Desk form
> lets you, but use the Portal flow unless you have a reason.

---

## Service items (labour lines)

These are time/labour charges.

| Field | Notes |
|---|---|
| **Item** | Pick any *Service* item (`Is Stock Item` unchecked). Searchable. |
| **Qty** | Usually hours or count. |
| **Rate** | Pre-filled from the item's Standard Selling Rate. Override per job. |
| **Amount** | `qty × rate`. Calculated live. |

To add a row: scroll to the bottom of the table → click **+ Add service**. To
remove a row: hover and click the trash icon. To edit a value: click into the
cell.

> **Save before advancing workflow.** Editing a row doesn't auto-save. The
> *Save* button glows when you have unsaved line changes.

---

## Part items

These are physical parts that depleta stock.

| Field | Notes |
|---|---|
| **Item** | Pick any *Stock* item (`Is Stock Item` checked). |
| **Qty** | Number of units. |
| **Rate** | From item's selling rate; override per job. |
| **Warehouse** | Defaults to the job card's main warehouse; override per row if you draw from a different one. |
| **Amount** | `qty × rate`. |

> When the Sales Invoice is submitted, parts are deducted from their respective
> warehouses. If a part's warehouse stock is insufficient, the invoice
> submission will fail — see [Troubleshooting](./troubleshooting.md).

---

## Live totals

Below the tables you'll see three rows:

- **Services total** — sum of service amounts.
- **Parts total** — sum of part amounts.
- **Grand total** — services + parts.

These update as you edit. Taxes are calculated on the Sales Invoice itself, not
the job card.

---

## Workflow actions

The **Workflow** row sits high on the page. It shows the workflow transitions
you're allowed to take from the current status, given your role.

| Action button | Moves status to |
|---|---|
| **Check In** | Checked In |
| **Inspect** | Inspected |
| **Estimate** | Estimated |
| **Approve** | Approved |
| **Start Work** | In Progress |
| **Ready To Invoice** | Ready to Invoice |
| **Close** | Closed |
| **Cancel job** | Cancelled |

For the full diagram and rules, see [Workflows](./workflows.md).

> The status label *Invoiced* is set automatically when you create a Sales
> Invoice — it's not a manual transition.

---

## Creating a Quotation

Once the lines are in place:

1. Click **Create quotation**.
2. The portal posts a Frappe Quotation with all your service + part lines.
3. A toast confirms; the **Quotation** link appears in the **Linked records**
   section.

The customer can be sent the standard Frappe quotation PDF.

---

## Creating a Sales Invoice

When the work is complete and approved for billing:

1. Click **Create sales invoice**.
2. The portal posts a Sales Invoice with the same lines.
3. **Status auto-flips to *Invoiced***.
4. Open the invoice in Desk to add payment.

> The Sales Invoice has a `custom_job_card` field linking back to this job — you
> can always trace any invoice to its source work order.

---

## Closing the job

After the invoice is settled:

1. Click **Close** in the Workflow row.
2. Status moves to **Closed**.

A closed job card is the terminal state. The job card stays accessible for
history; you can no longer edit it without re-opening via Desk.

---

## Cancelling a job

If the customer changes their mind or the job can't be completed:

1. Click **Cancel job**.
2. Confirm in the popup.
3. Status moves to **Cancelled**.

Cancelled jobs can be cancelled from any state except *Invoiced* and *Closed*.

> If a Sales Invoice has been created, you can't simply cancel the job card. You
> must first cancel the Sales Invoice in Desk (Accounts User role required),
> which lets the job card move out of *Invoiced*.

---

## The list page

### Table view
Sortable columns: ID, Customer, Vehicle, Status, Appointment, Desk link.

Filters: status, customer, advisor, date range, free-text search.

### Kanban view
One column per workflow state. Each card shows the job ID, customer, vehicle,
and a thin progress bar.

**Drag** a card between columns to advance the workflow. Drops that aren't
allowed by the workflow are rejected with an error toast.

> Kanban respects role permissions — you can only drag to a state your role is
> allowed to move to.

---

## Useful keyboard tips

- `Tab` cycles through editable cells in line tables.
- `Esc` closes any open modal.
- The **Open in Desk** link in the top-right opens the full ERPNext form in a
  new tab — useful for adding taxes, attachments, or terms.

---

## Tips

- **Plan the workflow before you start clicking.** Going *Draft → Checked In →
  Inspected → Estimated → Approved → In Progress* in order is faster than
  jumping around because the wrong forward action requires Desk to fix.
- **Use Quotation, not Sales Invoice, for non-committed estimates.** Quotations
  don't post to accounting; invoices do.
- **Save line edits before workflow actions** — the action submits the job in
  its current state and skipping saves can lose your changes.

---

## Next steps

- Read the full [Workflows reference](./workflows.md).
- See how invoices and stock interact: [Stock Management](./stock-management.md).
- For pricing rules and taxes, check the Sales Invoice in Desk.
