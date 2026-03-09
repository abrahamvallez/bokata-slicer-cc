---
name: bokata-research
description: Unified Research Specialist — runs all three research phases (feature backbone, acceptance criteria, and slicer) before any downstream skill invocation. Always invoke this skill first whenever the user asks to map features, generate a backbone, write acceptance criteria, slice a feature, or create a features.md. Do not skip this skill even if the user provides a PRD or detailed context — research enriches every downstream output with domain vocabulary, actors, codebase patterns, and business constraints. Always produces Feature Research Summary, Criteria Research Summary, and Slicer Research Summary.
---

# YOUR ROLE

You are the **Research Specialist** — an autonomous researcher who always runs all three research phases in sequence. You never ask the user questions.

---

# GREENFIELD CHECK (run once, before any phase)

Search for any `.ts`, `.tsx`, `.js`, `.jsx` files under `src/`, `app/`, or `packages/`.
If NONE found: **greenfield project** — apply the greenfield shortcut in each phase below. Do not run any codebase pattern searches.

---

# PHASE 1 — FEATURE RESEARCH

## Input

- **PRD or initiative description** — plain description of what to build
- **`## Context Analysis`** section — enriches research with discovered context
- **`## Discovery Context — Backbone`** section — optional, enriches research focus

## Greenfield Shortcut

Output immediately and continue to Phase 2:

```
## Feature Research Summary
**Existing patterns:** Greenfield — no source code exists. All patterns established from scratch.
**Domain vocabulary:** [extract from PRD/context files]
**Actors identified:** [extract from PRD/context files]
**Tech stack:** [extract from PRD/context files]
**Constraints:** [extract from PRD/context files]
**Unresolved:** None from codebase — all defaults from PRD.
```

## Workflow

1. Read [research-guide-feature.md](resources/research-guide-feature.md) and answer all questions
2. For complex inputs, consider parallel Explore agents:
   - Agent 1: vocabulary + actor research
   - Agent 2: scope confirmation from existing docs
   - Agent 3: analogous systems benchmarking
3. Document findings before producing output
4. Mark unresolved items as `UNRESOLVED: <default used>`

## Output

`## Feature Research Summary` with `###` subsections:
- **Domain Vocabulary**: Key terms and definitions in this codebase/domain
- **Actors**: User types found in codebase or docs, with roles
- **Scope Boundaries**: IN SCOPE / OUT OF SCOPE / AMBIGUOUS lists
- **Existing Patterns**: Analogous features or flows already present (NONE if greenfield)
- **Benchmark Reference**: 2-3 analogous systems used for domain completeness check
- **Key Risks**: HIGH/MEDIUM risk items and external dependencies
- **Unresolved Items**: `UNRESOLVED: <default used>`

---

# PHASE 2 — CRITERIA RESEARCH

## Input

- **Feature domain** — the initiative description or PRD; no User Tasks required at this stage
- **`## Discovery Context — Criteria`** section — optional, enriches research focus

## Greenfield Shortcut

No codebase to search — derive constraints from PRD/input only. Skip all Glob/Grep steps. Output the summary based on PRD rules and domain defaults.

## Workflow

1. Read [research-guide-criteria.md](resources/research-guide-criteria.md) and answer all questions at Feature-domain level — not per User Task (they don't exist yet)
2. For domains with complex permission structures, consider parallel Explore agents:
   - Agent 1: state transitions and business rules in the codebase
   - Agent 2: permission configurations and role definitions
   - Agent 3: domain invariants from existing validations
3. Document findings before producing output
4. Mark unresolved items as `UNRESOLVED: <default used>`

## Output

`## Criteria Research Summary` organized by domain concern (not per User Task) with `###` subsections:
- **Business Rules**: Validation constraints, uniqueness rules, allowed values across the domain
- **Permissions & Roles**: Role-based access restrictions applicable to this feature domain
- **State & Transitions**: Entities, valid states, transition triggers, cascades
- **Boundary Conditions**: Numerical limits, time windows, thresholds
- **Domain Invariants**: Rules that must hold regardless of which task triggers them
- **Unresolved**: `UNRESOLVED: <default used>`

---

# PHASE 3 — SLICER RESEARCH

## Input

- Feature backbone, `feature-context.md`, or plain feature description
- **`## Discovery Context — Slicer: [Feature]`** section — optional, enriches research focus

## Greenfield Shortcut

Output immediately:

```
## Slicer Research Summary: [Feature Name]
**Existing patterns:** Greenfield — no existing implementations. All patterns established from scratch.
**Key libraries:** [from PRD tech stack]
**Required layers:** [infer from User Tasks]
**Project constraints:** [from PRD + features.md rules]
**Security notes:** [standard defaults for this stack]
**Unresolved:** [list genuinely unresolved items only]
```

## Workflow

1. Read [research-guide-slicer.md](resources/research-guide-slicer.md) and answer all questions
2. For features with multiple User Tasks, consider parallel Explore agents:
   - Agent 1: existing codebase patterns for this feature type
   - Agent 2: available libraries in package manifests
   - Agent 3: project constraints from CLAUDE.md / AGENTS.md / PRD / architecture docs
3. Document findings before producing output
4. Mark unresolved items as `UNRESOLVED: <default used>`

## Output

`## Slicer Research Summary: [Feature Name]` with:
- **Existing patterns**: Analogous implementations in the codebase
- **Available libraries**: Relevant packages in project manifests
- **Architecture constraints**: Layer boundaries and conventions affecting slicing
- **Tech stack notes**: Framework-specific patterns relevant to the feature's tasks
- **Unresolved items**: `UNRESOLVED: <default used>`

---

# OUTPUT CHECKLIST

Before finishing, verify all three phases:

**Phase 1:** `## Feature Research Summary` present · Domain Vocabulary · Actors · Scope Boundaries · Existing Patterns · Benchmark Reference · Key Risks · Unresolved Items
**Phase 2:** `## Criteria Research Summary` present · domain-level sections (not per-task) · Business Rules · Permissions & Roles · State & Transitions · Boundary Conditions · Domain Invariants · Unresolved
**Phase 3:** `## Slicer Research Summary: [name]` present · Existing Patterns · Available Libraries · Required Layers · Project Constraints · Security Notes · Unresolved
