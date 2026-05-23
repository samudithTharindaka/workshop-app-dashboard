---
title: Workflows
description: The Job Card workflow — states, transitions, roles, and how to customise it.
sidebar_position: 10
---

# Workflows

Workshop Management ships with a real ERPNext **Workflow** called
**Workshop Job Card**. It defines the 10 states a job card can be in, the
transitions between them, and the roles allowed to perform each transition.

If the workflow is what you're trying to understand, this is the page.

---

## The state diagram

```
Draft ──Check In──▶ Checked In ──Inspect──▶ Inspected ──Estimate──▶ Estimated
                                                                       │
                                                                   Approve
                                                                       ▼
Closed ◀──Close── Invoiced      Ready to Invoice ◀─Ready To Invoice─ Approved
                     ▲                                                 │
                     │ (set when Sales Invoice is created)         Start Work
                     │                                                 ▼
                     └──────────────────────────────────────────  In Progress
```

**Cancel** is available from every non-terminal state and sends the card to
**Cancelled**.

---

## States

See [Status Reference](./status-reference.md) for status colours and meanings.
In short:

| State | What "now" looks like |
|---|---|
| Draft | Job created, nothing done |
| Checked In | Vehicle on premises |
| Inspected | Walk-around / checklist done |
| Estimated | Lines & pricing entered |
| Approved | Customer signed off the estimate |
| In Progress | Technician actively working |
| Ready to Invoice | Work done, ready to bill |
| Invoiced | Sales Invoice exists |
| Closed | Settled and archived |
| Cancelled | Terminated |

---

## Transitions

Each forward action requires a role. The shipped defaults below are typical for
a small workshop; adjust them in Desk to match your team's structure.

| Action button | From → To | Default roles |
|---|---|---|
| **Check In** | Draft → Checked In | Service Advisor, Workshop Manager |
| **Inspect** | Checked In → Inspected | Technician, Workshop Manager |
| **Estimate** | Inspected → Estimated | Service Advisor, Workshop Manager |
| **Approve** | Estimated → Approved | Workshop Manager *(customer approval recorded here)* |
| **Start Work** | Approved → In Progress | Technician, Workshop Manager |
| **Ready To Invoice** | In Progress → Ready to Invoice | Technician, Workshop Manager |
| **(Auto)** | Ready to Invoice → Invoiced | (set when Sales Invoice is submitted) |
| **Close** | Invoiced → Closed | Service Advisor, Workshop Manager |
| **Cancel job** | Any non-terminal → Cancelled | Workshop Manager *(any role with `cancel` permission)* |

> **Invoiced is special.** It is not a manual transition. The backend sets it
> when you click **Create sales invoice** on the job card detail page and the
> invoice is created successfully.

---

## How transitions are gated

For any transition button to appear in the Portal:

1. The workflow must be **Active**.
2. The current logged-in user must have one of the **Allowed Roles** for that
   transition.
3. The card must currently be in the **From** state.

If any of those fail, the button is hidden. If all three pass but you still
don't see the button, refresh the page — the backend transition list is
fetched on page load, not live.

> When *no* actions are visible, the Portal shows: *"No actions for your role,
> or workflow not active. Use Desk to advance status."* This is your hint to
> ask an admin to check the workflow.

---

## Cancelling

You can cancel a job card from any state **except** Invoiced and Closed.

- **From Invoiced** — cancel the Sales Invoice first in Desk (requires Accounts
  User role). Once cancelled, the job card moves back to *Ready to Invoice* and
  can be cancelled normally.
- **From Closed** — closed is terminal. Don't cancel a closed job; re-issue a
  new corrective document via Desk if business correction is needed.

---

## Customising the workflow

Workshop Management ships sensible defaults. Most workshops will want to tweak
the role allowed on at least one transition.

### Where to edit

`/app/workflow/Workshop Job Card`

### Common tweaks

| You want… | Edit |
|---|---|
| Anyone to be able to check in | Add `All` to the **Check In** transition's Allowed Roles |
| Only managers to approve | Remove other roles from **Approve**'s Allowed Roles |
| A new state between Estimated and Approved | Add the state in *States* (give it a colour and unique name), then update the *Estimate* transition's **Next State** and add a new transition |
| To rename a state's display label | Change the `Doc Status` text. Update the Portal's `statusPillClass()` if you've renamed an active status |

After editing the workflow, the change takes effect for new state evaluations
immediately. Existing job cards keep their current state.

### If you customise heavily

Be aware:

- The Portal's status pill colour function is hard-coded to the shipped state
  names. Renamed states will display as the *neutral / draft* pill until you
  update `statusPillClass()` in:
  - `frontend/src/views/JobCardsView.vue`
  - `frontend/src/views/JobCardDetailView.vue`
  - `frontend/src/components/ui/WxJobCardDrawer.vue`
- A workflow with **Is Active** unchecked makes the Portal's action buttons
  disappear (the backend returns no transitions). Re-tick **Is Active** to
  restore the buttons.

---

## What happens if no workflow exists

If for any reason the **Workshop Job Card** workflow is not installed or
becomes inactive, the Portal handles it gracefully:

- The detail page shows: *"No actions for your role, or workflow not active.
  Use Desk to advance status."*
- The kanban view's drag-to-change-status falls back to a direct status update
  (no permission check).
- Status changes still work from Desk via the standard *Action* button.

To re-install the shipped workflow, just run:

```bash
bench --site <your-site> migrate
```

The `after_migrate` hook re-creates the workflow if no active one exists.

---

## Auditing transitions

Every workflow transition is logged automatically. To view the audit trail:

1. Open the job card in Desk.
2. Scroll to the bottom — the **Activity** log shows status changes with
   user and timestamp.

For workshop-wide auditing, run the *Job Cards by Status* report (see
[Reports](./reports.md)).

---

## Recipe — typical happy path

The common end-to-end transition sequence:

```
1. Service Advisor clicks Check In       (Draft → Checked In)
2. Technician clicks Inspect             (Checked In → Inspected)
3. Service Advisor clicks Estimate       (Inspected → Estimated)
4. Workshop Manager clicks Approve       (Estimated → Approved)
5. Technician clicks Start Work          (Approved → In Progress)
6. Technician clicks Ready To Invoice    (In Progress → Ready to Invoice)
7. Accounts User creates Sales Invoice   (Ready to Invoice → Invoiced)
8. Service Advisor clicks Close          (Invoiced → Closed)
```

8 clicks, 4 different roles, 1 job from booking to closed.

---

## Next steps

- See [Status Reference](./status-reference.md) for state colours.
- See [Troubleshooting](./troubleshooting.md) if a transition won't apply.
