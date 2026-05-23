---
title: Installation
description: Install Workshop Management on an existing Frappe / ERPNext bench.
sidebar_position: 2
---

# Installation

Workshop Management is a Frappe app. You install it on an existing bench that
already has ERPNext.

---

## Prerequisites

| Requirement | Minimum |
|---|---|
| Frappe Framework | 14.0.0 |
| ERPNext | 14.0.0 |
| Python | 3.10 |
| Node.js | 18 (for the Vue portal build) |
| MariaDB / Postgres | per Frappe support matrix |
| Redis | per Frappe support matrix |

> If you don't yet have a Frappe bench, follow the official
> [Frappe Bench install guide](https://frappeframework.com/docs/user/en/installation)
> first.

---

## Step 1 — Get the app

From your bench directory:

```bash
cd ~/frappe-bench
bench get-app https://github.com/samudithTharindaka/workshop_mgmt.git
```

Alternatively, if you already have the source checked out locally:

```bash
cd ~/frappe-bench/apps
git clone https://github.com/samudithTharindaka/workshop_mgmt.git
cd ~/frappe-bench
bench setup requirements --app workshop_mgmt
```

---

## Step 2 — Install on a site

Pick the site you want to add Workshop Management to and install:

```bash
bench --site <your-site> install-app workshop_mgmt
```

This runs the app's `after_install` hooks, which:

- Seed a small set of demo service / part items.
- Configure customer portal access (so end customers can optionally view their
  vehicles and invoices at `/me`).
- Create the **Workshop Job Card** ERPNext Workflow (skipped if another active
  workflow already exists on Job Card).

---

## Step 3 — Run migrations

```bash
bench --site <your-site> migrate
```

`after_migrate` re-runs the workflow setup so any updates to states or transitions
are applied.

---

## Step 4 — Build assets

```bash
bench build --app workshop_mgmt
```

This builds the static assets bundled with the Frappe app. The Vue portal at
`/workshop` is built separately:

```bash
cd apps/workshop_mgmt/frontend
npm install
npm run build
```

The build copies `index.html` into `www/workshop_portal.html`, so the Frappe page
serves the latest SPA.

---

## Step 5 — Restart

```bash
bench restart
```

If you're running with a dev process group:

```bash
bench start          # development
# or
sudo supervisorctl restart all   # production
```

---

## Verify the install

1. Open `https://<your-site>/workshop` — you should land on the Workshop Portal
   dashboard.
2. Open `https://<your-site>/app/workflow/Workshop Job Card` — the workflow
   should be present and Active.
3. Open `https://<your-site>/app/garage-dashboard` — the Desk-side dashboard
   loads.
4. Search Awesomebar (`Ctrl+K`) for "Workshop Management" — the workspace card
   should appear.

If any of these fail, see [Troubleshooting](./troubleshooting.md).

---

## Updating to a new version

```bash
cd ~/frappe-bench/apps/workshop_mgmt
git pull
cd ~/frappe-bench
bench --site <your-site> migrate
bench build --app workshop_mgmt
cd apps/workshop_mgmt/frontend && npm install && npm run build
bench restart
```

> Always back up first: `bench --site <your-site> backup --with-files`.

---

## Uninstalling

```bash
bench --site <your-site> uninstall-app workshop_mgmt
```

This removes Workshop Management DocTypes, custom fields (including
`Sales Invoice → custom_job_card`), and the workflow. Existing Sales Invoices and
Customers (standard ERPNext data) are not touched.

---

## Next steps

Once installed, run through [Getting Started](./getting-started.md) to seed the
master data your first job card will need.
