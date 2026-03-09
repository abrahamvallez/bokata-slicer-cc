---
name: bokata-feature-slicer
description: Slices a Feature into a Walking Skeleton and Increments Backlog — a ready-to-implement delivery plan. Internal phases (Steps and Incremental Options) are used as reasoning but not surfaced by default. Use this skill whenever you need to break down a Feature into implementable work — after generating a Features Backbone, when planning a sprint, or when a user asks to slice, decompose, or plan implementation of a feature.
---

# Bokata Feature Slicer

Unified skill for slicing a Feature into deployable increments. Takes a Feature from the Features Backbone and produces a **Walking Skeleton + Increments Backlog** ready to implement.

**Default output:** Walking Skeleton + Increments Backlog (Phase 3 only)
**Optional:** pass `--show-steps`, `--show-increments`, or `--show-all` in arguments to surface intermediate phases.

---

## Quick Start

**Standalone use:** Can be invoked directly with a feature description + technical context. No prior pipeline required.

1. Understand the Feature to slice from the provided input — any form works (plain text, backbone section, feature-context.md, or conversation context)
2. Select target Feature to slice
3. _(Optional)_ Enrich with a slicer research summary and discovery context if not already present
4. **Phase 1 (internal):** Decompose User Tasks into Steps → [Instructions](resources/phase-1-steps.md)
5. **Phase 2 (internal):** Generate Incremental Options per Step → [Instructions](resources/phase-2-increments.md)
6. **Phase 3 (output):** Synthesize Walking Skeleton + Increments Backlog → [Instructions](resources/phase-3-baby-steps.md)

Phases 1 and 2 are internal reasoning steps — do them thoroughly but only surface their output if the user explicitly requests it.

---

## Prerequisites

A Feature to slice — described in any form:
- Plain text or conversation context
- Features Backbone with Features and User Tasks defined
- `feature-context.md` content (contains backbone + criteria research already consolidated)

Optionally, Acceptance Criteria enrich the decomposition.

Optionally enriched by any context containing:
- **Codebase patterns, libraries, and architecture constraints** (e.g. `## Slicer Research Summary: [Feature]`) — **recommended**
- **Domain vocabulary and actors** (e.g. `## Feature Research Summary`) — for consistent naming across increments
- **Business rules** (e.g. `## Criteria Research Summary`) — rules that affect which increment options are acceptable
- **Technical clarifications** (e.g. `## Discovery Context — Slicer: [Feature]`) — layer and scope decisions from Phase 0

**Note:** All enrichment is recommended but not blocking — proceed without it if absent.

---

## Phase 0 — Discovery

### Think (as an expert tech lead in discovery):
Before decomposing, scan the Feature and its User Tasks for gaps that would produce wrong steps or increment options:

- **Technical clarity**: Are the User Tasks specific enough to decompose into layers? Any vague actions?
- **Layer ambiguity**: Are any steps unclear about which layer they belong to (UI vs Logic vs Data)?
- **Increment scope**: Are any User Tasks too large to slice meaningfully without clarification?
- **Dependencies**: Are there unspecified technical dependencies between User Tasks?
- **Constraints**: Are there architectural or performance constraints that affect which increment options are viable?

Only ask about gaps where **the answer would change a Step or an Increment option**. If the input is clear, don't ask.

### Execute:
1. List ambiguities internally
2. Filter to only **high-value questions** (answer changes a Step or an Increment option)
3. Group questions by theme (Technical Clarity, Layer Ambiguity, Increment Scope, Dependencies, Constraints)
4. Present questions to the user using the format below

---

> **CRITICAL: Do not skip. Stop here and wait for user answers before producing any output.**
>
> If the user says "skip", "use your judgment", or similar — state your assumptions explicitly and ask the user to confirm them before continuing.

---

6. State assumptions you are making for gaps you are NOT questioning

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

2. **Phase 1 — Steps (internal):**
   Follow instructions in [Phase 1: Step Analysis](resources/phase-1-steps.md)
   - Decompose each User Task into functional Steps (UI → Logic → Data → Integration)
   - Do this work internally — don't output Phase 1 results unless `--show-steps` or `--show-all` was requested

3. **Phase 2 — Increments (internal):**
   Follow instructions in [Phase 2: Incremental Options](resources/phase-2-increments.md)
   - Generate 3+ Incremental Options per Step using [breakdown strategies](resources/breakdown-strategies.md)
   - Do this work internally — don't output Phase 2 results unless `--show-increments` or `--show-all` was requested

4. **Phase 3 — Walking Skeleton + Increments Backlog (output):**
   Follow instructions in [Phase 3: Vertical Slices](resources/phase-3-baby-steps.md)
   - Identify Walking Skeleton (simplest end-to-end options, buildable in 1-3 days)
   - Organize remaining increments into a backlog
   - **This is always the output** — produce it regardless of args

---

## Execution Flow

```
Input: Feature description (any form)
         │
         ▼
┌─────────────────────┐
│   Phase 1: Steps    │  ← internal reasoning
│  (Decompose Tasks)  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Phase 2: Increments │  ← internal reasoning
│ (Generate Options)  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Phase 3: Output    │  ← surfaced to user
│  Walking Skeleton   │
│  + Backlog          │
└─────────────────────┘
```

---

## Resources

| Resource | Purpose |
|----------|---------|
| [Phase 1 Instructions](resources/phase-1-steps.md) | Step Analysis workflow and quality criteria |
| [Phase 2 Instructions](resources/phase-2-increments.md) | Increment generation workflow and quality criteria |
| [Phase 3 Instructions](resources/phase-3-baby-steps.md) | Vertical Slices synthesis workflow |
| [Breakdown Strategies](resources/breakdown-strategies.md) | Toolkit of strategies for Phase 2 |
| [Steps Output Template](resources/output-template-steps.md) | Format for Phase 1 output (used when --show-steps) |
| [Increments Output Template](resources/output-template-increments.md) | Format for Phase 2 output (used when --show-increments) |

---

## Output Checklist

### Phase 3 — Walking Skeleton + Backlog (always verify before outputting):
- [ ] `## 💀 Walking Skeleton` covers ALL User Tasks
- [ ] Every Walking Skeleton item is genuinely the simplest viable option (buildable in 1-3 days)
- [ ] Every Walking Skeleton item is reversible (especially Data layer items)
- [ ] `## 🏗️ Increments Backlog` contains all remaining options
- [ ] Backlog grouped by User Task
- [ ] All items use correct tag format: `**[User Task Name]**`
- [ ] No generic tasks — all items are specific increments from Phase 2 analysis
- [ ] Walking Skeleton descriptions answer "what user sees/does" — technology references OK, endpoint/field/function names NOT OK

### Internal verification (before Phase 3 synthesis):
- [ ] All User Tasks have been decomposed into Steps (Phase 1 complete)
- [ ] All Steps have 3+ Incremental Options (Phase 2 complete)
- [ ] Walking Skeleton uses options evaluated across all Phase 2 options, not just `.1` defaults

### Upstream Inputs (verify before starting):
- [ ] Feature information present in some form
- [ ] `## Slicer Research Summary: [Feature]` present (recommended — note if absent)

---

## NEXT STEPS

After completing the slicing:

1. **Save output** — The user decides where to save
2. **Validate** — Check output against the Output Checklist above
3. **Implement** — Start with Walking Skeleton items, then pick increments from the backlog
