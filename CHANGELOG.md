# Changelog

## v2.0

### Architecture overhaul
- Introduced two-layer architecture: `skills/` (methodology tools) + `agents/` (orchestration personas)
- All skills and agents now follow a consistent `bokata-` naming prefix

### New skills
- `bokata-research` — Unified research specialist running three phases (feature, criteria, slicer) before any downstream skill. Replaces `project-explorer`.
- `bokata-feature-mapper` — Renamed from `feature-backbone-specialist`. Adds bundling heuristics and integrated Phase 0 discovery.
- `bokata-ac-analyst` — Renamed from `acceptance-criteria-generator`. Rule-first approach with integrated discovery.
- `bokata-feature-slicer` — Refactored with explicit internal phases (Steps, Incremental Options) and cleaner output control via `--show-steps`, `--show-increments`, `--show-all` flags.

### New agents
- `bokata-mapper-specialist` — Orchestrates the full features pipeline (research → backbone → criteria → features.md) with scaffolding scripts and validation.
- `bokata-slicer-specialist` — Thin orchestrator that invokes `bokata-feature-slicer` and writes slice files + updates the walking skeleton plan.

### Removed
- `project-explorer` — Superseded by `bokata-research`
- `package.json` — Not required for Claude Code plugin distribution

### Output
- Deterministic IDs for Features (`FEAT`) and User Tasks (`TASK`) via hash script
- Consolidated `walking-skeleton-plan.md` aggregating all feature skeletons
- Validated pipeline with `validate-pipeline.sh`

---

## v1.0

Initial release with standalone skills: `project-explorer`, `feature-backbone-specialist`, `acceptance-criteria-generator`, `bokata-feature-slicer`.
