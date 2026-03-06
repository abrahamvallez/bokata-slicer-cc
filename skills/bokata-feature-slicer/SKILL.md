---
name: bokata-feature-slicer
description: Slices a Feature into Steps, Increments, and a Vertical Slices plan (Walking Skeleton + Backlog). Use this skill whenever you need to break down a Feature into implementable work — after generating a Features Backbone, when planning a sprint, or when a user asks to slice, decompose, or plan implementation of a feature. Accepts any feature description as input (plain text, backbone section, or feature-context.md). Always invoke after feature-backbone-specialist when the pipeline continues to implementation planning.
---

# Bokata Feature Slicer

Unified skill for slicing a Feature into deployable increments. Takes a Feature from the Features Backbone and produces Steps, Incremental Options, and a Vertical Slices plan.

---

## Quick Start

**Standalone use:** Can be invoked directly with a feature description + technical context. No prior pipeline required.

1. Understand the Feature to slice from the provided input — any form works (plain text, backbone section, feature-context.md, or conversation context)
2. Select target Feature to slice
3. _(Optional)_ Enrich with a slicer research summary and discovery context if not already present
4. **Phase 1:** Decompose User Tasks into Steps → [Instructions](resources/phase-1-steps.md)
5. **Phase 2:** Generate Incremental Options per Step → [Instructions](resources/phase-2-increments.md)
6. **Phase 3:** Synthesize Vertical Slices plan → [Instructions](resources/phase-3-baby-steps.md)

---

## Prerequisites

A Feature to slice — described in any form:
- Plain text or conversation context
- `## Features Backbone` section with Features and User Tasks defined
- `feature-context.md` content (contains backbone + criteria research already consolidated)

Optionally, Acceptance Criteria enrich the decomposition.

Optionally enriched by:
- `## Slicer Research Summary: [Feature]` — recommended
- `## Discovery Context — Slicer: [Feature]` — optional

**Note:** `## Slicer Research Summary` and `## Discovery Context` are recommended but not blocking — proceed without them if absent.

---

## Phase 0 — Discovery

### 🧠 Think (as an expert tech lead in discovery):
Before decomposing, scan the Feature and its User Tasks for gaps that would produce wrong steps or increment options:

- **Technical clarity**: Are the User Tasks specific enough to decompose into layers? Any vague actions?
- **Layer ambiguity**: Are any steps unclear about which layer they belong to (UI vs Logic vs Data)?
- **Increment scope**: Are any User Tasks too large to slice meaningfully without clarification?
- **Dependencies**: Are there unspecified technical dependencies between User Tasks?
- **Constraints**: Are there architectural or performance constraints that affect which increment options are viable?

Only ask about gaps where **the answer would change a Step or an Increment option**. If the input is clear, don't ask.

### ▶️ Execute:
1. List ambiguities internally
2. Filter to only **high-value questions** (answer changes a Step or an Increment option)
3. Group questions by theme (Technical Clarity, Layer Ambiguity, Increment Scope, Dependencies, Constraints)
4. Present questions to the user using the format below

---

> **CRITICAL: Do not skip. Stop here and wait for user answers before producing any output.**
>
> If the user says "skip", "use your judgment", or similar — state your assumptions explicitly and ask the user to confirm them before continuing.

---

5. State assumptions you are making for gaps you are NOT questioning

**Format for questions:**
```
## Clarification Questions — [Feature Name]

**Technical Clarity**
- [Question about a vague User Task or unclear action]

**Layer Ambiguity**
- [Question about which layer a step belongs to]

**Increment Scope**
- [Question about whether a User Task needs to be split further]

**Dependencies & Constraints**
- [Question about technical dependencies or architectural constraints]

**Assumptions I'm making (not asking):**
- [Assumption 1 — reason it's safe to assume given the context]
- [Assumption 2]
```

After receiving user answers, produce a `## Discovery Context — Slicer: [Feature Name]` section with:

- **Technical clarifications**: Resolved ambiguities about User Task scope and layer assignment
- **Layer decisions**: Which layer each ambiguous step belongs to, as clarified
- **Increment boundaries**: Confirmed scope for User Tasks that needed clarification
- **Dependencies confirmed**: Technical dependencies between tasks or external systems
- **Constraints noted**: Architectural or performance constraints that affect slicing
- **Assumptions**: Any remaining assumptions made where questions were not raised

---

## YOUR TASK

Read the provided input and:

1. **Prerequisite Check:**
   - Verify you understand what Feature and User Tasks to slice — extract from input in any form; if no feature information is present at all, ask the user
   - Optionally check for Acceptance Criteria — if missing, proceed without them

2. **Phase 1 — Steps:**
   Follow instructions in [Phase 1: Step Analysis](resources/phase-1-steps.md)
   - Decompose each User Task into functional Steps (UI → Logic → Data → Integration)
   - Use [output template](resources/output-template-steps.md) for format
   - Validate: minimum 3 steps per User Task, all layers represented

3. **Phase 2 — Increments:**
   Follow instructions in [Phase 2: Incremental Options](resources/phase-2-increments.md)
   - Generate 3+ Incremental Options per Step using [breakdown strategies](resources/breakdown-strategies.md)
   - Use [output template](resources/output-template-increments.md) for format
   - Validate: minimum 3 options per step, strategies documented

4. **Phase 3 — Vertical Slices:**
   Follow instructions in [Phase 3: Vertical Slices](resources/phase-3-baby-steps.md)
   - Identify Walking Skeleton (simplest end-to-end options)
   - Organize remaining increments into a backlog
   - Validate: all User Tasks in skeleton, all options accounted for

---

## Execution Flow

```
Input: Feature description (any form)
         │
         ▼
┌─────────────────────┐
│   Phase 1: Steps    │
│  (Decompose Tasks)  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Phase 2: Increments │
│ (Generate Options)  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Phase 3: Vertical   │
│ Slices (Synthesize) │
└─────────────────────┘
```

---

## Resources

| Resource | Purpose |
|----------|---------|
| [Phase 1 Instructions](resources/phase-1-steps.md) | Step Analysis workflow and quality criteria |
| [Phase 2 Instructions](resources/phase-2-increments.md) | Increment generation workflow and quality criteria |
| [Phase 3 Instructions](resources/phase-3-baby-steps.md) | Vertical Slices synthesis workflow |
| [Breakdown Strategies](resources/breakdown-strategies.md) | Toolkit of 16+ strategies for Phase 2 |
| [Steps Output Template](resources/output-template-steps.md) | Format for Phase 1 output |
| [Increments Output Template](resources/output-template-increments.md) | Format for Phase 2 output |

---

## Output Checklist

At the end of this workflow, you should have produced:

### Upstream Inputs (verify before starting):
- [ ] Feature information present in some form (plain text, `## Features Backbone` section, or `feature-context.md`)
- [ ] `## Slicer Research Summary: [Feature]` present in input (recommended, not blocking — note if absent)
- [ ] `## Discovery Context — Slicer: [Feature]` present in input (optional — note if absent)

### Phase 1 — Steps Analysis (always):
- [ ] Feature ID cross-link present: `<!-- Feature ID: {PRJ}-FEAT-{hash} -->`
- [ ] Each User Task has Task ID cross-link: `<!-- Task ID: {PRJ}-TASK-{hash} | ACs: features.md#{PRJ}-TASK-{hash} -->`
- [ ] All User Tasks for the target Feature have Steps
- [ ] Each Step has Layer (UI/Logic/Data/Integration) and Description
- [ ] Each Step has **Technical Note** from research
- [ ] Minimum 3 steps per User Task
- [ ] All steps are functional (WHAT, not HOW)

### Phase 2 — Incremental Options (always):
- [ ] All Steps have Incremental Options
- [ ] Minimum 3 options per Step
- [ ] Applied Strategies and Rationale documented per Step
- [ ] Options progress from simple → complex

### Phase 3 — Vertical Slices Plan:
- [ ] `## 💀 Walking Skeleton` covers ALL User Tasks
- [ ] Walking Skeleton uses genuinely simplest viable options (evaluated across all options, not just `.1`)
- [ ] `## 🏗️ Increments Backlog` with all remaining options
- [ ] Backlog grouped by User Task
- [ ] All items use correct tag format: `**[User Task Name]**`

---

## NEXT STEPS

After completing the slicing:

1. **Save output** — The user decides where to save each phase's output
2. **Validate** — Check output against the Output Checklist above
3. **Implement** — Start with Walking Skeleton items, then pick increments from the backlog
