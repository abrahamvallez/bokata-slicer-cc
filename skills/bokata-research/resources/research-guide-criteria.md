# Research Guide: Acceptance Criteria

The goal is to build a library of domain constraints that ac-analyst will apply
Document answers inline. Mark unresolved items as `UNRESOLVED: <default used>`.

---

## Domain-Level Research Checklist

Answer the following for the feature domain as a whole

---

### 1. Entities & State Model

**Questions to answer:**
- What are the main entities in this domain? (e.g., Order, User, Product)
- What states can each entity be in?
- What transitions are valid between states?
- What system state must exist before actions in this domain can be triggered?

**Format:**
```
ENTITY: [name]
  STATES: [list of valid states]
  TRANSITIONS: [from] → [to] — trigger: [what causes it]
  PRE: [conditions required before any action on this entity]
  POST-SIDE-EFFECTS: [other entities typically affected]
```

---

### 2. Permission Matrix

**Questions to answer:**
- Which actors can perform actions in this domain?
- Which actors are explicitly restricted from which categories of action?
- Are there conditional permissions? (owner only, admin overrides, time-based)

**Format:**
```
ALLOWED for [action category]: [actor list]
DENIED for [action category]: [actor list — reason]
CONDITIONAL: [actor — condition — allowed/denied]
```

These generate **negative permission scenarios** in the ACs.

---

### 3. Numeric Limits & Format Constraints

**Questions to answer:**
- Are there minimum/maximum values for any field in this domain? (length, quantity, score range)
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
- What side effects are typical for mutations in this domain?
- Do actions trigger notifications? (email, push, in-app)
- Do they emit domain events that other systems react to?
- Do they update audit logs or activity feeds?
- Do they affect state in OTHER entities beyond the primary one?

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
CONTEXT: [features/actions where this applies]
```

---

## Research Output Format

After completing research, document as:

```markdown
## Criteria Research Summary

### Business Rules
- [validation constraints, uniqueness rules, allowed values found in this domain]
- [business logic patterns that apply across multiple actions]

### Permissions & Roles
ALLOWED for [action category]: [actor list]
DENIED for [action category]: [actor list — reason]
CONDITIONAL: [actor — condition — allowed/denied]

### State & Transitions
ENTITY: [name]
  STATES: [list]
  TRANSITIONS: [from] → [to] — trigger: [what causes it]
  SIDE_EFFECTS: [notifications, events, cascades]

### Boundary Conditions
FIELD: [field name]
  MIN/MAX: [values]
  FORMAT: [description]
  UNIQUE: yes/no
  ALLOWED_VALUES: [list if enum]

### Domain Invariants
INVARIANT: [rule that must always hold]
CONTEXT: [features/actions where this applies]

### Unresolved
UNRESOLVED: [item] — defaulting to [value]
```
