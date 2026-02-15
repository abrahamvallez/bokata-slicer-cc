---
name: bokata-feature-slicer
description: Slices a Feature into Steps, Increments, and optionally Baby Steps. Unified workflow for decomposing Features into deployable increments.
---

# Bokata Feature Slicer

Unified skill for slicing a Feature into deployable increments. Takes a Feature from the Features Backbone and produces Steps, Incremental Options, and optionally a Baby Steps plan.

---

## Quick Start

1. Verify the provided input contains a `## Features Backbone` section (or run `feature-backbone` skill first)
2. Select target Feature to slice
3. **Phase 1:** Decompose User Tasks into Steps → [Instructions](resources/phase-1-steps.md)
4. **Phase 2:** Generate Incremental Options per Step → [Instructions](resources/phase-2-increments.md)
5. **Phase 3 (optional):** Synthesize Baby Steps plan → [Instructions](resources/phase-3-baby-steps.md)

---

## Prerequisites

The provided input must contain a **`## Features Backbone`** section with:
- Features identified
- User Tasks defined under each Feature (with descriptions and context)

This content is produced by the `feature-backbone` skill. If the input does not contain `## Features Backbone`, run the `feature-backbone` skill first to generate it.

Optionally, Acceptance Criteria (from `acceptance-criteria-generator`) enrich the decomposition.

---

## YOUR TASK

Read the provided input and:

1. **Prerequisite Check:**
   - Verify input contains `## Features Backbone` with User Tasks defined — if missing, run `feature-backbone` skill first before proceeding
   - Optionally check for Acceptance Criteria — if missing, suggest `acceptance-criteria-generator`

2. **Phase 1 — Steps (always):**
   Follow instructions in [Phase 1: Step Analysis](resources/phase-1-steps.md)
   - Decompose each User Task into functional Steps (UI → Logic → Data → Integration)
   - Use [output template](resources/output-template-steps.md) for format
   - Validate: minimum 3 steps per User Task, all layers represented

3. **Phase 2 — Increments (always):**
   Follow instructions in [Phase 2: Incremental Options](resources/phase-2-increments.md)
   - Generate 3+ Incremental Options per Step using [breakdown strategies](resources/breakdown-strategies.md)
   - Use [output template](resources/output-template-increments.md) for format
   - Validate: minimum 3 options per step, strategies documented

4. **Phase 3 — Baby Steps (only if requested):**
   Follow instructions in [Phase 3: Baby Steps](resources/phase-3-baby-steps.md)
   - Identify Walking Skeleton (simplest end-to-end options)
   - Organize remaining increments into a backlog
   - Validate: all User Tasks in skeleton, all options accounted for

---

## Execution Flow

```
Input: Features Backbone
         │
         ▼
┌─────────────────────┐
│   Phase 1: Steps    │  ← Always
│  (Decompose Tasks)  │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Phase 2: Increments │  ← Always
│ (Generate Options)  │
└────────┬────────────┘
         │
         ▼ (optional)
┌─────────────────────┐
│ Phase 3: Baby Steps │  ← Only if requested
│ (Synthesize Plan)   │
└─────────────────────┘
```

---

## Resources

| Resource | Purpose |
|----------|---------|
| [Phase 1 Instructions](resources/phase-1-steps.md) | Step Analysis workflow and quality criteria |
| [Phase 2 Instructions](resources/phase-2-increments.md) | Increment generation workflow and quality criteria |
| [Phase 3 Instructions](resources/phase-3-baby-steps.md) | Baby Steps synthesis workflow (optional) |
| [Breakdown Strategies](resources/breakdown-strategies.md) | Toolkit of 16+ strategies for Phase 2 |
| [Steps Output Template](resources/output-template-steps.md) | Format for Phase 1 output |
| [Increments Output Template](resources/output-template-increments.md) | Format for Phase 2 output |

---

## Output Checklist

At the end of this workflow, you should have produced:

### Phase 1 — Steps Analysis (always):
- [ ] All User Tasks for the target Feature have Steps
- [ ] Each Step has Layer (UI/Logic/Data/Integration) and Description
- [ ] Minimum 3 steps per User Task
- [ ] All steps are functional (WHAT, not HOW)

### Phase 2 — Incremental Options (always):
- [ ] All Steps have Incremental Options
- [ ] Minimum 3 options per Step
- [ ] Applied Strategies and Rationale documented per Step
- [ ] Options progress from simple → complex

### Phase 3 — Baby Steps Plan (only if requested):
- [ ] `## 💀 Walking Skeleton` covers ALL User Tasks
- [ ] Walking Skeleton uses simplest options (`.1`)
- [ ] `## 🏗️ Increments Backlog` with all remaining options
- [ ] Backlog grouped by User Task
- [ ] All items use correct tag format: `**[User Task Name]**`

---

## NEXT STEPS

After completing the slicing:

1. **Save output** — The user decides where to save each phase's output
2. **Validate** — Check output against the Output Checklist above
3. **Implement** — Start with Walking Skeleton items (if Phase 3 was run), then pick increments from the backlog
