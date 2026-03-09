# Bokata: Vertical Slicing & Feature Decomposition Framework

**v2.0** — A prompt engineering framework for Claude Code that decomposes complex software requirements into incremental, deployable plans using Vertical Slicing and User Story Mapping.

---

## What is Bokata?

Bokata guides LLMs to transform vague ideas or large PRDs into:
- A structured **Features Backbone** (actors, user tasks, acceptance criteria)
- A **Walking Skeleton** (the thinnest end-to-end deployable slice)
- A prioritized **Increments Backlog** ready to implement

Built on **Vertical Slicing** (the Hamburger Method) and **Walking Skeleton** principles.

---

## Architecture

Bokata v2.0 introduces a two-layer architecture:

```
agents/                         ← Orchestration agents (personas)
├── bokata-mapper-specialist    ← Runs the full features pipeline
└── bokata-slicer-specialist    ← Runs the slicing pipeline per feature

skills/                         ← Methodology skills (tools)
├── bokata-research/            ← Context & domain research
├── bokata-feature-mapper/      ← User Story Mapping (features + tasks)
├── bokata-ac-analyst/          ← Gherkin acceptance criteria
└── bokata-feature-slicer/      ← Walking Skeleton + Increments Backlog
```

---

## Skills

### `bokata-research`
Unified research specialist — runs three phases before any downstream skill:
1. **Feature Research** — domain vocabulary, actors, existing patterns
2. **Criteria Research** — business rules, permissions, state transitions per task
3. **Slicer Research** — tech stack, architecture constraints, available libraries

Produces `feature-context.md` that enriches all downstream outputs.

### `bokata-feature-mapper`
Identifies Features and User Tasks using User Story Mapping methodology.
- Features in `[Actor] [Verb] [Object]` format
- User Tasks in `[Verb] [Object]` format (no actor)
- Integrated Phase 0 discovery with clarifying questions
- Bundling heuristics to catch merged tasks before they cause rework

Output: `## Features Backbone` section with dependency map.

### `bokata-ac-analyst`
Generates robust Gherkin scenarios (Given/When/Then) using Feature Mapping and Example Mapping.
- Rule-first approach: defines business rules before writing scenarios
- Covers happy path, error states, edge cases, and permissions
- Integrated Phase 0 discovery for each User Task

Output: Executable specifications cross-linked to backbone IDs.

### `bokata-feature-slicer`
Core decomposition engine — takes a Feature and produces an implementation plan.
- **Phase 1 (internal):** Decomposes tasks into functional steps (UI → Logic → Data → Integration)
- **Phase 2 (internal):** Generates 3+ incremental options per step
- **Phase 3 (output):** Synthesizes Walking Skeleton + Increments Backlog

Output: `## Walking Skeleton` (buildable in 1-3 days) + `## Increments Backlog`.

---

## Agents

Agents are thin orchestration personas that wire skills together and handle file I/O.

### `bokata-mapper-specialist`
Runs the full features pipeline for an initiative:
1. Scaffolds directory structure
2. Loads project context
3. Invokes `bokata-research` → `bokata-feature-mapper` → `bokata-ac-analyst`
4. Generates deterministic IDs for Features and User Tasks
5. Writes `docs/<initiative>/features.md`
6. Validates output

### `bokata-slicer-specialist`
Runs the slicing pipeline for a single Feature:
1. Reads target Feature from `features.md`
2. Loads context from `feature-context.md`
3. Invokes `bokata-feature-slicer`
4. Writes `docs/<initiative>/slices/<FEATURE-ID>-<name>.md`
5. Updates `walking-skeleton-plan.md`

**What to pass:** Only the initiative name and the Feature to slice (name or ID). The agent reads `features.md` and `feature-context.md` automatically — no need to attach documents.

```
Slice the feature "Player Sets Up Account" from initiative basket-chess
Slice BKC-FEAT-f16d from initiative basket-chess
```

If `feature-context.md` does not exist, the agent falls back to discovering project context via the scaffold scripts. The slicer skill can proceed without a Slicer Research Summary, though output quality improves with it.

**Prerequisite:** `bokata-mapper-specialist` must have run first to produce `docs/<initiative>/features.md`. Running the slicer standalone without that file requires passing the feature definition manually.

---

## Recommended Workflow

Skills are the primary way to use Bokata — invoke them directly in Claude Code. Agents are optional orchestration wrappers that automate file I/O and chaining.

### Minimum workflow

```
bokata-feature-mapper   →  Features Backbone (actors, tasks, dependencies)
bokata-feature-slicer   →  Walking Skeleton + Increments Backlog (per feature)
```

### Full workflow (with enrichment steps)

```
bokata-research         →  feature-context.md (domain, rules, tech constraints)
        ↓
bokata-feature-mapper   →  Features Backbone
        ↓
bokata-ac-analyst       →  Acceptance criteria in Gherkin (optional, per task)
        ↓
bokata-feature-slicer   →  Walking Skeleton + Increments Backlog (per feature)
```

**When to add each step:**
- `bokata-research` — use it when you don't have project context to hand off, or when the domain/tech stack is unfamiliar. Run it once per initiative before anything else.
- `bokata-ac-analyst` — use it before slicing when you need precise behavioral specs, or when the feature has complex rules, permissions, or edge cases worth nailing down first.

Each skill works standalone — you can start anywhere in the pipeline.

---

## Invocation Examples

### Agents

Agents are invoked by name. They read and write files automatically — just give them the initiative name and what to work on.

**bokata-mapper-specialist** — full features pipeline for an initiative:
```
Run bokata-mapper-specialist for initiative "basket-chess". The PRD is in docs/PRD.md.
```
```
Map the features for the "user-authentication" initiative. Use the description below:
[paste PRD or description]
```

**bokata-slicer-specialist** — slice a single feature by name or ID:
```
Run bokata-slicer-specialist. Slice "Player Executes Game Turn" from initiative basket-chess.
```
```
Slice BKC-FEAT-fc3e from initiative basket-chess.
```
```
Re-slice BKC-FEAT-f16d — I updated the User Tasks in features.md.
```

---

### Skills

Skills are invoked by name with the relevant context pasted inline. No files are required — paste whatever you have.

**bokata-research** — run before mapping when the domain or codebase is unfamiliar:
```
Run bokata-research for this initiative:
[paste PRD or description]
```
```
Run bokata-research. Context Analysis:
[paste ## Context Analysis section]
```

**bokata-feature-mapper** — map features from any description:
```
Run bokata-feature-mapper:
[paste PRD, description, or conversation context]
```
```
Run bokata-feature-mapper with this enriched context:
[paste PRD]

## Feature Research Summary
[paste research output]
```

**bokata-ac-analyst** — generate Gherkin criteria for specific User Tasks:
```
Run bokata-ac-analyst for these User Tasks:
- Create Match
- Join Match
- Leave Match
```
```
Run bokata-ac-analyst:
[paste ## Features Backbone section]

## Criteria Research Summary
[paste criteria research output]
```

**bokata-feature-slicer** — slice a feature into a Walking Skeleton:
```
Run bokata-feature-slicer:
[paste Feature definition with User Tasks]
```
```
Run bokata-feature-slicer with --show-steps:
[paste Feature definition]

## Slicer Research Summary: Player Executes Game Turn
[paste slicer research output]
```

Use `--show-steps`, `--show-increments`, or `--show-all` to surface intermediate phases.

---

## Output Structure

```
docs/
└── <initiative>/
    ├── feature-context.md          ← Research summaries
    ├── features.md                 ← Backbone + acceptance criteria
    ├── walking-skeleton-plan.md    ← Consolidated skeleton across features
    └── slices/
        └── <FEAT-ID>-<name>.md    ← Walking Skeleton + Backlog per feature
```

---

## Methodology

Bokata applies four established software delivery practices, combined into a single pipeline:

---

### User Story Mapping
> *Jeff Patton — "User Story Mapping" (O'Reilly, 2014)*

Map the complete user journey before drilling into details — **"mile wide, inch deep"**. This prevents building features in isolation and reveals the full scope before committing to any implementation.

Bokata applies it via `bokata-feature-mapper`:
- **Features (the backbone):** High-level user goals in `[Actor] [Verb] [Object]` format — what users are trying to accomplish, not what the system does.
- **User Tasks:** Concrete, value-delivering actions under each feature, in `[Verb] [Object]` format (actor is inherited).
- **Bundling heuristics:** Linguistic signals (conjunctions, generic verbs like "manage", sequence connectors) that reveal when a task is actually two tasks in disguise.

---

### Example Mapping
> *Matt Wynne — Cucumber blog, 2015*

Discover business rules before writing acceptance criteria. Start with the **rule** (the constraint), then generate **examples** (scenarios) that illustrate it — not the other way around.

Bokata applies it via `bokata-ac-analyst`:
- Rules are identified per User Task (validation, permissions, state transitions, boundaries)
- Each rule produces at least one happy path and one edge case / error scenario
- Output is strict Gherkin (Given/When/Then) — behavior-focused, implementation-agnostic

---

### Vertical Slicing (The Hamburger Method)
> *Various agile sources; popularized in ATDD and XP communities*

Instead of building horizontal layers (Database → API → UI), build **vertical slices** — thin pieces of functionality that touch all layers and are independently deployable and testable.

The hamburger metaphor: each slice goes top-to-bottom through the stack, not side-to-side. A slice is only "done" when it can be deployed and verified end-to-end.

Bokata generates slices via `bokata-feature-slicer` using a toolkit of 16+ breakdown strategies:
- **Zero/One/Many** — handle empty states first, then one item, then lists
- **Dummy to Dynamic** — hardcoded data before full integrations
- **Workflow Simplification** — skip optional steps or validations in the first increment
- **Automation Gradient** — manual → hardcoded → semi-automated → fully automated
- **SPIDR** — split by Spikes, Paths, Interfaces, Data, or Rules
- And 11 more strategies in [`breakdown-strategies.md`](skills/bokata-feature-slicer/resources/breakdown-strategies.md)

---

### Walking Skeleton
> *Alistair Cockburn — "Crystal Clear" (2004); also central to "Growing Object-Oriented Software, Guided by Tests" (Freeman & Pryce, 2009)*

The Walking Skeleton is the thinnest possible implementation that connects all main architectural components end-to-end. It "walks" through the system — proving the architecture is sound — before adding complexity.

Key properties:
- Covers **all User Tasks** in a Feature (breadth-first, not depth-first)
- Each item is buildable in **1–3 days**
- Data layer items are **reversible** (schema changes that can be undone)
- It is not a prototype — it ships to production

Bokata's `bokata-feature-slicer` always outputs a Walking Skeleton as its primary deliverable, with the remaining increment options organized as a backlog to build on top of it.

---

## Credits & Inspiration

The skills and agents architecture is inspired by skills from [eferro/skill-factory](https://github.com/eferro/skill-factory/tree/main)

---

## License

MIT — see [LICENSE](LICENSE).
