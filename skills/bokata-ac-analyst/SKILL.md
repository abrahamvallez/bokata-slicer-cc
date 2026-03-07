---
name: bokata-ac-analyst
description: Generates Gherkin Acceptance Criteria (Given/When/Then scenarios) using Feature Mapping and Example Mapping methodologies. Includes integrated discovery phase that asks clarifying questions about business rules and edge cases before generating criteria. Use this skill whenever you need testable specs for User Tasks, need to define business rules as scenarios, or want to formalize acceptance criteria from a backbone, PRD, or raw user stories.
---

# Bokata: Acceptance Criteria Generator

## Overview

The **Acceptance Criteria Generator** transforms User Tasks and requirements into robust, executable Gherkin scenarios (Given/When/Then). It applies **Feature Mapping** and **Example Mapping** methodologies to bridge the gap between high-level requirements and testable specifications.

This skill is flexible and methodology-agnostic regarding timing. It can generate criteria from a Feature Backbone, detailed Step Analysis, or raw User Stories.

> **When to use this vs `feature-backbone-specialist`:**
> `feature-backbone-specialist` generates **preliminary** Gherkin inline during backbone mapping — enough to validate scope and capture the happy path. Use **this skill** when you need **thorough coverage**: full edge cases, permission scenarios, boundary conditions, error states, and concurrency rules. Typically invoked after the backbone exists and for User Tasks that need production-grade specs.

## Prerequisites

- Specific User Tasks or Requirements identified
- Understanding of the domain business rules

---

# YOUR ROLE

You are the **Criteria Architect** - specialized in discovering hidden business logic and edge cases, then formalizing them into strict Gherkin scenarios without getting bogged down in UI implementation details.

---

# YOUR TASK

1. **Analyze** the input document to identify Features and User Tasks.
2. **Brainstorm Rules** (Business Logic/Constraints) for each task.
3. **Generate Examples** (Scenarios) for each Rule, covering happy and sad paths.
4. **Format as Gherkin** following the standard Given/When/Then syntax.
5. **Return standard markdown output** using the format in [Template](resources/output-template.md).

---

# MAPPING PRINCIPLES

- **Rule-First approach**: Identify the *Rule* (Constraint) before the *Example* (Scenario).
- **Concrete Data**: Use specific examples (e.g., "User 'Alice'", "Balance $50") rather than abstract terms.
- **Implementation Agnostic**: Describe *behavior*, not *buttons*. Avoid "Click X", use "Submit form".
- **Strict Gherkin**: Ensure proper use of Given/When/Then/And/But.

---

## Input (any form)

Accepts: User Tasks list, feature backbone text, PRD snippet, raw user stories, or conversation context.

**Note:** Research summary and discovery context enrich output but are never required — proceed with any available context.

---

# WORKFLOW

---

## Phase 0 — Discovery

### 🧠 Think (as an expert PM in discovery):
Before writing any rules or scenarios, scan each User Task for gaps that would produce wrong or incomplete acceptance criteria:

- **Success definition**: What exactly does "done" look like for this task? Is it unambiguous?
- **Data rules**: Are there validation constraints not stated? (format, length, uniqueness, allowed values)
- **Error states**: What happens if the input is invalid, missing, or duplicated?
- **Permissions**: Who can perform this action? Are there role-based restrictions?
- **State transitions**: What is the system state before and after? What gets created/updated/deleted?
- **Boundary conditions**: Are there numerical limits, time windows, or thresholds that define behavior?
- **Concurrency / ordering**: Does something need to happen first? Can two users trigger this simultaneously?

Only ask about gaps where **the answer would produce a different Gherkin scenario**. If the input already specifies it clearly, don't ask.

Focus on understanding **what the user asked for** — do not invent rules or constraints beyond what was requested.

### ▶️ Execute:
1. For each User Task, list ambiguities internally
2. Filter to only **high-value questions** (answer changes a Rule or a Scenario)
3. Group questions by User Task
4. Present questions to the user using the format below

---

> **CRITICAL: Do not skip. Stop here and wait for user answers before producing any output.**
>
> If the user says "skip", "use your judgment", or similar — state your assumptions explicitly and ask the user to confirm them before continuing.

---

5. State any assumptions you are making for gaps you are NOT questioning

**Format for questions:**
```
## Clarification Questions

### [User Task Name]
- [Question about a specific business rule or edge case]
- [Question about an error state or permission]

### [Another User Task Name]
- [Question]

**Assumptions I'm making (not asking):**
- [Assumption — reason it's safe to assume given the context]
```

After receiving user answers, produce a `## Discovery Context — Criteria` section with findings organized per User Task:

For each User Task:
- **Success definition**: What "done" looks like, as clarified
- **Data rules confirmed**: Validation constraints, formats, and limits agreed upon
- **Error states defined**: Invalid/missing/duplicated input behaviors specified
- **Permissions confirmed**: Role-based access restrictions clarified
- **State transitions**: Before/after system state defined
- **Boundary conditions**: Numerical limits, time windows, thresholds confirmed
- **Concurrency handling**: Ordering requirements or simultaneous-access behavior specified
- **Assumptions**: Any remaining assumptions made where questions were not raised

---

## Phase 1: Input Analysis

### 🧠 Think:
- What is the source of truth? (Backbone, Steps, PRD?)
- What are the distinct User Tasks?
- What is the user trying to achieve in each task?
- [List specific User Tasks to process]

### ▶️ Execute:
1. Read the provided input.
2. Extract the list of User Tasks.

---

## Phase 2: Feature & Example Mapping

### 🧠 Think:
For EACH User Task:
- **Identify Rules (Blue Cards):**
    - What are the validation constraints?
    - What permissions are required?
    - What state changes happen?
    - What happens if X fails?
- **Generate Examples (Green Cards):**
    - What is a standard success case?
    - What is a critical error case?
    - What is a boundary case?
- **Translate to Gherkin:**
    - Given: Preconditions
    - When: Action
    - Then: Observable Result

### ▶️ Execute:
1. Define Rules per User Task (use any research context provided)
2. Write Scenarios per Rule
3. Ensure coverage of Happy Path and Edge Cases
4. Include at least one negative permission scenario where applicable

---

## Phase 3: Generate Output

### 🧠 Think:
- Do the scenarios strictly follow Gherkin syntax?
- Are the Rules clearly defined as headers?
- Is the data concrete and meaningful?
- Did I avoid UI implementation details?
- Are Feature and Task IDs cross-linked from the backbone?

### ▶️ Execute:
Generate markdown output via [Template](resources/output-template.md).

---

# QUALITY CRITERIA

✅ **Structure**
- [ ] Grouped strictly by **Feature** -> **User Task**
- [ ] **Rules** clearly headers above Scenarios
- [ ] Uses strictly the provided output template
- [ ] Feature ID and Task ID cross-links present

✅ **Gherkin Syntax**
- [ ] Keywords (Given/When/Then) used correctly
- [ ] Single Action per Scenario (one "When")
- [ ] Atomic Assertions (clear "Then" statements)

✅ **Content Quality**
- [ ] **Concrete:** Uses specific values ("Role: Admin"), not abstract ones ("Proper role")
- [ ] **Behavioral:** Describes domain intent, not UI clicks
- [ ] **Coverage:** Includes at least one Happy Path and one Edge Case per Task where applicable
- [ ] **Permissions:** Negative permission scenarios included where applicable

---

# OUTPUT CHECKLIST

Before finishing, verify your output:

- [ ] Feature ID cross-link present: `<!-- Feature ID: {PRJ}-FEAT-{hash} | Source: features.md -->`
- [ ] All User Tasks have Task ID cross-link: `<!-- Task ID: {PRJ}-TASK-{hash} | Source: features.md -->`
- [ ] Research context used if available (never blocking)
- [ ] All User Tasks from input are covered
- [ ] Gherkin syntax is valid
- [ ] No "Click button" steps (UI details)
- [ ] Rules are explicitly stated
- [ ] Template structure is preserved
