# Claude Code Skills

A public collection of Claude Code skills by Abraham Vallez — covering engineering management, product development, and team practices.

---

## Installation

Uses [skills CLI](https://github.com/vercel-labs/skills) — supports Claude Code and 40+ other AI agents (Cursor, Copilot, Codex, etc.).

```bash
npx skills add abrahamvallez/skills
```

The CLI will prompt you to select which skills to install and which agents to target. Claude Code is always included automatically.

---

## Skills

### Management

#### `1on1-coach`

Analyzes a 1on1 meeting transcript (Fathom, Otter, or plain text) and produces three output documents:

- **Shareable summary** — neutral, constructive recap sent to the team member
- **Private analysis** — meeting effectiveness, Radical Candor quadrant, risks and opportunities, improvement areas for the manager
- **Socratic coaching questions** — helps the manager reflect and prepare for the next meeting

Supports multiple languages (auto-detected from transcript). Handles `check-in`, `career`, `unblocking`, `feedback`, `conflict`, `onboarding`, and `mixed` meeting types.

**Usage:**
```
Analyze this 1on1: transcripts/2026-04-28-carlos.txt
```
```
Run 1on1-coach on my Fathom transcript from today's check-in with Alex
```

---

### Product Development — Bokata Framework

**v2.0** — Decomposes complex software requirements into incremental, deployable plans using Vertical Slicing and User Story Mapping.

Bokata guides LLMs to transform vague ideas or large PRDs into:
- A structured **Features Backbone** (actors, user tasks, acceptance criteria)
- A **Walking Skeleton** (the thinnest end-to-end deployable slice)
- A prioritized **Increments Backlog** ready to implement

#### `bokata-research`
Unified research specialist — runs three phases before any downstream skill:
1. **Feature Research** — domain vocabulary, actors, existing patterns
2. **Criteria Research** — business rules, permissions, state transitions per task
3. **Slicer Research** — tech stack, architecture constraints, available libraries

Produces `feature-context.md` that enriches all downstream outputs.

#### `bokata-feature-mapper`
Identifies Features and User Tasks using User Story Mapping methodology.
- Features in `[Actor] [Verb] [Object]` format
- User Tasks in `[Verb] [Object]` format (no actor)
- Integrated Phase 0 discovery with clarifying questions
- Bundling heuristics to catch merged tasks before they cause rework

Output: `## Features Backbone` section with dependency map.

#### `bokata-ac-analyst`
Generates robust Gherkin scenarios (Given/When/Then) using Feature Mapping and Example Mapping.
- Rule-first approach: defines business rules before writing scenarios
- Covers happy path, error states, edge cases, and permissions
- Integrated Phase 0 discovery for each User Task

Output: Executable specifications cross-linked to backbone IDs.

#### `bokata-feature-slicer`
Core decomposition engine — takes a Feature and produces an implementation plan.
- **Phase 1 (internal):** Decomposes tasks into functional steps (UI → Logic → Data → Integration)
- **Phase 2 (internal):** Generates 3+ incremental options per step
- **Phase 3 (output):** Synthesizes Walking Skeleton + Increments Backlog

Output: `## Walking Skeleton` (buildable in 1-3 days) + `## Increments Backlog`.

---

## Agents (Bokata)

Agents are thin orchestration personas that wire Bokata skills together and handle file I/O.

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

---

## Invocation Examples

### 1on1-coach

```
Analyze this 1on1: transcripts/2026-04-28-carlos.txt
```
```
Process my Fathom transcript: transcripts/2026-04-10-check-in-paula.txt lang=en
```
```
Run 1on1-coach — the transcript is in this message:
[paste transcript text]
```

### Bokata — Agents

```
Run bokata-mapper-specialist for initiative "basket-chess". The PRD is in docs/PRD.md.
```
```
Run bokata-slicer-specialist. Slice "Player Executes Game Turn" from initiative basket-chess.
```

### Bokata — Skills

```
Run bokata-feature-mapper:
[paste PRD or description]
```
```
Run bokata-feature-slicer:
[paste Feature definition with User Tasks]
```

Use `--show-steps`, `--show-increments`, or `--show-all` to surface intermediate phases.

---

## Bokata Output Structure

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

## Bokata Methodology

Bokata applies four established software delivery practices, combined into a single pipeline:

### User Story Mapping
> *Jeff Patton — "User Story Mapping" (O'Reilly, 2014)*

Map the complete user journey before drilling into details — **"mile wide, inch deep"**. This prevents building features in isolation and reveals the full scope before committing to any implementation.

### Example Mapping
> *Matt Wynne — Cucumber blog, 2015*

Discover business rules before writing acceptance criteria. Start with the **rule** (the constraint), then generate **examples** (scenarios) that illustrate it.

### Vertical Slicing (The Hamburger Method)
> *Various agile sources; popularized in ATDD and XP communities*

Instead of building horizontal layers (Database → API → UI), build **vertical slices** — thin pieces of functionality that touch all layers and are independently deployable and testable.

Bokata generates slices via `bokata-feature-slicer` using a toolkit of 16+ breakdown strategies — see [`breakdown-strategies.md`](skills/bokata-feature-slicer/resources/breakdown-strategies.md).

### Walking Skeleton
> *Alistair Cockburn — "Crystal Clear" (2004); Freeman & Pryce — "Growing Object-Oriented Software, Guided by Tests" (2009)*

The thinnest possible implementation that connects all main architectural components end-to-end — not a prototype, it ships to production.

---

## Repository Structure

```
skills/                         ← Individual skills (install individually or all)
├── 1on1-coach/                 ← Engineering management
├── bokata-feature-mapper/      ← Product development (Bokata)
├── bokata-feature-slicer/
├── bokata-research/
└── bokata-ac-analyst/

agents/                         ← Orchestration agents (Bokata)
├── bokata-mapper-specialist
└── bokata-slicer-specialist

evals/                          ← Test cases for each skill
├── 1on1-coach/
└── bokata-feature-mapper/
```

---

## Credits & Inspiration

The skills and agents architecture is inspired by skills from [eferro/skill-factory](https://github.com/eferro/skill-factory/tree/main)

---

## License

MIT — see [LICENSE](LICENSE).
