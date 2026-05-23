---
title: Troubleshooting
description: Common errors and how to resolve them — install, portal, workflow, stock, invoicing.
sidebar_position: 11
---

# Troubleshooting

This page collects the errors and surprises that come up most often when
running Workshop Management. Each item includes the symptom you'll see, the
cause, and the fix.

If your issue isn't here, raise it at
[github.com/samudithTharindaka/workshop_mgmt/issues](https://github.com/samudithTharindaka/workshop_mgmt/issues).

---

## Install & build

### "App not found" when running `bench install-app`

**Symptom**
```
bench --site mysite install-app workshop_mgmt
✗ App workshop_mgmt not found
```

**Cause**: the app source isn't in `apps/` yet.

**Fix**:

```bash
cd ~/frappe-bench
bench get-app https://github.com/samudithTharindaka/workshop_mgmt.git
bench --site mysite install-app workshop_mgmt
```

### Frontend build fails with "Cannot find module 'vue'"

**Symptom**
```
cd apps/workshop_mgmt/frontend && npm run build
Error: Cannot find module 'vue'
```

**Cause**: dependencies aren't installed.

**Fix**:

```bash
cd apps/workshop_mgmt/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Portal at `/workshop` shows a blank page

**Symptom**: `/workshop` loads but the page is empty.

**Causes & fixes**:

1. The frontend hasn't been built. Run:
   ```bash
   cd apps/workshop_mgmt/frontend && npm run build
   ```
2. Browser cache. Hard-refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac).
3. Frappe cache. Run:
   ```bash
   bench --site <site> clear-cache && bench restart
   ```
4. The `workshop_portal.html` is stale. The build step should refresh it; if
   the build succeeded but the file is old, re-run the build and check that
   `apps/workshop_mgmt/workshop_mgmt/www/workshop_portal.html` was updated.

### Network errors only in the Portal, not in Desk

**Symptom**: `/workshop` shows red banners on every screen with 401/403 errors,
but `/app` works.

**Cause**: the user is not logged in to Frappe in this browser session, or CSRF
token mismatch.

**Fix**: visit `/app` first, log in, then return to `/workshop`. If you're using
a separate domain for the SPA, make sure the cookie domain matches.

---

## Workflow

### "No actions for your role, or workflow not active"

**Symptom**: a job card's *Workflow* row shows the message above and no buttons.

**Causes**:

1. The **Workshop Job Card** workflow isn't installed or is inactive.
2. Your user doesn't have any of the roles allowed on the current state's
   transitions.

**Fixes**:

1. Open `/app/workflow/Workshop Job Card`. Check **Is Active** is ticked.
2. Run `bench --site <site> migrate` to re-install if missing.
3. Check your user's roles at `/app/user/<your-id>`. Add a role that the
   workflow's transitions allow (see [Workflows](./workflows.md)).

### A workflow button disappears mid-session

**Symptom**: a transition button you used earlier today is no longer there.

**Cause**: the card's status has moved on — the buttons reflect the *current*
state's allowed transitions, not all transitions.

**Fix**: this is expected. To go back to a previous state, you generally cancel
and re-create. Don't try to back-edit status — it corrupts the audit trail.

### The Cancel button is missing

**Symptom**: you want to cancel a job card but no *Cancel job* button appears.

**Cause**: the job is in *Invoiced* or *Closed*.

**Fix**:

- For *Invoiced*: open the linked Sales Invoice in Desk and **Cancel** it
  (requires Accounts User role with cancel permission). The job card moves
  back to *Ready to Invoice* and can now be cancelled.
- For *Closed*: closed is terminal. Cannot be cancelled.

---

## Sales Invoice & stock

### "Item is a stock item but no warehouse is set"

**Symptom**: creating a Sales Invoice from a job card fails with:
```
Row N: Warehouse is mandatory for stock item X
```

**Cause**: a part line on the job card has no warehouse, or the item became a
stock item after being added to the card.

**Fix**:

1. Open the job card in the Portal.
2. For every part row, set the **Warehouse** column.
3. Save.
4. Click **Create sales invoice** again.

### "Insufficient stock for item X at warehouse Y"

**Symptom**: invoice submission fails with negative stock errors.

**Cause**: the part's warehouse doesn't have enough on hand.

**Fixes**:

- Receive more stock via Stock Entry (Material Receipt) or Purchase Receipt.
- Or change the part line's warehouse to one that has stock.
- Or reduce the qty on the job card line if the customer agrees.

### Sales invoice posts but stock isn't deducted

**Symptom**: invoice submitted, stock balance unchanged.

**Causes**:

1. The item on the invoice isn't a stock item (`Is Stock Item` unchecked).
2. The invoice has **Update Stock** unchecked.

**Fix**:

- Verify the item is marked `Is Stock Item = true` at `/app/item/<code>`.
- Open the invoice, scroll to *Accounting Dimensions*, check **Update Stock**,
  re-submit (you may need to cancel and re-submit).

### `custom_job_card` field missing on Sales Invoice

**Symptom**: the link from invoice back to job card isn't there.

**Cause**: the fixture didn't apply, usually because the app wasn't migrated
after install.

**Fix**:

```bash
bench --site <site> migrate
bench --site <site> clear-cache
```

This re-applies fixtures, including the `custom_job_card` Custom Field on Sales
Invoice.

### Creating Sales Invoice from job card silently fails

**Symptom**: the button click does nothing, no toast appears.

**Cause**: usually a permission issue — your user can't write Sales Invoice.

**Fix**:

- Check browser console (`F12`) for the actual API error.
- Add the **Accounts User** role to the user, or change the *Create sales
  invoice* permission in `/app/role-permission-manager`.

---

## Forms & data

### "Customer is mandatory" on a new appointment

**Symptom**: clicking *Create* on the new appointment modal raises this error
in a toast.

**Cause**: the *Customer* select wasn't actually populated (sometimes the
inline create flow leaves it blank after the modal closes).

**Fix**: open the customer dropdown and pick the customer you just created.

### Vehicle dropdown stays disabled after picking a customer

**Symptom**: you picked a customer in the new-appointment modal, the Vehicle
dropdown stays greyed out.

**Cause**: the customer has no vehicles on file.

**Fix**: click the **+** next to the **Vehicle** dropdown to inline-create one.

### "Inspection already exists for this appointment"

**Symptom**: trying to create a new inspection raises this error.

**Cause**: only one inspection per appointment is allowed by the backend.

**Fix**: open the existing inspection from the appointment drawer's *Inspection*
link instead.

---

## Dashboard & reports

### Dashboard shows zero revenue but invoices exist

**Symptom**: today's revenue card shows `0.00` but invoices were posted.

**Causes**:

1. The invoice's *Posting Date* isn't today.
2. The invoice is still in *Draft* (not submitted).
3. The invoice's *Company* doesn't match the filter applied to the dashboard.

**Fix**: open the invoice and confirm posting date + submitted status.

### `pi-money-bill` icon missing on dashboard

**Symptom**: a square placeholder appears where the wallet/coins icon should be.

**Cause**: PrimeIcons font didn't load.

**Fix**: rebuild the frontend:

```bash
cd apps/workshop_mgmt/frontend && npm run build
```

Hard-refresh the page.

### "Loading dashboard…" never ends

**Symptom**: the dashboard stays on its loading message.

**Causes**:

1. The whitelisted method `get_dashboard_data` is failing on the server.
2. The user lacks read permission on one of the DocTypes the method queries.

**Fix**:

- Check the browser console for the failing network request and read the
  server error.
- Common cause: the user doesn't have read permission on **Vehicle** or
  **Service Appointment**. Add via *Role Permission Manager*.

---

## Theme & UI

### Dark mode looks broken (white-on-white or black-on-black)

**Symptom**: switching to dark mode produces unreadable text.

**Cause**: an old build is being served — the new design tokens (brand-tinted
dark mode) aren't in the bundle yet.

**Fix**:

```bash
cd apps/workshop_mgmt/frontend
npm run build
```

Hard-refresh the Portal.

### Theme toggle doesn't persist between sessions

**Symptom**: refreshing resets you to light mode.

**Cause**: the `useTheme` composable writes to `localStorage`. If your browser
blocks localStorage (private mode, strict cookie settings), this won't stick.

**Fix**: allow site cookies/storage for your Frappe site, or use a non-private
window.

### Live indicator dot isn't pulsing

**Symptom**: the **LIVE** dot in the header is static.

**Cause**: `prefers-reduced-motion` is enabled at the OS level. This is by
design — the live-dot animation respects this setting.

**Fix**: not a bug. Disable reduced motion at the OS level if you want the
animation.

---

## Permissions

### "User does not have access to this resource"

**Symptom**: a route returns 403 in the Portal, or a Desk form refuses to open.

**Cause**: standard ERPNext permission system blocking the action.

**Fix**:

1. Identify the DocType and action from the error.
2. Open `/app/role-permission-manager`.
3. Add the user's role with the right permission (read, write, create,
   submit, cancel) for that DocType.

### Customer portal users see job cards from other customers

**Symptom**: customer logs in at `/me` and sees data not belonging to them.

**Cause**: the *Has Permission* hooks aren't applied. This is normally set by
`after_install` but can be skipped if the install was interrupted.

**Fix**: run `bench --site <site> migrate` to re-apply hooks.

---

## Bench-level

### `bench start` fails after install

**Symptom**: `bench start` crashes with a Python import error.

**Cause**: a Python dependency wasn't installed.

**Fix**:

```bash
bench setup requirements --app workshop_mgmt
```

### Migrations hang on "Updating DocType..."

**Symptom**: `bench migrate` sits forever on a particular DocType.

**Cause**: usually a stuck database connection, or a long ALTER TABLE on a
large table.

**Fix**:

1. Open another terminal.
2. Run `bench --site <site> mariadb` and `SHOW PROCESSLIST;`.
3. Identify the blocking query and `KILL <id>` if safe.
4. Re-run `bench migrate`.

---

## How to get more diagnostic detail

Most "silent" Portal errors leave a trail in:

- **Browser console** (`F12` → Console + Network tabs).
- **Frappe error log**: `/app/error-log`.
- **Server log**: `tail -f frappe-bench/logs/web.log frappe-bench/logs/worker.log`.

When raising an issue, include the relevant log excerpts — it shortens the
turnaround dramatically.

---

## Next steps

- Most errors here resolve faster after you understand the
  [Workflow](./workflows.md) and [Status Reference](./status-reference.md).
- For deployment questions, the [Installation](./installation.md) page covers
  prerequisites and verification.
