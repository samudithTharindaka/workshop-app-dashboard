---
title: Getting Started
description: First-time setup checklist — fiscal year, company, warehouse, items, users.
sidebar_position: 3
---

# Getting Started

The app is installed. Before you book your first appointment, ERPNext needs a few
master records in place. This page walks through every prerequisite, with the
exact Desk path for each.

> Allow ~30 minutes for a clean setup. After this, your team can start using the
> Workshop Portal end-to-end.

---

## Quick checklist

| # | Task | Where |
|---|---|---|
| 1 | Set up the Company | `/app/company` |
| 2 | Create / verify the active Fiscal Year | `/app/fiscal-year` |
| 3 | Create at least one Warehouse for parts | `/app/warehouse` |
| 4 | Create service (labour) Items | `/app/item` |
| 5 | Create part (stock) Items | `/app/item` |
| 6 | Set opening stock for parts | `/app/stock-entry` |
| 7 | Create user accounts and assign roles | `/app/user` |
| 8 | Add a Customer and a Vehicle | `/app/customer`, `/app/vehicle` |
| 9 | Verify the Job Card workflow | `/app/workflow/Workshop Job Card` |

Work through them in order — each one depends on the ones above.

---

## 1. Company

In a single-company setup the default Company is usually fine. To verify:

- Go to `/app/company`.
- Confirm at least one Company exists (e.g. *Acme Auto Pty Ltd*).
- Open it. Set:
  - **Default Currency** (e.g. LKR, USD, AUD).
  - **Country**.
  - **Default Receivable Account** (e.g. *Debtors - AAP*).
  - **Default Income Account** (e.g. *Sales - AAP*).
  - **Default Expense Account** for cost of goods sold.

Sales Invoices created from a Job Card will use these defaults.

---

## 2. Fiscal Year

ERPNext refuses to post any accounting document outside an active Fiscal Year.

- Go to `/app/fiscal-year`.
- Make sure there is a Fiscal Year that covers today's date.
- If not, click **+ Add Fiscal Year** and create one (e.g. *2026-2027* spanning
  your jurisdiction's tax year).

---

## 3. Warehouse

Stock parts move in and out of warehouses. You need at least one.

- Go to `/app/warehouse`.
- Create a warehouse like **Main Stores - AAP** (or use an existing one).
- Set the **Parent Warehouse** if you're using a hierarchy.
- Make sure **Is Group** is unchecked — only leaf warehouses can hold stock.

> When you create a Job Card in the Portal, you'll pick this warehouse. Parts
> are reserved from it; deducted when the invoice posts.

---

## 4. Service (labour) items

Labour lines on a Job Card are Items with type *Service*, not stock items.

- Go to `/app/item` → **+ Add Item**.
- **Item Code**: `LAB-OIL-CHANGE` (or any code your team prefers).
- **Item Name**: `Oil Change` (or your service label).
- **Item Group**: `Services`.
- **Stock UOM**: `Hour` or `Nos`.
- **Is Stock Item**: **unchecked** — services don't deplete inventory.
- **Standard Selling Rate** (under Sales): the default labour rate.

Repeat for each labour service you charge:

| Suggested service | Code |
|---|---|
| Oil change | `LAB-OIL` |
| Brake service | `LAB-BRAKE` |
| Inspection | `LAB-INSPECT` |
| AC service | `LAB-AC` |
| Wheel alignment | `LAB-ALIGN` |
| Engine diagnostic | `LAB-DIAG` |

---

## 5. Part (stock) items

Parts are real inventory.

- Go to `/app/item` → **+ Add Item**.
- **Item Code**: e.g. `PART-FILTER-OIL-01`.
- **Item Name**: `Oil Filter — Toyota Corolla 2018`.
- **Item Group**: `Auto Parts`.
- **Stock UOM**: `Nos`.
- **Is Stock Item**: **checked**.
- **Default Warehouse** (under Inventory): the warehouse you created in step 3.
- **Standard Selling Rate** and **Standard Buying Rate**.

> Set a **Reorder Level** under the *Auto Re-Order* section so ERPNext can warn
> you when stock is low.

For details on stock workflows, see [Stock Management](./stock-management.md).

---

## 6. Set opening stock

For an existing inventory, log the starting quantity:

- Go to `/app/stock-entry` → **+ New**.
- **Stock Entry Type**: `Material Receipt`.
- Add a row for each part with target warehouse, quantity, and valuation rate.
- **Save** and **Submit**.

After submission, the parts have a usable stock balance.

> Skip this step if you'll be receiving stock through Purchase Receipts /
> Purchase Orders as you go.

---

## 7. Users and roles

- Go to `/app/user` → **+ Add User**.
- Enter their email, full name, role profile.
- Suggested role assignments:

| Role | Suggested for |
|---|---|
| **Service Advisor** *(custom)* | Front desk |
| **Technician** *(custom)* | Floor staff |
| **Workshop Manager** *(custom)* | Manager / shift lead |
| **Accounts User** | Accounting team |
| **System Manager** | Owner / admin |

Workshop Management uses standard ERPNext role-based permissions. Grant them via
`/app/role-permission-manager` for each DocType (Vehicle, Service Appointment,
Vehicle Inspection, Job Card).

---

## 8. First customer and vehicle

The fastest way is to use the Portal:

1. Open `/workshop/appointments`.
2. Click **+ New appointment**.
3. In the **Customer** dropdown, click **+** to inline-create a customer (name,
   mobile, email).
4. In the **Vehicle** dropdown, click **+** to inline-create the vehicle (plate,
   make, model, year, VIN).
5. Fill in scheduled start/end and click **Create**.

You now have your first appointment.

---

## 9. Verify the workflow

The Job Card workflow is installed automatically. Confirm it's Active:

- Go to `/app/workflow/Workshop Job Card`.
- The state list should include **Draft, Checked In, Inspected, Estimated,
  Approved, In Progress, Ready to Invoice, Invoiced, Closed, Cancelled**.
- The **Is Active** checkbox at the top must be ticked.

For the full state diagram and transitions, see [Workflows](./workflows.md).

---

## You're ready

You now have everything needed to run a real service end-to-end. Move on to:

- [Dashboard](./dashboard.md) — read the floor at a glance.
- [Appointments](./appointments.md) — booking and check-in.
- [Inspections](./inspections.md) — running the checklist.
- [Job Cards](./job-cards.md) — labour, parts, invoicing.
