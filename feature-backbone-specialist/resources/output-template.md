## Features Backbone

### Feature Overview
[Brief narrative of the complete user journey, 2-3 sentences]

---

### Features Map

#### Feature 1: [Actor] [Verb] [Object]
**Purpose:** [What the user accomplishes with this feature]

---

#### User Task 1.1: [Verb] [Object]
[One-line description of what the user does]

**Rule: [Constraint or business logic statement]**

```gherkin
Scenario: [Scenario name]
  Given [precondition / context]
  When [user action]
  Then [observable result]
  And [additional assertion if needed]
```

<!-- Add one or more Gherkin scenarios per Rule. Each Rule can have as many scenarios as needed to cover happy paths and edge cases. -->

**Rule: [Another constraint for the same task]**

```gherkin
Scenario: [Scenario name]
  Given [context]
  When [action]
  Then [result]
```

<!-- Repeat: add more Rules + their scenarios until the task is fully specified. -->

---

#### User Task 1.2: [Verb] [Object]
[One-line description]

**Rule: [Constraint]**

```gherkin
Scenario: [Scenario name]
  Given [context]
  When [action]
  Then [result]
```

---

#### System Task 1.X: [Verb] [Object]
**Trigger:** [workflow transition that fires it — e.g. "order confirmed", "session expired"]
The system [description of what it executes and what it produces].

---

#### Feature 2: [Actor] [Verb] [Object]
**Purpose:** [What the user accomplishes with this feature]

---

#### User Task 2.1: [Verb] [Object]
[One-line description]

**Rule: [Constraint]**

```gherkin
Scenario: [Scenario name]
  Given [context]
  When [action]
  Then [result]
```

---

### Feature Dependencies
- **Critical**: [Feature X] must exist before [Feature Y]
- **Recommended**: [Feature A] before [Feature B]
- **Independent**: [Features] can be done in any order
