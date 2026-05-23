---
title: Documentation
description: Index of all Workshop Management documentation pages.
sidebar_position: 0
---

# Workshop Management — Documentation

A complete, self-contained set of documentation pages, ready to drop into your
docs website. Each file has frontmatter (`title`, `description`,
`sidebar_position`) compatible with Docusaurus, MkDocs, Mintlify, Nextra, or any
other Markdown-based docs platform.

---

## Reading order

For new users, read in this order. For reference look-ups, jump straight to the
page you need.

### Get oriented

1. **[Introduction](./introduction.md)** — what the app is, who it's for, and
   the core concepts.

### Install & set up

2. **[Installation](./installation.md)** — bench install, build, verify.
3. **[Getting Started](./getting-started.md)** — first-time setup checklist
   (fiscal year, items, users, etc.).

### Day-to-day usage

4. **[Dashboard](./dashboard.md)** — read the floor at a glance.
5. **[Appointments](./appointments.md)** — booking, check-in, lifecycle.
6. **[Inspections](./inspections.md)** — running the checklist, creating a job
   card from an inspection.
7. **[Job Cards](./job-cards.md)** — the central work order; labour, parts,
   workflow, invoicing.
8. **[Stock Management](./stock-management.md)** — services vs stock items,
   warehouses, opening stock, how invoices move inventory.

### Reference

9. **[Status Reference](./status-reference.md)** — every status across every
   entity with colour and meaning.
10. **[Workflows](./workflows.md)** — the Job Card workflow diagram,
    transitions, roles, and customisation.
11. **[Reports](./reports.md)** — five standard reports + the Garage Business
    Dashboard.
12. **[Troubleshooting](./troubleshooting.md)** — common errors, what causes
    them, and how to fix.

---

## How these docs are organised

- **Each page is self-contained** — you can read any one without first reading
  the others, though the *Reading order* above is the smoothest path.
- **Cross-links use relative paths** — `./workflows.md` etc. They should work
  unchanged in most docs platforms.
- **Tables, code blocks, and ASCII diagrams** are used liberally. No images
  yet — add your own screenshots and we recommend placing them in
  `./assets/` and linking from each page.

---

## File map

```
docs/site/
├── README.md                  ← this file
├── introduction.md            ← 1. What & who
├── installation.md            ← 2. Install
├── getting-started.md         ← 3. First-time setup
├── dashboard.md               ← 4. Dashboard
├── appointments.md            ← 5. Appointments
├── inspections.md             ← 6. Inspections
├── job-cards.md               ← 7. Job Cards
├── stock-management.md        ← 8. Stock
├── status-reference.md        ← 9. Statuses
├── workflows.md               ← 10. Workflow diagram + roles
├── reports.md                 ← 11. Reports
└── troubleshooting.md         ← 12. Errors & fixes
```

---

## Conventions used

- **Bold** for UI labels you'll see on screen ("**+ New appointment**").
- `Monospace` for code, file paths, item codes, and Frappe DocType field names.
- *Italics* for emphasis or status names ("the status moves to *Invoiced*").
- Tables for any structured comparison (more useful than prose for
  scanability).
- Headings use sentence case.
- Short paragraphs, generous whitespace, terse style.

---

## Contributing to these docs

These pages live in `apps/workshop_mgmt/docs/site/`. Edit any file as you
would code. If you add a new page:

1. Drop it in this folder with a clear filename (kebab-case).
2. Add frontmatter (`title`, `description`, `sidebar_position`).
3. Link to it from this README.
4. Cross-link to it from any sibling page that should reference it.

For deeper / technical docs (architecture, data model, API), see:

- `../DOCUMENTATION.md` — full technical reference.
- `../USER_GUIDE.md` — monolithic legacy user guide (these files supersede it).
- `../PORTAL_UI_CURRENT.md` — UI inventory for design handoff.

---

## Quick links

| Topic | Page |
|---|---|
| Install the app | [Installation](./installation.md) |
| First time using the app | [Getting Started](./getting-started.md) |
| Daily floor work | [Dashboard](./dashboard.md), [Appointments](./appointments.md), [Job Cards](./job-cards.md) |
| Why a status is what it is | [Status Reference](./status-reference.md) |
| Why a workflow button isn't there | [Workflows](./workflows.md) |
| Something is broken | [Troubleshooting](./troubleshooting.md) |
| Reading the numbers | [Reports](./reports.md) |
