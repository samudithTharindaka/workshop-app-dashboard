---
title: Stock Management
description: Adding services, parts, opening stock, warehouses, and how stock moves through Job Cards.
sidebar_position: 8
---

# Stock Management

Workshop Management uses standard ERPNext inventory. There are two kinds of
items you'll sell on a job card: **services** (labour, no stock) and **parts**
(real inventory).

This page walks through both, plus the stock movements that happen when a job
card gets invoiced.

---

## The mental model

| Concept | Where it lives | Why it matters |
|---|---|---|
| **Item** | `/app/item` | Anything you sell — labour, oil, brake pads. Has *Is Stock Item* on/off |
| **Warehouse** | `/app/warehouse` | A physical (or logical) location holding inventory |
| **Stock Balance** | `/app/stock-balance` | Quantity of an item at a warehouse, now |
| **Stock Entry** | `/app/stock-entry` | A document that moves stock (receipt, issue, transfer) |
| **Stock Ledger Entry** | `/app/stock-ledger-entry` | Auto-generated audit trail of every stock movement |

A Job Card's part lines reference items and warehouses. When the linked Sales
Invoice is **submitted**, ERPNext creates the appropriate stock ledger entries
automatically.

---

## Service items (labour, no stock)

Services don't deplete inventory. They're items with `Is Stock Item` unchecked.

### Creating a service item

1. Go to `/app/item` → **+ Add Item**.
2. Set:

| Field | Value |
|---|---|
| **Item Code** | `LAB-OIL-CHANGE` (any unique code) |
| **Item Name** | `Oil Change` |
| **Item Group** | `Services` (create the group if needed) |
| **Stock UOM** | `Hour` or `Nos` |
| **Is Stock Item** | **unchecked** |
| **Disabled** | unchecked |
| **Standard Selling Rate** | the default labour rate |

3. Save.

### Suggested service catalogue

| Service | Code | Typical UOM |
|---|---|---|
| Oil change | `LAB-OIL` | Hour |
| Brake service | `LAB-BRAKE` | Hour |
| Tire rotation | `LAB-ROTATE` | Hour |
| Wheel alignment | `LAB-ALIGN` | Hour |
| Engine diagnostic | `LAB-DIAG` | Hour |
| Pre-purchase inspection | `LAB-INSPECT` | Nos |
| AC service | `LAB-AC` | Hour |

> A service item with `Is Stock Item` checked will fail submission of any Sales
> Invoice referencing it (it'll demand a quantity to deduct from a non-existent
> warehouse). Double-check the flag.

---

## Part items (stock inventory)

Parts deplete inventory when sold.

### Creating a part item

1. Go to `/app/item` → **+ Add Item**.
2. Set:

| Field | Value |
|---|---|
| **Item Code** | `PART-OIL-FILTER-COROLLA-2018` |
| **Item Name** | `Oil Filter — Toyota Corolla 2018` |
| **Item Group** | `Auto Parts` |
| **Stock UOM** | `Nos` |
| **Is Stock Item** | **checked** |
| **Maintain Stock** | checked |
| **Default Warehouse** | your stock warehouse |
| **Standard Buying Rate** | average cost |
| **Standard Selling Rate** | retail price |
| **Reorder Level** | when to flag low stock |

3. Save.

### Suggested item groups

| Group | Examples |
|---|---|
| **Filters** | Oil, air, fuel, cabin |
| **Brakes** | Pads, rotors, fluid, shoes |
| **Belts & Hoses** | Drive belt, timing belt, radiator hose |
| **Electrical** | Battery, bulbs, fuses |
| **Fluids** | Engine oil, coolant, transmission fluid, brake fluid |
| **Tires** | By size / brand |

Item groups give you cleaner reports later (top parts by group, etc.).

---

## Warehouses

A warehouse is a location that holds stock. You need at least one before you
can submit a Sales Invoice with parts.

### Creating a warehouse

1. Go to `/app/warehouse` → **+ Add Warehouse**.
2. Set:

| Field | Value |
|---|---|
| **Warehouse Name** | `Main Stores` |
| **Parent Warehouse** | `All Warehouses - <Company>` |
| **Is Group** | **unchecked** (only leaf warehouses hold stock) |
| **Company** | your Company |

3. Save.

### Multiple warehouses

You might run:

- **Main Stores** — primary stock.
- **Front Counter** — fast-moving items reserved for the floor.
- **Damaged Stock** — quarantine for returns.
- **Transit** — items moving between branches.

For a single-shop setup, one warehouse is enough.

---

## Setting opening stock

If you have inventory on hand when you go live, log it as a **Material Receipt**:

1. Go to `/app/stock-entry` → **+ New**.
2. Set:

| Field | Value |
|---|---|
| **Stock Entry Type** | `Material Receipt` |
| **Default Target Warehouse** | your stock warehouse |
| **Posting Date** | today (or your inventory date) |

3. Add one row per item:
   - **Item Code**
   - **Qty**
   - **Basic Rate** (your cost — this is the *valuation* rate, not selling price)

4. **Save** then **Submit**.

After submission, the items have a usable stock balance — confirm at
`/app/stock-balance`.

> For ongoing inventory replenishment, use **Purchase Receipt** (`/app/purchase-receipt`)
> instead of Stock Entries. Purchase Receipts tie into vendors, payables, and
> the full ERPNext purchasing flow.

---

## How stock moves on a Job Card

Here's the full lifecycle of a stock item from job card to ledger:

1. **Job card draft.** You add a part line: item, qty, rate, warehouse. No stock
   movement yet — the job card itself doesn't touch the ledger.
2. **Quotation (optional).** Same — Quotations don't move stock.
3. **Sales Invoice creation.** When you click *Create sales invoice* on the job
   card, the line items are copied to a draft Sales Invoice. Still no stock
   movement.
4. **Sales Invoice submission.** When you (or the accounts user) submits the
   invoice in Desk, ERPNext creates:
   - A **Stock Ledger Entry** debiting the warehouse for each part qty.
   - A **GL Entry** for the income, COGS, and stock accounts.

If a part's warehouse doesn't have enough stock when the invoice is submitted,
submission fails. Receive more stock or change the warehouse first.

---

## Reorder management

ERPNext can warn you (or auto-create a Material Request) when stock dips below a
threshold:

1. On the Item, scroll to **Auto Re-Order**.
2. Add a row:
   - **Warehouse** — which warehouse to monitor
   - **Re-order Level** — the qty at which to alert
   - **Re-order Qty** — how much to request
   - **Material Request Type** — Purchase

3. Save.

Now if stock falls below the level, ERPNext flags it. Re-order alerts surface
on the Item dashboard and in `/app/material-request`.

---

## Useful reports

| Report | What it tells you |
|---|---|
| **Stock Balance** | Current qty per item per warehouse |
| **Stock Ledger** | Every stock movement, audit-style |
| **Item Shortage Report** | Items below re-order level |
| **Parts Consumption** (workshop) | Parts used by workshop, by month |

See [Reports](./reports.md) for workshop-specific reports.

---

## Tips

- **Don't mix services with stock.** Services should always have `Is Stock Item`
  unchecked. If a labour item slips into stock by accident, it will block
  invoice submission until fixed.
- **Use consistent item codes.** A code like `PART-FILTER-OIL-COROLLA-2018` is
  much more useful than `OIL-FILTER-1` for both stock searches and reports.
- **Keep valuation honest.** When you submit a Stock Entry, the Basic Rate
  becomes the item's valuation. Wrong rates here distort margin reports
  forever.
- **Per-line warehouse override exists for a reason.** If you keep a courtesy
  battery in *Front Counter*, override that one line's warehouse rather than
  changing the job card's default.

---

## Next steps

- See the [Job Card](./job-cards.md) page for how part lines are entered.
- Open the **Stock** module in Desk for purchase orders, transfers, and bin
  movements.
