# Research Guide: Acceptance Criteria

Use this guide per User Task before generating rules and scenarios.
Document answers inline. Mark unresolved items as `UNRESOLVED: <default used>`.

---

## Per User Task — Research Checklist

For each User Task, answer the following:

### 1. State Preconditions & Postconditions

**Questions to answer:**
- What system state must exist BEFORE this task can be triggered? (logged in, resource exists, status is X)
- What states are INVALID preconditions? (what blocks this action?)
- What is the expected system state AFTER successful completion?
- What state changes occur in related entities?

**Format:**
```
PRE: [required conditions]
PRE-INVALID: [blocked states]
POST: [resulting state]
POST-SIDE-EFFECTS: [other entities affected]
```

---

### 2. Permission Matrix

**Questions to answer:**
- Which actors can perform this task?
- Which actors are explicitly DENIED from performing this task?
- Are there conditional permissions? (owner only, admin overrides, time-based)

**Format:**
```
ALLOWED: [actor list]
DENIED: [actor list with reason]
CONDITIONAL: [actor — condition — allowed/denied]
```

These generate **negative permission scenarios** in the ACs.

---

### 3. Numeric Limits & Format Constraints

**Questions to answer:**
- Are there minimum/maximum values for any field? (length, quantity, score range)
- Are there valid vs invalid formats? (email regex, phone format, date range)
- Are there uniqueness constraints? (username must be unique, one submission per user)
- Are there allowed value sets? (enum, status options, categories)

**Format:**
```
FIELD: [field name]
  MIN: [value] | MAX: [value]
  FORMAT: [description or regex]
  UNIQUE: yes/no
  ALLOWED_VALUES: [list if enum]
```

---

### 4. Side Effects

**Questions to answer:**
- Does this action trigger notifications? (email, push, in-app)
- Does it emit domain events that other systems react to?
- Does it update audit logs or activity feeds?
- Does it affect state in OTHER entities beyond the primary one?

**Format:**
```
NOTIFICATIONS: [list triggered notifications]
EVENTS: [list emitted domain events]
AUDIT: yes/no — [what is logged]
CASCADES: [other entities updated]
```

---

### 5. Domain Invariants

**Questions to answer:**
- What rules must ALWAYS be true in this domain, regardless of input?
- Are there business rules that apply globally across multiple tasks?
- What would constitute data corruption if violated?

**Format:**
```
INVARIANT: [rule that must always hold]
APPLIES TO: [tasks affected]
```

---

## Research Output Format

After completing research for all User Tasks, document as:

```markdown
## Criteria Research Summary

### [User Task Name]
- **Preconditions:** [list]
- **Permissions:** allowed=[...] denied=[...]
- **Constraints:** [key limits/formats]
- **Side effects:** [notifications, events]
- **Invariants:** [applicable rules]
- **Unresolved:** UNRESOLVED: X — defaulting to Y
```
