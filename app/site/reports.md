---
title: Reports
description: The five standard workshop reports and the Desk-side Garage Business Dashboard.
sidebar_position: 12
---

# Reports

Workshop Management ships five standard reports plus a manager-focused Desk
dashboard. Use these to answer the daily and monthly questions that the
Portal's at-a-glance dashboard hints at.

All reports live in the **Reports** module of Desk and can be exported to CSV
or Excel from the report toolbar.

---

## Where to find them

| Method | Path |
|---|---|
| Sidebar (Desk) | Workshop Management → Reports |
| Direct | `/app/query-report/<Report Name>` |
| Search | `Ctrl+K` → start typing the report name |

---

## Daily Revenue

**Use for**: tracking day-by-day turnover. Pair with cashier reconciliations.

**Filters**: From Date, To Date, Company.

**Columns**:

| Column | Notes |
|---|---|
| Date | Sales Invoice posting date |
| Invoices | Count of submitted invoices that day |
| Subtotal | Total before tax |
| Tax | Total tax amount |
| Grand Total | Including tax |
| Paid | Sum of payments allocated to those invoices |
| Outstanding | Grand Total − Paid |

**Tip**: schedule a recurring export to email yourself a weekly summary via
`/app/auto-email-report`.

---

## Job Cards by Status

**Use for**: pipeline health and bottleneck analysis. Answers "where are jobs
piling up?"

**Filters**: Company, Status, Service Advisor, From Date, To Date.

**Columns**:

| Column | Notes |
|---|---|
| Job Card | Mono-spaced ID |
| Customer | Customer name |
| Vehicle | Vehicle ID |
| Status | Workflow state pill |
| Service Advisor | Owner of the job |
| Posting Date | When created |
| Total | Service + parts subtotal |

**Tip**: filter to `Status = "In Progress"` to see what your technicians are
currently working on.

---

## Jobs Ready to Invoice

**Use for**: the billing queue. Run this every morning to make sure no
completed work is sitting unbilled.

**Filters**: Company, Service Advisor, From Date, To Date.

**Columns**:

| Column | Notes |
|---|---|
| Job Card | ID, click to open |
| Customer | Name + mobile |
| Vehicle | Plate + make/model |
| Service Advisor | Owner |
| Estimated Total | Service + parts subtotal |
| Days Ready | Days since the job moved to *Ready to Invoice* |

**Tip**: sort by *Days Ready* descending to surface neglected jobs first.

---

## Parts Consumption

**Use for**: inventory and purchasing decisions. Answers "what parts move and
how often?"

**Filters**: Company, Warehouse, Item Group, From Date, To Date.

**Columns**:

| Column | Notes |
|---|---|
| Item Code | Mono-spaced |
| Item Name | Friendly name |
| Item Group | e.g. *Filters*, *Brakes* |
| UOM | Stock UOM |
| Qty Sold | Total units consumed in the period |
| Total Revenue | Selling-price total |
| Avg Selling Rate | Total / Qty |
| Current Stock | Today's balance across all warehouses |

**Tip**: combine with *Stock Balance* (standard ERPNext report) to spot fast
movers that are also low.

---

## Vehicle Service History

**Use for**: per-vehicle history. Open before contacting a returning customer
to recap their last service.

**Filters**: Vehicle, Customer, From Date, To Date.

**Columns**:

| Column | Notes |
|---|---|
| Date | Job posting date |
| Job Card | Link |
| Service Items | Comma-separated list of labour items |
| Part Items | Comma-separated list of parts |
| Total | Final amount |
| Odometer In | Reading at intake |
| Advisor | Owner |
| Status | Workflow state |

**Tip**: print this report (`Print` button) when handing the vehicle back —
it's a useful service summary for the customer.

---

## Garage Business Dashboard (Desk)

A manager-level dashboard at `/app/dashboard-view/garage_business_dashboard`.

It bundles:

- Top KPIs (today/month revenue, outstanding, open jobs)
- Revenue trend chart (30 / 60 / 90 days)
- Job status doughnut
- Top services and parts
- Pending invoices list
- Today's appointments

Unlike the Portal dashboard, this one supports the standard Frappe dashboard
controls (date range, full-screen view, save as default).

---

## Building your own report

ERPNext supports two ways to build new reports without code:

| Type | Best for | Path |
|---|---|---|
| **Report Builder** | Simple filtered lists of a single DocType | `/app/build/?dt=Job Card` |
| **Query Report** | Joining multiple DocTypes, calculations | requires writing a SQL query in Desk |

For example, to build *"Job cards by customer for this year"*:

1. Open Job Card list.
2. Filter: `posting_date` between this year start and end.
3. Group by: Customer.
4. **Save** the filter as a new Report.

---

## Scheduling reports

Email any report on a schedule:

1. Open the report.
2. Click **Menu → Setup Auto Email**.
3. Pick frequency (daily, weekly, monthly), recipients, file format.

---

## Tips

- **Always set the Company filter** if you have multiple companies. Reports
  default to "all" otherwise.
- **CSV export beats screenshots** for sharing with non-Frappe stakeholders.
- **Drill-down works**: every row's primary ID is a hyperlink to the underlying
  document.
- **Permissions apply** — users only see report data they have read access to.
  A Technician won't see Sales Invoice columns even though Daily Revenue lists
  them; the columns show as blank.

---

## Next steps

- Pin the reports you use most to your sidebar (right-click the report name).
- Combine the [Dashboard](./dashboard.md) (real-time) with these reports
  (analytical) for daily ops.
